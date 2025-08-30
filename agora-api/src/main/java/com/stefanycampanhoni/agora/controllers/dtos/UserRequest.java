package com.stefanycampanhoni.agora.controllers.dtos;

import jakarta.validation.constraints.Email;
import jdk.jfr.Enabled;

public record UserRequest(
        String name,

        @Email
        String email,

        String password
) {
}
