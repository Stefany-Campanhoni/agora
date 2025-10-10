package com.stefanycampanhoni.agora.application.dtos.user;

public record UserLoginRequest(
        String email,
        String password
) {
}
