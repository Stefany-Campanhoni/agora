package com.stefanycampanhoni.agora.security;

import com.stefanycampanhoni.agora.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private TokenRepository tokenRepository;

    public Token generateToken(User user) {
        String tokenValue = jwtService.generateToken(user);
        return tokenRepository.save(new Token(null, tokenValue, user));
    }
}
