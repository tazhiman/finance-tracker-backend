package com.rizwan.userService.service;

import com.rizwan.userService.dto.UserDto;
import com.rizwan.userService.entity.User;
import com.rizwan.userService.mapper.UserMapper;

import java.util.List;

public class UserServiceImpl implements UserService{
    @Override
    public UserDto createUser(UserDto signUpUserDto) {
        User user = UserMapper.fromUserDTO(signUpUserDto);
        user.getPassword()
        return null;
    }

    @Override
    public UserDto authenticateUser(UserDto loginUserDto) {
        return null;
    }

    @Override
    public UserDto getCurrentUser() {
        return null;
    }

    @Override
    public UserDto updatePassword(UserDto updatePasswordUserDto) {
        return null;
    }

    @Override
    public UserDto updateUserDetails(UserDto updateUserDetailsDto) {
        return null;
    }

    @Override
    public UserDto getUserByIdAdmin(Long id) {
        return null;
    }

    @Override
    public UserDto updateUserAdmin(Long id, UserDto updateUserDto) {
        return null;
    }

    @Override
    public void deleteUserAdmin(Long id) {

    }

    @Override
    public List<UserDto> getAllUsersAdmin() {
        return List.of();
    }
}
