package com.stefanycampanhoni.agora.application.mappers;

import com.stefanycampanhoni.agora.application.dtos.TokenResponse;
import com.stefanycampanhoni.agora.infra.security.Token;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    TokenResponse toResponse(Token token);
}
