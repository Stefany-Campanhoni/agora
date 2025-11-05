package com.stefanycampanhoni.agora.domain.repositories;

import com.stefanycampanhoni.agora.domain.entities.ResetPassword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResetPasswordRepository extends JpaRepository<ResetPassword, Long> {
    ResetPassword findByHashToken(String hashToken);
}
