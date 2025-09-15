package com.stefanycampanhoni.agora.controllers.dtos.user;

public record UserLoginRequest(
        String email,
        String password
) {
}
