package com.stefanycampanhoni.agora.application.services;

import com.stefanycampanhoni.agora.application.dtos.TokenResponse;
import com.stefanycampanhoni.agora.application.dtos.user.*;
import com.stefanycampanhoni.agora.application.exceptions.BadRequestException;
import com.stefanycampanhoni.agora.application.exceptions.user.InvalidCredentialsException;
import com.stefanycampanhoni.agora.application.exceptions.user.UserNotFoundException;
import com.stefanycampanhoni.agora.application.mappers.AuthMapper;
import com.stefanycampanhoni.agora.application.mappers.CustomUserMapper;
import com.stefanycampanhoni.agora.application.mappers.UserMapper;
import com.stefanycampanhoni.agora.domain.entities.User;
import com.stefanycampanhoni.agora.domain.enums.user.Role;
import com.stefanycampanhoni.agora.domain.repositories.UserRepository;
import com.stefanycampanhoni.agora.infra.security.AuthService;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private CustomUserMapper customUserMapper;

    @Autowired
    private AuthMapper authMapper;

    @Value("${admin.secret}")
    private String adminSecret;

    public TokenResponse register(UserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new InvalidCredentialsException("Email already in use.");
        }

        var user = userMapper.toUser(request);
        var originalPassword = request.password();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        var loginRequest = new UserLoginRequest(request.email(), originalPassword);
        return login(loginRequest);
    }

    public TokenResponse login(UserLoginRequest request) {
        var user = getUserByEmailEntity(request.email());

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        var token = authService.generateToken(user);
        return authMapper.toResponse(token);
    }

    public UserResponse getUserByEmail(String email) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);
        return userMapper.toUserResponse(user);
    }

    private User getUserByEmailEntity(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);
    }

    public UserListResponse getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserResponse)
                .collect(userMapper.toUserListResponse());
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException();
        }
        userRepository.deleteById(id);
    }

    public UserResponse updateUser(User user, UserEditRequest userRequest) {
        if (!canEditUser(user, userRequest.email())) {
            throw new InvalidCredentialsException("You do not have permission to edit this user.");
        }

        customUserMapper.updateUserFromRequest(userRequest, user);
        userRepository.save(user);
        return userMapper.toUserResponse(user);
    }

    public boolean canEditUser(User currentUser, String email) {
        if (currentUser == null || email == null) {
            return false;
        }

        return userRepository.findByEmail(email)
                .map(user -> currentUser.getId().equals(user.getId()) ||
                        currentUser.getRole().equals(Role.ADMIN))
                .orElse(false);
    }

    public Long countUsers() {
        return userRepository.count();
    }

    public UserResponse createAdminUser(AdminRequest adminRequest) {
        if (!adminRequest.secret().equalsIgnoreCase(adminSecret)) {
            throw new BadRequestException("Error creating admin user.");
        }
        if (userRepository.existsByEmail(adminRequest.email())) {
            throw new BadRequestException("Email already in use.");
        }

        var user = new User();
        user.setName("Admin");
        user.setEmail(adminRequest.email());
        user.setPassword(passwordEncoder.encode(adminRequest.password()));
        user.setRole(Role.ADMIN);
        userRepository.save(user);

        return userMapper.toUserResponse(user);
    }
}
