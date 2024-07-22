package com.example.authservices.mapper;

import com.example.authservices.dto.UserDTO;
import com.example.authservices.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO userToUserDTO(User user);
}