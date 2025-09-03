package com.stefanycampanhoni.agora.controllers.mappers;

import com.stefanycampanhoni.agora.controllers.dtos.TokenResponse;
import com.stefanycampanhoni.agora.security.Token;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    TokenResponse toResponse(Token token);
}
