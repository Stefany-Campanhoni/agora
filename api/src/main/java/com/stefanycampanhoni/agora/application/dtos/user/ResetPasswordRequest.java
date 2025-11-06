package com.stefanycampanhoni.agora.application.dtos.user;

public record ResetPasswordRequest(
        String email,
        String token,
        String newPassword
) {
}
