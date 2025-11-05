package com.stefanycampanhoni.agora.presentation.controllers;

import com.stefanycampanhoni.agora.application.dtos.TokenResponse;
import com.stefanycampanhoni.agora.application.dtos.user.*;
import com.stefanycampanhoni.agora.application.mappers.AuthMapper;
import com.stefanycampanhoni.agora.application.mappers.UserMapper;
import com.stefanycampanhoni.agora.application.services.ResetPasswordService;
import com.stefanycampanhoni.agora.domain.entities.User;
import com.stefanycampanhoni.agora.application.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/users")
@Tag(name = "Usuários", description = "Endpoints para gerenciamento de usuários")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ResetPasswordService resetPasswordService;

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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserListResponse> getAllUsers() {
        UserListResponse response = userService.getAllUsers();
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateUser(@AuthenticationPrincipal User currentUser,
                                                   @RequestBody UserEditRequest userRequest) {
        UserResponse response = userService.updateUser(currentUser, userRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/can-edit")
    public ResponseEntity<Boolean> canEditUser(@AuthenticationPrincipal User currentUser,
                                               @RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userService.canEditUser(currentUser, userRequest.email()));
    }

    @PostMapping("/admin/register")
    public ResponseEntity<UserResponse> createAdminUser(@RequestBody AdminRequest adminRequest) {
        UserResponse response = userService.createAdminUser(adminRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/password/reset")
    public ResponseEntity<Void> sendResetPasswordEmail(@RequestBody String email) {
        resetPasswordService.resetPassword(email);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/password/reset")
    public ResponseEntity<Void> resetPassword(@RequestBody String email) {
        resetPasswordService.resetPassword(email);
        return ResponseEntity.noContent().build();
    }

}
