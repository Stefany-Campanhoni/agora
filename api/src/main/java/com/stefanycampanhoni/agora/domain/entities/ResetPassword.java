package com.stefanycampanhoni.agora.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "reset_passwords")
public class ResetPassword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hash_token", nullable = false)
    private String hashToken;

    @Column(name = "expiration_datetime", nullable = false)
    private LocalDateTime expirationDateTime;

    @Column(name = "was_used", nullable = false)
    private Boolean wasUsed;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User generatedFor;
}
