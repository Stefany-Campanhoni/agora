package com.stefanycampanhoni.agora.application.dtos.room;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record RoomRequest(
        @NotBlank
        String name,

        String description,

        @Min(1)
        Integer capacity,

        @NotBlank
        String location
) {
}
