package com.stefanycampanhoni.agora.application.mappers;

import com.stefanycampanhoni.agora.application.dtos.user.UserEditRequest;
import com.stefanycampanhoni.agora.domain.entities.User;
import org.apache.commons.lang3.StringUtils;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface CustomUserMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "email", ignore = true)
    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    @Mapping(target = "profilePicture", ignore = true)
    @BeanMapping(
            nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE,
            qualifiedByName = "isNotBlankCondition"
    )
    void updateUserFromRequest(UserEditRequest userRequest, @MappingTarget User user);

    @Condition
    default boolean isNotBlank(String str) {
        return StringUtils.isNotBlank(str);
    }
}
