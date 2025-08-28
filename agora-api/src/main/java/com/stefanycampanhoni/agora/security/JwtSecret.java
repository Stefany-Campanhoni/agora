package com.stefanycampanhoni.agora.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt")
public record JwtSecret(String secret) {}
