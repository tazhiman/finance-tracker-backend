package com.rizwan.userService.dto;

import com.rizwan.userService.entity.UserRole;

import java.util.UUID;

public class UserDto {
    private UUID id;
    private String email;
    private String username; // New field
    private String password; // New field
    private UserRole role;
}
