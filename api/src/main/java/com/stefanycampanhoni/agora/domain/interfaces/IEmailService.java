package com.stefanycampanhoni.agora.domain.interfaces;

public interface IEmailService {
    void sendSimpleEmail(String to, String subject, String content);
}
