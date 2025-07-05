package com.rizwan.userService.service;

import com.rizwan.userService.dto.AuthResponseDto;
import com.rizwan.userService.dto.PasswordUpdateDto;
import com.rizwan.userService.dto.UserDto;
import com.rizwan.userService.entity.User;
import com.rizwan.userService.entity.UserRole;
import com.rizwan.userService.mapper.UserMapper;
import com.rizwan.userService.repository.UserRepository;
import com.rizwan.userService.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public UserDto createUser(UserDto signUpUserDto) {
        // Check if username already exists
        if (userRepository.findByUsername(signUpUserDto.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Check if email already exists
        if (userRepository.findByEmail(signUpUserDto.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Create new user
        User user = UserMapper.fromUserDTO(signUpUserDto);
        
        // Set default role if not provided
        if (user.getRole() == null) {
            user.setRole(UserRole.ROLE_NORMAL_USER);
        }
        
        // Hash the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Save user to database
        User savedUser = userRepository.save(user);
        
        // Return user DTO without password
        return UserMapper.toUserDTO(savedUser);
    }

    @Override
    public AuthResponseDto authenticateUser(UserDto loginUserDto) {
        try {
            System.out.println("Attempting to authenticate user: " + loginUserDto.getUsername());
            
            // Authenticate user using Spring Security
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginUserDto.getUsername(),
                    loginUserDto.getPassword()
                )
            );

            // Get user details
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            
            // Generate JWT token
            String jwtToken = jwtService.generateToken(userDetails);
            
            // Get user from database
            User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Create response DTO with token and user details
            UserDto userDto = UserMapper.toUserDTO(user);
            return new AuthResponseDto(jwtToken, userDto);
        } catch (Exception e) {
            System.err.println("Authentication failed for user: " + loginUserDto.getUsername());
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Invalid username or password");
        }
    }

    @Override
    public UserDto getCurrentUser() {
        // Get current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }

        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return UserMapper.toUserDTO(user);
    }

    @Override
    public UserDto updatePassword(PasswordUpdateDto passwordUpdateDto) {
        // Get current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Verify current password
        if (!passwordEncoder.matches(passwordUpdateDto.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        // Update password with new password
        user.setPassword(passwordEncoder.encode(passwordUpdateDto.getNewPassword()));
        
        User updatedUser = userRepository.save(user);
        return UserMapper.toUserDTO(updatedUser);
    }

    @Override
    public UserDto updateUserDetails(UserDto updateUserDetailsDto) {
        // Get current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Update user details (excluding sensitive fields like password and role)
        if (updateUserDetailsDto.getFirstName() != null) {
            user.setFirstName(updateUserDetailsDto.getFirstName());
        }
        if (updateUserDetailsDto.getLastName() != null) {
            user.setLastName(updateUserDetailsDto.getLastName());
        }
        if (updateUserDetailsDto.getPhoneNumber() != null) {
            user.setPhoneNumber(updateUserDetailsDto.getPhoneNumber());
        }
        if (updateUserDetailsDto.getEmail() != null) {
            // Check if email is already taken by another user
            Optional<User> existingUser = userRepository.findByEmail(updateUserDetailsDto.getEmail());
            if (existingUser.isPresent() && !existingUser.get().getId().equals(user.getId())) {
                throw new RuntimeException("Email already exists");
            }
            user.setEmail(updateUserDetailsDto.getEmail());
        }

        User updatedUser = userRepository.save(user);
        return UserMapper.toUserDTO(updatedUser);
    }

    @Override
    public UserDto getUserByIdAdmin(Long id) {
        // This method expects Long but User entity uses UUID
        // You might want to change the parameter type to UUID or handle the conversion
        User user = userRepository.findById(UUID.fromString(id.toString()))
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        return UserMapper.toUserDTO(user);
    }

    @Override
    public UserDto updateUserAdmin(Long id, UserDto updateUserDto) {
        User user = userRepository.findById(UUID.fromString(id.toString()))
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Admin can update all fields
        if (updateUserDto.getUsername() != null) {
            // Check if username is already taken by another user
            Optional<User> existingUser = userRepository.findByUsername(updateUserDto.getUsername());
            if (existingUser.isPresent() && !existingUser.get().getId().equals(user.getId())) {
                throw new RuntimeException("Username already exists");
            }
            user.setUsername(updateUserDto.getUsername());
        }
        if (updateUserDto.getEmail() != null) {
            // Check if email is already taken by another user
            Optional<User> existingUser = userRepository.findByEmail(updateUserDto.getEmail());
            if (existingUser.isPresent() && !existingUser.get().getId().equals(user.getId())) {
                throw new RuntimeException("Email already exists");
            }
            user.setEmail(updateUserDto.getEmail());
        }
        if (updateUserDto.getFirstName() != null) {
            user.setFirstName(updateUserDto.getFirstName());
        }
        if (updateUserDto.getLastName() != null) {
            user.setLastName(updateUserDto.getLastName());
        }
        if (updateUserDto.getPhoneNumber() != null) {
            user.setPhoneNumber(updateUserDto.getPhoneNumber());
        }
        if (updateUserDto.getRole() != null) {
            user.setRole(updateUserDto.getRole());
        }
        if (updateUserDto.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(updateUserDto.getPassword()));
        }

        User updatedUser = userRepository.save(user);
        return UserMapper.toUserDTO(updatedUser);
    }

    @Override
    public void deleteUserAdmin(Long id) {
        User user = userRepository.findById(UUID.fromString(id.toString()))
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        userRepository.delete(user);
    }

    @Override
    public List<UserDto> getAllUsersAdmin() {
        List<User> users = userRepository.findAll();
        return users.stream()
            .map(UserMapper::toUserDTO)
            .toList();
    }
}
