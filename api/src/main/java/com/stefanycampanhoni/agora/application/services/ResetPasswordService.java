package com.stefanycampanhoni.agora.application.services;

import com.stefanycampanhoni.agora.domain.entities.ResetPassword;
import com.stefanycampanhoni.agora.domain.entities.User;
import com.stefanycampanhoni.agora.domain.repositories.ResetPasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.HexFormat;

@Service
public class ResetPasswordService {
    @Autowired
    private ResetPasswordRepository repository;

    public void saveRegistry(User user, String token) {
        ResetPassword resetPassword = ResetPassword.builder()
                .generatedFor(user)
                .wasUsed(false)
                .hashToken(this.getHashSha256(token))
                .expirationDateTime(LocalDateTime.now().plusMinutes(15))
                .build();

        repository.save(resetPassword);
    }

    private String getHashSha256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hashBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Could not find SHA-256 algorithm", e);
        }
    }
}
