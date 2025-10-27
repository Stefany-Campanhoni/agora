package com.stefanycampanhoni.agora.presentation.controllers.websocket.handler;

import com.stefanycampanhoni.agora.application.dtos.websocket.AdminUpdateResponse;
import com.stefanycampanhoni.agora.application.services.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class AdminDashboardHandler {

    @Autowired
    private AdminDashboardService adminDashboardService;

    @MessageMapping("/update")
    @SendTo("/admin/dashboard")
    public AdminUpdateResponse handleUpdate() {
        return adminDashboardService.processUpdate();
    }
}
