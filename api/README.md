# Agora API - Backend

API RESTful para o sistema de agendamento de salas de reunião, desenvolvida com Spring Boot 3.5.5 e Java 21.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Configuração](#configuração)
- [Execução](#execução)
- [Endpoints](#endpoints)
- [Banco de Dados](#banco-de-dados)
- [Segurança](#segurança)
- [WebSocket](#websocket)
- [Docker](#docker)

## 🎯 Visão Geral

A API do Agora é responsável por:

- Gerenciamento de usuários e autenticação
- CRUD de salas de reunião
- Sistema de reservas com validação de conflitos
- Notificações em tempo real via WebSocket
- Recuperação de senha via e-mail
- Dashboard administrativo com estatísticas

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas (Clean Architecture):

```
com.stefanycampanhoni.agora/
├── application/           # Camada de Aplicação
│   ├── dtos/             # Data Transfer Objects
│   ├── exceptions/        # Exceções customizadas
│   ├── mappers/          # MapStruct mappers (Entity ↔ DTO)
│   └── services/         # Regras de negócio
│
├── domain/               # Camada de Domínio
│   ├── entities/         # Entidades JPA
│   ├── enums/            # Enumerações
│   ├── interfaces/       # Interfaces de serviços
│   └── repositories/     # Interfaces de repositórios
│
├── infra/                # Camada de Infraestrutura
│   ├── configuration/    # Configurações (CORS, WebSocket, etc)
│   ├── external/         # Serviços externos (Email)
│   └── security/         # Segurança (JWT, Auth)
│
└── presentation/         # Camada de Apresentação
    └── controllers/      # Controllers REST
```

### Princípios Aplicados

- **Separation of Concerns**: Cada camada tem responsabilidade única
- **Dependency Inversion**: Camadas superiores dependem de abstrações
- **Single Responsibility**: Classes com propósito único e bem definido
- **Open/Closed**: Extensível sem modificar código existente

## 🛠️ Tecnologias

### Core

- **Java 21**: Última LTS com recursos modernos (Records, Pattern Matching)
- **Spring Boot 3.5.5**: Framework principal
- **Gradle**: Build e gerenciamento de dependências

### Spring Modules

- **Spring Web**: APIs REST
- **Spring Data JPA**: Persistência de dados
- **Spring Security**: Autenticação e autorização
- **Spring WebSocket**: Comunicação em tempo real
- **Spring Mail**: Envio de e-mails
- **Spring Validation**: Validação de dados

### Banco de Dados

- **PostgreSQL 16**: Banco de dados relacional
- **Hibernate**: ORM

### Segurança

- **JWT (Auth0)**: Tokens de autenticação stateless
- **BCrypt**: Hash de senhas

### Utilities

- **Lombok**: Redução de boilerplate
- **MapStruct**: Mapeamento de objetos type-safe
- **Springdoc OpenAPI**: Documentação automática

### DevOps

- **Docker & Docker Compose**: Containerização
- **Gradle Wrapper**: Build consistente

## 📋 Pré-requisitos

- **Java 21** ou superior
- **PostgreSQL 16** ou superior
- **Gradle 8+** (incluído via wrapper)
- **Docker** (opcional, recomendado)

## ⚙️ Configuração

### 1. Banco de Dados

Crie um banco PostgreSQL:

```sql
CREATE DATABASE agora;
```

### 2. Variáveis de Ambiente

Configure as variáveis de ambiente ou edite `src/main/resources/application.properties`:

#### Banco de Dados

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/agora
spring.datasource.username=postgres
spring.datasource.password=sua_senha
```

#### Email (Gmail)

```properties
spring.mail.username=seu_email@gmail.com
spring.mail.password=sua_app_password
```

> **Nota**: Para Gmail, use uma [App Password](https://support.google.com/accounts/answer/185833)

#### Segurança

```properties
jwt.secret=sua_chave_secreta_jwt_aqui_minimo_256_bits
admin.secret=chave_para_criar_admin
```

#### Aplicação Frontend

```properties
app.base-url=http://localhost:5173/
```

### 3. Arquivo .env (Docker)

Crie um arquivo `.env` na raiz do diretório `api/`:

```env
# Database
DATABASE_PASSWORD=postgres

# Mail
MAIL_USERNAME=seu_email@gmail.com
MAIL_PASSWORD=sua_app_password

# Security
JWT_SECRET=sua_chave_secreta_jwt_256bits
ADMIN_SECRET=chave_admin_setup

# App
APP_BASE_URL=http://localhost:5173/
```

## 🚀 Execução

### Desenvolvimento Local (sem Docker)

```bash
# Clone o repositório
cd api

# Execute a aplicação
./gradlew bootRun

# Ou compile e execute o JAR
./gradlew build
java -jar build/libs/agora-0.0.1.jar
```

### Com Docker Compose (Recomendado)

```bash
cd api

# Inicie todos os serviços (API + PostgreSQL)
docker-compose up

# Ou em modo detached
docker-compose up -d

# Apenas banco de dados
docker-compose up db

# Modo desenvolvimento (com debug na porta 5005)
docker-compose --profile dev up
```

### Build para Produção

```bash
./gradlew build -x test
java -jar build/libs/agora-0.0.1.jar
```

A API estará disponível em: **http://localhost:8080**

## 📡 Endpoints

### Documentação Interativa

Acesse a documentação Swagger em:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

### Principais Endpoints

#### Autenticação

```http
POST /auth/login
POST /auth/register
POST /password-reset/request
POST /password-reset/reset
```

#### Usuários

```http
GET    /users
GET    /users/{id}
POST   /users
PUT    /users/{id}
DELETE /users/{id}
```

#### Salas

```http
GET    /rooms
GET    /rooms/{id}
POST   /rooms
PUT    /rooms/{id}
DELETE /rooms/{id}
```

#### Reservas

```http
GET    /reservations
GET    /reservations/{id}
GET    /reservations/user
POST   /reservations
PUT    /reservations/{id}
DELETE /reservations/{id}
```

#### Dashboard

```http
GET /dashboard/stats
```

### Autenticação de Requests

Todas as requisições (exceto login e registro) requerem um token JWT:

```http
Authorization: Bearer <seu_token_jwt>
```

## 💾 Banco de Dados

### Schema Principal

#### Users

```sql
users (
    id BIGINT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
```

#### Rooms

```sql
rooms (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL,
    description TEXT,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
```

#### Reservations

```sql
reservations (
    id BIGINT PRIMARY KEY,
    room_id BIGINT REFERENCES rooms(id),
    user_id BIGINT REFERENCES users(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    purpose TEXT,
    status VARCHAR(20),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
```

#### Tokens (JWT Blacklist)

```sql
tokens (
    id BIGINT PRIMARY KEY,
    token TEXT NOT NULL,
    expiry_date TIMESTAMP NOT NULL
)
```

#### Reset Passwords

```sql
reset_passwords (
    id BIGINT PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    token VARCHAR(255) NOT NULL,
    expiry_date TIMESTAMP NOT NULL
)
```

### Migrações

O Hibernate está configurado com `ddl-auto=update`, criando/atualizando tabelas automaticamente.

Para produção, recomenda-se usar Flyway ou Liquibase para migrações controladas.

## 🔐 Segurança

### Autenticação JWT

1. **Login**: Cliente envia email/senha
2. **Validação**: Spring Security valida credenciais
3. **Token**: JWT gerado com claims (id, email, role)
4. **Expiração**: Token válido por tempo configurável
5. **Refresh**: Cliente deve fazer novo login após expiração

### Estrutura do Token

```json
{
  "sub": "user@example.com",
  "userId": 1,
  "role": "ADMIN",
  "iat": 1700000000,
  "exp": 1700086400
}
```

### Roles e Permissões

- **ADMIN**: Acesso total (CRUD de usuários, salas, reservas)
- **USER**: Visualização e criação de reservas próprias

### Configuração de Segurança

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // CORS configurado para frontend
    // JWT Filter na cadeia de filtros
    // Endpoints públicos: /auth/**, /password-reset/**
    // Endpoints protegidos: todos os demais
}
```

### Password Encoding

Senhas são hasheadas com **BCrypt** (custo 10):

```java
passwordEncoder.encode("senha123")
// -> $2a$10$...hash...
```

## 🔌 WebSocket

### Configuração

- **Endpoint**: `/ws`
- **Protocol**: STOMP over SockJS
- **Message Broker**: In-memory Simple Broker

### Tópicos

```
/topic/reservations        # Atualizações de reservas
/topic/rooms               # Atualizações de salas
/topic/dashboard           # Estatísticas em tempo real
```

### Cliente (exemplo JavaScript)

```javascript
const socket = new SockJS("http://localhost:8080/ws")
const stompClient = Stomp.over(socket)

stompClient.connect({}, () => {
  stompClient.subscribe("/topic/reservations", (message) => {
    const data = JSON.parse(message.body)
    // Processar atualização
  })
})
```

### Mensagens Enviadas

Sempre que há CRUD em reservas/salas, uma mensagem é enviada aos clientes conectados.

## 🐳 Docker

### Imagens

- **postgres:16-alpine**: Banco de dados (leve e performático)
- **agora-api**: Imagem customizada (multi-stage build)

### Multi-Stage Build

```dockerfile
# Stage 1: Build
FROM gradle:8-jdk21 AS build
# Compila a aplicação

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine AS final
# Executa apenas o JAR
```

### Comandos Úteis

```bash
# Iniciar serviços
docker-compose up

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f api

# Rebuild da imagem
docker-compose build --no-cache

# Executar comandos no container
docker-compose exec api sh

# Acessar banco de dados
docker-compose exec db psql -U postgres -d agora
```

### Healthchecks

- **Database**: `pg_isready` a cada 10s
- **API**: `/actuator/health` a cada 30s

### Portas

- `5432`: PostgreSQL (interno)
- `5433`: PostgreSQL (exposto no host)
- `8080`: API (produção)
- `8081`: API (desenvolvimento)
- `5005`: Debug remoto (desenvolvimento)

## 🧪 Testes

```bash
# Executar todos os testes
./gradlew test

# Relatório de testes
./gradlew test --info

# Ver relatório HTML
# build/reports/tests/test/index.html
```

## 📊 Monitoramento

### Spring Actuator

Endpoints de monitoramento (protegidos):

```
/actuator/health          # Status da aplicação
/actuator/info            # Informações da aplicação
/actuator/metrics         # Métricas
```

## 🔧 Troubleshooting

### Erro de Conexão com Banco

```bash
# Verifique se PostgreSQL está rodando
psql -U postgres -d agora

# Teste conectividade
telnet localhost 5432
```

### Token JWT Inválido

- Verifique se `jwt.secret` está configurado
- Confirme que o token não expirou
- Certifique-se de enviar `Bearer <token>`

### Erro ao Enviar Email

- Use App Password, não senha normal do Gmail
- Verifique firewall/antivírus
- Confirme credenciais em `application.properties`

## 📝 Boas Práticas

### DTOs vs Entities

- **Nunca** exponha entidades diretamente nos controllers
- Use DTOs para controlar dados de entrada/saída
- MapStruct para conversões automáticas

### Tratamento de Erros

Exceptions customizadas são capturadas por `@ControllerAdvice`:

```java
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ErrorResponse> handleNotFound(...)
```

### Validação

Use annotations de validação:

```java
@NotBlank(message = "Email é obrigatório")
@Email(message = "Email inválido")
private String email;
```

## 🚀 Roadmap

- [ ] Implementar refresh tokens
- [ ] Adicionar paginação em todos os endpoints
- [ ] Migrar para Flyway
- [ ] Implementar cache (Redis)
- [ ] Adicionar rate limiting
- [ ] Métricas com Prometheus
- [ ] Logs estruturados (ELK Stack)

## 📄 Licença

Este projeto está sob a licença especificada no arquivo LICENSE.

---

**Versão**: 0.0.1  
**Autora**: Stefany Campanhoni
