package com.stefanycampanhoni.agora.application.dtos.user;

public record ResetPasswordRequest(
        String newPassword,
        String email,
        String token
) {
    public boolean isResetRequest() {
        return this.email != null && this.token != null && this.newPassword != null;
    }

    public boolean isEmailRequest() {
        return this.email != null && this.token == null && this.newPassword == null;
    }
}
