package com.stefanycampanhoni.agora.presentation.controllers;

import com.stefanycampanhoni.agora.application.dtos.TokenResponse;
import com.stefanycampanhoni.agora.application.dtos.user.UserListResponse;
import com.stefanycampanhoni.agora.application.dtos.user.UserLoginRequest;
import com.stefanycampanhoni.agora.application.dtos.user.UserRequest;
import com.stefanycampanhoni.agora.application.dtos.user.UserResponse;
import com.stefanycampanhoni.agora.application.mappers.AuthMapper;
import com.stefanycampanhoni.agora.application.mappers.UserMapper;
import com.stefanycampanhoni.agora.domain.entities.User;
import com.stefanycampanhoni.agora.application.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/users")
@Tag(name = "Usuários", description = "Endpoints para gerenciamento de usuários")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private AuthMapper authMapper;

    @PostMapping
    @Operation(summary = "Registrar", description = "Registra um novo usuário")
    public ResponseEntity<TokenResponse> register(@RequestBody UserRequest userRequest) {
        TokenResponse response = userService.register(userRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping(path = "/login")
    @Operation(summary = "Logar", description = "Autentica um usuário existente")
    public ResponseEntity<TokenResponse> login(@RequestBody UserLoginRequest userRequest) {
        TokenResponse response = userService.login(userRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    @Operation(summary = "Obter Usuário autenticado", description = "Retorna os detalhes do usuário autenticado atualmente")
    public ResponseEntity<UserResponse> getUserById(@AuthenticationPrincipal User user) {
        UserResponse response = userService.getUserByEmail(user.getEmail());
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<UserListResponse> getAllUsers() {
        UserListResponse response = userService.getAllUsers();
        return ResponseEntity.ok(response);
    }
}
