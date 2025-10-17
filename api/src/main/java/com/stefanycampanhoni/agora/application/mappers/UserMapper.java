package com.stefanycampanhoni.agora.application.mappers;

import com.stefanycampanhoni.agora.application.dtos.user.*;
import com.stefanycampanhoni.agora.domain.entities.User;
import org.mapstruct.*;

import java.util.stream.Collector;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "userRequest.email", target = "email")
    @Mapping(source = "userRequest.name", target = "name")
    @Mapping(source = "userRequest.password", target = "password")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    User toUser(UserRequest userRequest);

    UserResponse toUserResponse(User user);

    default Collector<UserResponse, UserListResponse, UserListResponse> toUserListResponse() {
        return Collector.of(
                UserListResponse::new,
                (response, userResponse) -> response.users().add(userResponse),
                (response1, response2) -> {
                    response1.users().addAll(response2.users());
                    return response1;
                }
        );
    };
}