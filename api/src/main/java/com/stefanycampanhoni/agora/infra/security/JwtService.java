package com.stefanycampanhoni.agora.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.stefanycampanhoni.agora.domain.entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.stream.Collectors;

@Service
public class JwtService {
    private final Algorithm algorithm;
    private static final String ISSUER = "agora-api";

    public JwtService(@Value("${jwt.secret}") String secret) {
        this.algorithm = Algorithm.HMAC256(secret);
    }

    public String generateToken(User user) {
        try {
            String scope = user.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.joining(" "));

            return JWT.create()
                    .withIssuer(ISSUER)
                    .withSubject(user.getUsername())
                    .withClaim("scope", scope)
                    .withIssuedAt(Instant.now())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Erro ao gerar token JWT", exception);
        }
    }

    public String validateToken(String token) {
        try {
            DecodedJWT jwt = this.decodeToken(token);
            return jwt.getSubject();
        } catch (TokenExpiredException exception) {
            throw new RuntimeException("Token expired", exception);
        } catch (JWTVerificationException exception) {
            throw new RuntimeException("Invalid token", exception);
        }
    }

    public DecodedJWT decodeToken(String token) {
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(ISSUER)
                .build();

        return verifier.verify(token);
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusMinutes(30).toInstant(ZoneOffset.of("-03:00"));
    }
}
