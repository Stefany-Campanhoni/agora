package com.stefanycampanhoni.agora.controllers.dtos;

import jakarta.validation.constraints.Email;

public record UserRequest(
        String name,

        @Email
        String email,

        String password
) {
}
