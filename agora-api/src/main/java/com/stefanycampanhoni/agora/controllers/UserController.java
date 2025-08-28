package com.stefanycampanhoni.agora.controllers;

import com.stefanycampanhoni.agora.dtos.TokenResponse;
import com.stefanycampanhoni.agora.dtos.UserLoginRequest;
import com.stefanycampanhoni.agora.dtos.UserRequest;
import com.stefanycampanhoni.agora.dtos.UserResponse;
import com.stefanycampanhoni.agora.mappers.UserMapper;
import com.stefanycampanhoni.agora.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
@Tag(name = "Usuários", description = "Endpoints para gerenciamento de usuários")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @PostMapping
    @Operation(summary = "Registrar", description = "Registra um novo usuário")
    public ResponseEntity<TokenResponse> register(@RequestBody UserRequest userRequest) {
        TokenResponse token = userService.register(userMapper.toUser(userRequest));
        return ResponseEntity.ok(token);
    }

    @PostMapping(path = "/login")
    @Operation(summary = "Logar", description = "Autentica um usuário existente")
    public ResponseEntity<TokenResponse> login(@RequestBody UserLoginRequest userRequest) {
        TokenResponse token = userService.login(userMapper.toUser(userRequest));
        return ResponseEntity.ok(token);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obter Usuário por ID", description = "Retorna os detalhes de um usuário específico pelo ID")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        UserResponse response = userMapper.toUserResponse(userService.getUserById(id));
        return ResponseEntity.ok(response);
    }
}
