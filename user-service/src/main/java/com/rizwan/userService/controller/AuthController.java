package com.rizwan.userService.controller;

import com.rizwan.userService.dto.AuthResponseDto;
import com.rizwan.userService.dto.UserDto;
import com.rizwan.userService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto signUpUserDto) {
        UserDto user = userService.createUser(signUpUserDto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> loginUser(@RequestBody UserDto loginUserDto) {
        AuthResponseDto authResponse = userService.authenticateUser(loginUserDto);
        return ResponseEntity.ok(authResponse);
    }
} 