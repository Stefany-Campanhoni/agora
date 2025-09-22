package com.stefanycampanhoni.agora.services;

import com.stefanycampanhoni.agora.exceptions.user.InvalidCredentialsException;
import com.stefanycampanhoni.agora.exceptions.user.UserNotFoundException;
import com.stefanycampanhoni.agora.models.User;
import com.stefanycampanhoni.agora.repositories.UserRepository;
import com.stefanycampanhoni.agora.security.AuthService;
import com.stefanycampanhoni.agora.security.Token;
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

    public Token register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new InvalidCredentialsException("Email already in use.");
        }

        String originalPassword = user.getPassword();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        User originalCredentials = User.builder()
                .email(user.getEmail())
                .password(originalPassword)
                .build();

        return login(originalCredentials);
    }

    public Token login(User userCredentials) {
        User user = getUserByEmail(userCredentials.getEmail());

        if (!passwordEncoder.matches(userCredentials.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        return authService.generateToken(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
    }
}
