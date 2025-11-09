package com.stefanycampanhoni.agora.infra.security;

import com.stefanycampanhoni.agora.domain.entities.User;
import org.springframework.security.core.context.SecurityContextHolder;

public final class UserContext {
    public static User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
