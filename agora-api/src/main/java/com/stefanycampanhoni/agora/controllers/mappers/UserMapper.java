package com.stefanycampanhoni.agora.controllers.mappers;

import com.stefanycampanhoni.agora.controllers.dtos.user.UserLoginRequest;
import com.stefanycampanhoni.agora.controllers.dtos.user.UserRequest;
import com.stefanycampanhoni.agora.controllers.dtos.user.UserResponse;
import com.stefanycampanhoni.agora.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "userRequest.email", target = "email")
    @Mapping(source = "userRequest.name", target = "name")
    @Mapping(source = "userRequest.password", target = "password")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    User toUser(UserRequest userRequest);

    @Mapping(source = "userRequest.email", target = "email")
    @Mapping(source = "userRequest.password", target = "password")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "name", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    User toUser(UserLoginRequest userRequest);

    UserResponse toUserResponse(User user);
}
