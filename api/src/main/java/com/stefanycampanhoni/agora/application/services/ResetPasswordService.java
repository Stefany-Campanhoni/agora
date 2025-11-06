package com.stefanycampanhoni.agora.application.services;

import com.stefanycampanhoni.agora.application.dtos.user.ResetPasswordRequest;
import com.stefanycampanhoni.agora.domain.entities.ResetPassword;
import com.stefanycampanhoni.agora.domain.entities.User;
import com.stefanycampanhoni.agora.domain.interfaces.IEmailService;
import com.stefanycampanhoni.agora.domain.repositories.ResetPasswordRepository;
import com.stefanycampanhoni.agora.domain.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HexFormat;

@Service
public class ResetPasswordService {

    @Autowired
    private ResetPasswordRepository repository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IEmailService emailService;

    @Value("${app.base-url}")
    private String appBaseUrl;

    public void sendResetPasswordEmail(String email) {
        final String subject = "Password Reset";
        final StringBuilder content = new StringBuilder("To reset your password, please click the following link: ");
        final String link = appBaseUrl + "user/password/reset?token=%s&email=" + email;

        userRepository.findByEmail(email).ifPresent(user -> {
            String token = this.generateToken();

            this.saveRegistry(user, token);
            content.append(link.formatted(token));

            emailService.sendSimpleEmail(email, subject, content.toString());
        });
    }

    public void resetPassword(ResetPasswordRequest request) {

    }


    private void saveRegistry(User user, String token) {
        ResetPassword resetPassword = ResetPassword.builder()
                .generatedFor(user)
                .wasUsed(false)
                .hashToken(this.getHashSha256(token))
                .expirationDateTime(LocalDateTime.now().plusMinutes(15))
                .build();

        repository.save(resetPassword);
    }

    private String generateToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[16];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
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
