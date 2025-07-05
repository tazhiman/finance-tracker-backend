package com.rizwan.userService.controller;

import com.rizwan.userService.dto.PasswordUpdateDto;
import com.rizwan.userService.dto.UserDto;
import com.rizwan.userService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser() {
        UserDto user = userService.getCurrentUser();
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me/password")
    public ResponseEntity<UserDto> updatePassword(@RequestBody PasswordUpdateDto passwordUpdateDto) {
        UserDto user = userService.updatePassword(passwordUpdateDto);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me/update")
    public ResponseEntity<UserDto> updateUserDetails(@RequestBody UserDto updateUserDetailsDto) {
        UserDto user = userService.updateUserDetails(updateUserDetailsDto);
        return ResponseEntity.ok(user);
    }
}
