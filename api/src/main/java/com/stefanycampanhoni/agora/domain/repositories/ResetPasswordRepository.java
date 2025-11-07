package com.stefanycampanhoni.agora.domain.repositories;

import com.stefanycampanhoni.agora.domain.entities.ResetPassword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResetPasswordRepository extends JpaRepository<ResetPassword, Long> {
    Optional<ResetPassword> findByHashToken(String hashToken);
}
