package com.rizwan.userService.service;

import com.rizwan.userService.dto.UserDto;

import java.util.List;

public interface UserService {
    // NORMAL USER FUNCTIONS
    UserDto createUser(UserDto signUpUserDto);

    UserDto authenticateUser(UserDto loginUserDto);

    UserDto getCurrentUser();

    UserDto updatePassword(UserDto updatePasswordUserDto);

    UserDto updateUserDetails(UserDto updateUserDetailsDto);

    // ADMIN USER FUNCTIONS
    UserDto getUserByIdAdmin(Long id);

    UserDto updateUserAdmin(Long id, UserDto updateUserDto);

    void deleteUserAdmin(Long id);

    List<UserDto> getAllUsersAdmin();



}
