package com.stefanycampanhoni.agora.application.dtos.user;

public record UserResponse(
        String name,
        String email,
        byte[] profilePicture
) {
}
