package com.stefanycampanhoni.agora.application.dtos.user;

import java.util.ArrayList;
import java.util.List;

public record UserListResponse(
        List<UserResponse> users
) {
    public UserListResponse() {
        this(new ArrayList<>());
    }
}
