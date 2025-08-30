package com.stefanycampanhoni.agora.controllers.mappers;

import com.stefanycampanhoni.agora.controllers.dtos.TokenResponse;
import com.stefanycampanhoni.agora.security.Token;
import org.mapstruct.Mapping;

public interface AuthMapper {
    @Mapping(source = "token", target = "token.token")
    TokenResponse toResponse(Token token);
}
