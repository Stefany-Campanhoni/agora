package com.stefanycampanhoni.agora.services;

import com.stefanycampanhoni.agora.dtos.TokenResponse;
import com.stefanycampanhoni.agora.exceptions.user.UserNotFoundException;
import com.stefanycampanhoni.agora.models.User;
import com.stefanycampanhoni.agora.repositories.UserRepository;
import com.stefanycampanhoni.agora.security.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
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

    public TokenResponse register(User user) {
        String originalPassword = user.getPassword();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        user.setPassword(originalPassword);

        return login(user);
    }

    public TokenResponse login(User user) {
        return new TokenResponse(authService.generateToken(user));
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
    }
}
