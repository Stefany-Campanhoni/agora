package com.stefanycampanhoni.agora.application.mappers;

import com.stefanycampanhoni.agora.application.dtos.user.UserLoginRequest;
import com.stefanycampanhoni.agora.application.dtos.user.UserRequest;
import com.stefanycampanhoni.agora.application.dtos.user.UserResponse;
import com.stefanycampanhoni.agora.domain.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "userRequest.email", target = "email")
    @Mapping(source = "userRequest.name", target = "name")
    @Mapping(source = "userRequest.password", target = "password")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    User toUser(UserRequest userRequest);

    @Mapping(source = "userRequest.email", target = "email")
    @Mapping(source = "userRequest.password", target = "password")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", ignore = true)
    @Mapping(target = "role", ignore = true)
    User toUser(UserLoginRequest userRequest);

    UserResponse toUserResponse(User user);
}
