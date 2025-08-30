package com.stefanycampanhoni.agora.controllers.dtos;

public record UserLoginRequest(
        String email,
        String password
) {
}
