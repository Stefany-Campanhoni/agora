package com.stefanycampanhoni.agora.application.dtos.user;

public record AdminRequest(
        String email,
        String password,
        String secret
) {
}
