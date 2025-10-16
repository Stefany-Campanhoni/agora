package com.stefanycampanhoni.agora.application.services;

import com.stefanycampanhoni.agora.application.dtos.TokenResponse;
import com.stefanycampanhoni.agora.application.dtos.user.UserListResponse;
import com.stefanycampanhoni.agora.application.dtos.user.UserLoginRequest;
import com.stefanycampanhoni.agora.application.dtos.user.UserRequest;
import com.stefanycampanhoni.agora.application.dtos.user.UserResponse;
import com.stefanycampanhoni.agora.application.exceptions.user.InvalidCredentialsException;
import com.stefanycampanhoni.agora.application.exceptions.user.UserNotFoundException;
import com.stefanycampanhoni.agora.application.mappers.AuthMapper;
import com.stefanycampanhoni.agora.application.mappers.UserMapper;
import com.stefanycampanhoni.agora.domain.entities.User;
import com.stefanycampanhoni.agora.domain.repositories.UserRepository;
import com.stefanycampanhoni.agora.infra.security.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

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
    private AuthMapper authMapper;

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
}
