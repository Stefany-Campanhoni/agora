package com.stefanycampanhoni.agora.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfiguration {

    @Bean
    public OpenAPI customOpenAPI(){
        return new OpenAPI().info(new Info()
                        .title("Àgora API")
                        .version("1.0.0")
                        .description("API para gerenciamento agendamento de Salas de Reunião'"))
                .servers(List.of(new Server().url("http://localhost:8080/").description("Ambiente de Desenvolvimento")));
    }
}
