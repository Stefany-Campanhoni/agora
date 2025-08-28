package com.stefanycampanhoni.agora.dtos;

import jakarta.validation.constraints.Email;

public record UserRequest(
        String name,

        @Email
        String email,

        String password
) {
}
