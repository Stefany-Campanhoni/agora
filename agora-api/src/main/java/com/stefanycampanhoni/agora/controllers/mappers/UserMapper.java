package com.stefanycampanhoni.agora.controllers.mappers;

import com.stefanycampanhoni.agora.controllers.dtos.UserRequest;
import com.stefanycampanhoni.agora.controllers.dtos.UserResponse;
import com.stefanycampanhoni.agora.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "id", ignore = true)
    User toUser(UserRequest userRequest);
    UserResponse toUserResponse(User user);
}
