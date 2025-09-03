package com.stefanycampanhoni.agora.controllers.dtos.user;

import jakarta.validation.constraints.Email;

public record UserRequest(
        String name,

        @Email
        String email,

        String password
) {
}
