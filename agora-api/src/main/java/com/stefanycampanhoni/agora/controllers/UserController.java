package com.stefanycampanhoni.agora.controllers;

import com.stefanycampanhoni.agora.controllers.dtos.UserRequest;
import com.stefanycampanhoni.agora.controllers.dtos.UserResponse;
import com.stefanycampanhoni.agora.controllers.mappers.UserMapper;
import com.stefanycampanhoni.agora.models.User;
import com.stefanycampanhoni.agora.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest) {
        User createdUser = userService.createUser(userMapper.toUser(userRequest));
        return ResponseEntity.ok(userMapper.toUserResponse(createdUser));
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> response = userService.getAllUsers().stream()
                .map(userMapper::toUserResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        UserResponse response = userMapper.toUserResponse(userService.getUserById(id));
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest userRequest) {
        User updatedUser = userService.updateUser(id, userMapper.toUser(userRequest));
        return ResponseEntity.ok(userMapper.toUserResponse(updatedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
