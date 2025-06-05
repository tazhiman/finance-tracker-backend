package com.rizwan.userService.mapper;

import com.rizwan.userService.dto.UserDto;
import com.rizwan.userService.entity.User;

public class UserMapper {
    // Mapping from Entity to DTO
    public static UserDto toUserDTO(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getUsername(),
                null, // avoid returning password
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getRole() // <-- add roles here
        );
    }

    // Mapping from DTO to Entity
    public static User fromUserDTO(UserDto dto) {
        if (dto == null) {
            return null;
        }
        User user = new User();
        user.setId(dto.getId());
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getUsername()); // Set username from DTO
        user.setPassword(dto.getPassword()); // Set password from DTO
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setRole(dto.getRole());
        return user;
    }
}
