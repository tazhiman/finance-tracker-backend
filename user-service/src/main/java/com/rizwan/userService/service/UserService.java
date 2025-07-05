package com.rizwan.userService.service;

import com.rizwan.userService.dto.AuthResponseDto;
import com.rizwan.userService.dto.PasswordUpdateDto;
import com.rizwan.userService.dto.UserDto;

import java.util.List;

public interface UserService {
    // NORMAL USER FUNCTIONS
    UserDto createUser(UserDto signUpUserDto);

    AuthResponseDto authenticateUser(UserDto loginUserDto);

    UserDto getCurrentUser();

    UserDto updatePassword(PasswordUpdateDto passwordUpdateDto);

    UserDto updateUserDetails(UserDto updateUserDetailsDto);

    // ADMIN USER FUNCTIONS
    UserDto getUserByIdAdmin(Long id);

    UserDto updateUserAdmin(Long id, UserDto updateUserDto);

    void deleteUserAdmin(Long id);

    List<UserDto> getAllUsersAdmin();
}
