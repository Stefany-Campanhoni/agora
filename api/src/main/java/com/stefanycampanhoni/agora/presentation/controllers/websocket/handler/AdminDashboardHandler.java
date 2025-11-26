package com.stefanycampanhoni.agora.presentation.controllers.websocket.handler;

import com.stefanycampanhoni.agora.application.dtos.websocket.AdminUpdateResponse;
import com.stefanycampanhoni.agora.application.services.AdminDashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@Tag(name = "Dashboard Admin WebSocket", description = "Endpoint WebSocket para atualizações do painel administrativo")
public class AdminDashboardHandler {

    @Autowired
    private AdminDashboardService adminDashboardService;

    @MessageMapping("/update")
    @SendTo("/admin/dashboard")
    @Operation(summary = "Atualizar dashboard", description = "Processa e retorna atualizações para o painel administrativo via WebSocket")
    public AdminUpdateResponse handleUpdate() {
        return adminDashboardService.processUpdate();
    }
}
