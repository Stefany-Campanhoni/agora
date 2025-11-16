# Agora - Sistema de Agendamento de Salas de Reunião

Sistema completo para gerenciamento e agendamento de salas de reunião, desenvolvido com uma arquitetura moderna e escalável.

## 📋 Sobre o Projeto

O Agora é uma solução integrada que permite o gerenciamento eficiente de salas de reunião, oferecendo funcionalidades de reserva, visualização de disponibilidade em tempo real e administração de usuários e espaços.

## 🏗️ Arquitetura

O projeto é composto por três aplicações principais:

### 🌐 Frontend Web (`app/`)

- **Tecnologia**: React 19 + TypeScript + Vite
- **Gerenciamento de Estado**: Redux Toolkit
- **UI Framework**: React Bootstrap
- **Comunicação em Tempo Real**: WebSocket (STOMP + SockJS)
- **Features**:
  - Interface responsiva para usuários finais
  - Dashboard com visualização de reservas
  - Calendário interativo para agendamentos
  - Notificações em tempo real
  - Autenticação JWT

### 🚀 Backend API (`api/`)

- **Tecnologia**: Spring Boot 3.5.5 + Java 21
- **Banco de Dados**: PostgreSQL
- **Segurança**: Spring Security + JWT
- **Documentação**: OpenAPI/Swagger
- **Features**:
  - API RESTful
  - WebSocket para atualizações em tempo real
  - Autenticação e autorização
  - Envio de e-mails
  - Arquitetura em camadas (Domain, Application, Infrastructure, Presentation)

### 🖥️ Desktop Admin (`desktop/`)

- **Tecnologia**: Qt 6.9.3 (C++ + QML)
- **Propósito**: Aplicação desktop para criação do usuário administrador inicial
- **Features**:
  - Interface nativa multiplataforma
  - Criação de usuário admin
  - Configuração inicial do sistema

## 🛠️ Tecnologias Utilizadas

### Frontend

- React 19
- TypeScript
- Vite
- Redux Toolkit & Redux Persist
- React Router DOM
- React Bootstrap
- React Hook Form
- Axios
- WebSocket (STOMP/SockJS)
- date-fns & React DatePicker

### Backend

- Spring Boot 3.5.5
- Java 21
- PostgreSQL
- Spring Security
- Spring WebSocket
- Spring Data JPA
- JWT (Auth0)
- MapStruct
- Lombok
- Spring Mail
- Swagger/OpenAPI

### Desktop

- Qt 6.9.3
- QML
- CMake
- C++

## 📦 Pré-requisitos

### Frontend

- Node.js 18+
- npm ou yarn

### Backend

- Java 21
- PostgreSQL
- Docker (opcional, para docker-compose)

### Desktop

- Qt 6.9.3
- CMake 3.16+
- MSVC 2022 (Windows) ou compilador C++ equivalente

## 🚀 Como Executar

### Backend

```bash
cd api
./gradlew bootRun
```

Ou usando Docker:

```bash
cd api
docker-compose up
```

A API estará disponível em `http://localhost:8080`
Documentação Swagger: `http://localhost:8080/swagger-ui.html`

### Frontend

```bash
cd app
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Desktop (Admin Setup)

```bash
cd desktop/build
cmake ..
cmake --build .
```

Execute o binário gerado para criar o usuário administrador inicial.

## 📂 Estrutura do Projeto

```
agora/
├── api/                    # Backend Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/stefanycampanhoni/agora/
│   │   │   │       ├── application/      # DTOs, Services, Mappers
│   │   │   │       ├── domain/           # Entities, Repositories
│   │   │   │       ├── infra/            # Security, Config
│   │   │   │       └── presentation/     # Controllers
│   │   │   └── resources/
│   │   └── test/
│   ├── build.gradle
│   └── docker-compose.yml
│
├── app/                    # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── layouts/        # Layouts (Admin, User, Basic)
│   │   ├── service/        # API clients
│   │   ├── store/          # Redux store e slices
│   │   └── hooks/          # Custom hooks
│   ├── package.json
│   └── vite.config.ts
│
└── desktop/                # App Desktop Qt
    ├── Components/         # Componentes QML
    ├── Images/             # Resources
    ├── FormHandler.cpp     # Lógica C++
    ├── Main.qml            # Interface principal
    └── CMakeLists.txt
```

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação. O fluxo é:

1. Usuário faz login via frontend
2. Backend valida credenciais e retorna token JWT
3. Frontend armazena token (Redux Persist)
4. Token é enviado em todas as requisições subsequentes
5. WebSocket utiliza o mesmo token para autenticação

## 📧 Funcionalidades

- ✅ Cadastro e autenticação de usuários
- ✅ Gerenciamento de salas (CRUD)
- ✅ Agendamento de reservas
- ✅ Visualização de disponibilidade em tempo real
- ✅ Dashboard administrativo
- ✅ Notificações por e-mail
- ✅ WebSocket para atualizações instantâneas
- ✅ Aplicação desktop para setup inicial

## 👥 Perfis de Usuário

- **Admin**: Gerencia salas, usuários e reservas
- **User**: Visualiza disponibilidade e cria reservas

## 📝 Licença

Este projeto está sob a licença especificada no arquivo LICENSE.

## 👨‍💻 Autora

Stefany Campanhoni 🦔

---

**Versão**: 0.0.1
