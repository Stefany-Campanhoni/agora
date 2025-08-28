package com.stefanycampanhoni.agora.dtos;

public record UserLoginRequest(
        String email,
        String password
) {
}
