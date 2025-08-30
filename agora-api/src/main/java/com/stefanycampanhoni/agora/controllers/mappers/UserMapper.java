package com.stefanycampanhoni.agora.controllers.mappers;

import com.stefanycampanhoni.agora.controllers.dtos.UserLoginRequest;
import com.stefanycampanhoni.agora.controllers.dtos.UserRequest;
import com.stefanycampanhoni.agora.controllers.dtos.UserResponse;
import com.stefanycampanhoni.agora.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "userRequest.email", target = "email")
    @Mapping(source = "userRequest.name", target = "name")
    @Mapping(source = "userRequest.password", target = "password")
    User toUser(UserRequest userRequest);

    @Mapping(source = "userRequest.email", target = "email")
    @Mapping(source = "userRequest.password", target = "password")
    User toUser(UserLoginRequest userRequest);

    UserResponse toUserResponse(User user);
}
