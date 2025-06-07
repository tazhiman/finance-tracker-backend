package com.rizwan.userService.controller;

import com.rizwan.userService.dto.UserDto;
import com.rizwan.userService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;


    // normal user endpoints
    @PostMapping("auth/signup")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto signUpUserDto) {
        UserDto user = userService.createUser(signUpUserDto);
        return ResponseEntity.ok(user);
    }

    @PostMapping("auth/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody UserDto loginUserDto) {
        UserDto user = userService.authenticateUser(loginUserDto);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser() {
        UserDto user = userService.getCurrentUser();
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me/password")
    public ResponseEntity<UserDto> updatePassword(@RequestBody UserDto updatePasswordUserDto) {
        UserDto user = userService.updatePassword(updatePasswordUserDto);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/me/update")
    public ResponseEntity<UserDto> updateUserDetails(@RequestBody UserDto updateUserDetailsDto) {
        UserDto user = userService.updateUserDetails(updateUserDetailsDto);
        return ResponseEntity.ok(user);
    }

    // ------------------ ADMIN USER ENDPOINTS -----------------------------
    @GetMapping("/admin/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsersAdmin();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/admin/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto user = userService.getUserByIdAdmin(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/admin/users/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto updateUserDto) {
        UserDto user = userService.updateUserAdmin(id, updateUserDto);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/admin/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserAdmin(id);
        return ResponseEntity.noContent().build();
    }
}
