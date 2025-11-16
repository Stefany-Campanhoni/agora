# Agora App - Frontend

Aplicação web frontend para o sistema de agendamento de salas de reunião, desenvolvida com React 19, TypeScript e Vite.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Execução](#execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Features](#features)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Comunicação com API](#comunicação-com-api)
- [WebSocket](#websocket)
- [Rotas](#rotas)
- [Componentes](#componentes)
- [Build](#build)

## 🎯 Visão Geral

O frontend do Agora oferece uma interface moderna e responsiva para:

- Autenticação de usuários (login/registro)
- Visualização e gerenciamento de salas
- Sistema de reservas com calendário interativo
- Dashboard administrativo
- Notificações em tempo real via WebSocket
- Gerenciamento de perfil de usuário

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular baseada em:

- **Component-Based Architecture**: Componentes reutilizáveis
- **Feature-Based Structure**: Organização por funcionalidade
- **Redux Toolkit**: Gerenciamento de estado centralizado
- **Custom Hooks**: Lógica reutilizável
- **Service Layer**: Abstração de chamadas API

### Fluxo de Dados

```
UI Component → Custom Hook → Service → API Client → Backend
     ↓                                                  ↓
Redux Store ← WebSocket ← Server-Sent Events ← Backend
```

## 🛠️ Tecnologias

### Core

- **React 19.1.1**: Biblioteca UI com recursos mais recentes
- **TypeScript 5.8.3**: Tipagem estática
- **Vite 7.1.2**: Build tool ultra-rápido com HMR

### UI & Styling

- **React Bootstrap 2.10.10**: Componentes prontos
- **Bootstrap 5.3.8**: Framework CSS
- **React Icons 5.5.0**: Biblioteca de ícones
- **CSS Modules**: Estilos com escopo local

### State Management

- **Redux Toolkit 2.9.0**: State management simplificado
- **React Redux 9.2.0**: Bindings React-Redux
- **Redux Persist 6.0.0**: Persistência de estado

### Routing

- **React Router DOM 7.9.1**: Roteamento declarativo

### Forms & Validation

- **React Hook Form 7.63.0**: Gerenciamento de formulários performático
- **React DatePicker 8.8.0**: Seletor de data/hora

### HTTP & WebSocket

- **Axios 1.12.2**: Cliente HTTP
- **STOMP.js 7.2.1**: WebSocket com protocolo STOMP
- **SockJS Client 1.6.1**: Fallback para WebSocket

### Utilities

- **date-fns 4.1.0**: Manipulação de datas
- **jwt-decode 4.0.0**: Decodificação de tokens JWT

### Dev Tools

- **ESLint 9.33.0**: Linter
- **TypeScript ESLint**: Regras específicas para TS
- **Vite Plugin React**: Suporte a React no Vite

## 📋 Pré-requisitos

- **Node.js 18+** ou superior
- **npm 9+** ou **yarn 1.22+**
- Backend API rodando em `http://localhost:8080`

## 📦 Instalação

```bash
# Clone o repositório
cd app

# Instale as dependências
npm install

# Ou com yarn
yarn install
```

## 🚀 Execução

### Modo Desenvolvimento

```bash
npm run dev
# Ou
yarn dev
```

Acesse: **http://localhost:5173**

### Preview da Build de Produção

```bash
npm run preview
# Ou
yarn preview
```

### Lint

```bash
npm run lint
# Ou
yarn lint
```

## 📂 Estrutura do Projeto

```
app/
├── public/                    # Arquivos estáticos
├── src/
│   ├── assets/               # Imagens, fontes, etc
│   │
│   ├── components/           # Componentes reutilizáveis
│   │   ├── alert/           # Alertas e notificações
│   │   ├── form/            # Componentes de formulário
│   │   ├── header/          # Cabeçalho/Navbar
│   │   ├── modal/           # Modais
│   │   ├── pickers/         # Date/Time pickers
│   │   ├── room/            # Componentes de sala
│   │   ├── routing/         # Rotas protegidas
│   │   ├── table/           # Tabelas de dados
│   │   └── websocket/       # Componentes WebSocket
│   │
│   ├── hooks/                # Custom Hooks
│   │   ├── useAuth.ts       # Hook de autenticação
│   │   └── useModal.ts      # Hook para modais
│   │
│   ├── layouts/              # Layouts da aplicação
│   │   ├── AdminLayout.tsx  # Layout administrativo
│   │   ├── UserLayout.tsx   # Layout de usuário
│   │   └── BasicLayout.tsx  # Layout básico (público)
│   │
│   ├── pages/                # Páginas da aplicação
│   │   ├── Home.tsx         # Página inicial
│   │   ├── dashboard/       # Dashboard admin
│   │   ├── reservation/     # Páginas de reserva
│   │   ├── room/            # Páginas de salas
│   │   └── user/            # Páginas de usuário
│   │
│   ├── service/              # Camada de serviços
│   │   ├── apiClient.ts     # Cliente Axios configurado
│   │   ├── index.ts         # Exportações
│   │   ├── reservation/     # Serviços de reserva
│   │   ├── room/            # Serviços de sala
│   │   ├── user/            # Serviços de usuário
│   │   └── websocket/       # Configuração WebSocket
│   │
│   ├── store/                # Redux Store
│   │   ├── index.ts         # Configuração da store
│   │   ├── hooks.ts         # Typed hooks
│   │   └── slices/          # Redux slices
│   │       ├── authSlice.ts # Estado de autenticação
│   │       └── modalSlice.ts# Estado de modais
│   │
│   ├── App.tsx               # Componente raiz
│   ├── main.tsx              # Entry point
│   ├── App.css               # Estilos globais do app
│   └── index.css             # Estilos globais
│
├── index.html                # HTML template
├── package.json              # Dependências e scripts
├── tsconfig.json             # Configuração TypeScript
├── vite.config.ts            # Configuração Vite
└── eslint.config.js          # Configuração ESLint
```

## ✨ Features

### Autenticação

- Login com email/senha
- Registro de novos usuários
- Recuperação de senha
- Persistência de sessão (Redux Persist)
- Auto-logout em token expirado

### Dashboard

- **Admin**: Estatísticas gerais (usuários, salas, reservas)
- **User**: Reservas do usuário logado

### Salas

- Listagem com filtros
- Visualização de detalhes
- **Admin**: CRUD completo

### Reservas

- Calendário interativo
- Formulário com validação
- Seleção de sala e horário
- Verificação de conflitos
- **Admin**: Gerenciar todas as reservas
- **User**: Gerenciar apenas próprias reservas

### Tempo Real

- Atualizações automáticas via WebSocket
- Notificações de novas reservas
- Sincronização de disponibilidade

## 🗃️ Gerenciamento de Estado

### Redux Store

A aplicação utiliza **Redux Toolkit** para gerenciamento de estado global:

#### Auth Slice

```typescript
interface AuthState {
  token: string | null
  isAuthenticated: boolean
  role: "ADMIN" | "USER" | null
}
```

**Actions**:

- `login(token, role)`: Autentica usuário
- `logout()`: Remove autenticação

#### Modal Slice

```typescript
interface ModalState {
  isOpen: boolean
  // ... outros estados de modal
}
```

### Redux Persist

O estado é persistido no `localStorage`:

```typescript
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Apenas auth é persistido
}
```

### Custom Hooks

#### useAuth

```typescript
const { isAuthenticated, role, login, logout } = useAuth()
```

#### useModal

```typescript
const { isOpen, open, close } = useModal()
```

## 🌐 Comunicação com API

### API Client (Axios)

Configuração centralizada em `service/apiClient.ts`:

```typescript
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
})
```

#### Interceptors

**Request Interceptor**:

- Adiciona token JWT automaticamente
- Remove headers desnecessários

**Response Interceptor**:

- Trata erro 401 (logout automático)
- Publica eventos WebSocket em operações bem-sucedidas

### Services

Cada módulo tem seu serviço:

#### User Service

```typescript
export const userService = {
  login: (data) => apiClient.post("/auth/login", data),
  register: (data) => apiClient.post("/auth/register", data),
  getProfile: () => apiClient.get("/users/me"),
  // ...
}
```

#### Room Service

```typescript
export const roomService = {
  getAll: () => apiClient.get("/rooms"),
  getById: (id) => apiClient.get(`/rooms/${id}`),
  create: (data) => apiClient.post("/rooms", data),
  // ...
}
```

#### Reservation Service

```typescript
export const reservationService = {
  getAll: () => apiClient.get("/reservations"),
  getByUser: () => apiClient.get("/reservations/user"),
  create: (data) => apiClient.post("/reservations", data),
  // ...
}
```

## 🔌 WebSocket

### Configuração

Cliente STOMP configurado em `service/websocket/websocket.ts`:

```typescript
const client = new Client({
  brokerURL: "ws://localhost:8080/ws",
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
})
```

### Subscrições

```typescript
client.subscribe("/topic/reservations", (message) => {
  // Atualiza UI com novos dados
})

client.subscribe("/topic/rooms", (message) => {
  // Atualiza lista de salas
})

client.subscribe("/topic/dashboard", (message) => {
  // Atualiza estatísticas
})
```

### Publicação

Após operações de CRUD:

```typescript
publishUpdateMessage() // Notifica outros clientes
```

### Componente WebSocket

`components/websocket/WebSocketProvider.tsx` gerencia:

- Conexão/desconexão automática
- Subscrições baseadas em rota
- Reconexão automática

## 🛣️ Rotas

### Públicas

```
/                         # Home (público)
/user/login              # Login
/user/register           # Registro
/password-reset/request  # Solicitar reset
/password-reset/reset    # Reset com token
```

### Protegidas (USER)

```
/user/dashboard          # Dashboard do usuário
/user/reservations       # Minhas reservas
/user/profile            # Perfil
```

### Protegidas (ADMIN)

```
/admin/dashboard         # Dashboard admin
/admin/rooms             # Gerenciar salas
/admin/reservations      # Gerenciar reservas
/admin/users             # Gerenciar usuários
```

### Componente de Rota Protegida

```typescript
<ProtectedRoute requiredRole="ADMIN">
  <AdminDashboard />
</ProtectedRoute>
```

## 🧩 Componentes

### Principais

#### Header

- Navegação responsiva
- Menu diferenciado por role
- Logout

#### Alert

- Notificações toast
- Tipos: success, error, warning, info

#### Modal

- Modais reutilizáveis
- Confirmação de ações
- Formulários

#### Table

- Tabela com ordenação
- Paginação
- Ações (editar, deletar)

#### Form Components

- Input com validação
- Select customizado
- DateTimePicker

### Layouts

#### BasicLayout

- Layout simples (home, login)
- Sem autenticação necessária

#### UserLayout

- Header com menu de usuário
- Sidebar opcional

#### AdminLayout

- Header administrativo
- Sidebar com navegação

## 🏗️ Build

### Desenvolvimento

```bash
npm run dev
```

- Hot Module Replacement (HMR)
- Source maps
- Fast Refresh

### Produção

```bash
npm run build
```

Output: `dist/`

**Otimizações**:

- Minificação de JS/CSS
- Tree shaking
- Code splitting
- Asset optimization

### Preview de Produção

```bash
npm run preview
```

Testa a build antes do deploy.

## 🎨 Temas e Estilos

### Bootstrap

Componentes estilizados com React Bootstrap:

```tsx
import { Button, Form, Card } from "react-bootstrap"
```

### CSS Modules

Estilos com escopo local:

```tsx
import styles from "./Component.module.css"

;<div className={styles.container}>...</div>
```

### CSS Global

- `index.css`: Reset e variáveis CSS
- `App.css`: Estilos globais do app

## 🔧 Configuração

### Vite Config

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
})
```

### TypeScript Config

- **tsconfig.json**: Configuração base
- **tsconfig.app.json**: Configuração da aplicação
- **tsconfig.node.json**: Configuração para Vite

### ESLint

```javascript
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.recommended,
  reactRefresh.configs.recommended,
]
```

## 🧪 Testes

```bash
# TODO: Implementar testes
npm run test
```

**Recomendado**:

- **Vitest**: Testes unitários
- **Testing Library**: Testes de componentes
- **MSW**: Mock de API

## 📱 Responsividade

A aplicação é totalmente responsiva:

- **Desktop**: Layout completo
- **Tablet**: Menu adaptado
- **Mobile**: Navegação hamburger

## 🔐 Segurança

### Headers de Segurança

```typescript
// CSP, CORS, etc são configurados no backend
```

### Sanitização

- Inputs são validados com React Hook Form
- Dados sanitizados antes de enviar

### Tokens

- JWT armazenado em Redux Persist (localStorage)
- Expiração automática (401 → logout)

## 🚀 Deploy

### Build

```bash
npm run build
```

### Servir Arquivos Estáticos

**Nginx**:

```nginx
server {
  listen 80;
  root /var/www/agora-app/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

**Vercel/Netlify**:

- Configure `npm run build` como build command
- Output directory: `dist`

### Variáveis de Ambiente

Crie `.env.production`:

```env
VITE_API_URL=https://api.seudominio.com
VITE_WS_URL=wss://api.seudominio.com/ws
```

Use em código:

```typescript
const API_URL = import.meta.env.VITE_API_URL
```

## 🐛 Troubleshooting

### WebSocket não conecta

- Verifique se backend está rodando
- Confirme URL: `ws://localhost:8080/ws`
- Verifique CORS no backend

### Token expirado

- Faça login novamente
- Verifique validade do token no backend

### Build falha

```bash
# Limpe cache e reinstale
rm -rf node_modules dist
npm install
npm run build
```

## 📝 Boas Práticas

### Componentes

- Componentes pequenos e focados
- Props tipadas com TypeScript
- Evite prop drilling (use Context/Redux)

### Estado

- Use Redux apenas para estado global
- Estado local para UI simples (useState)
- Custom hooks para lógica complexa

### Performance

- Lazy loading de rotas
- Memoização com `useMemo`/`useCallback`
- Code splitting automático (Vite)

### TypeScript

- Sempre tipar props e estados
- Evitar `any`
- Usar interfaces para objetos complexos

## 🚀 Roadmap

- [ ] Testes unitários e de integração
- [ ] Storybook para componentes
- [ ] PWA (Service Workers)
- [ ] Modo escuro
- [ ] Internacionalização (i18n)
- [ ] Acessibilidade (ARIA)
- [ ] Analytics (Google Analytics)

## 📄 Licença

Este projeto está sob a licença especificada no arquivo LICENSE.

---

**Versão**: 0.0.1  
**Autora**: Stefany Campanhoni
