# Agora Desktop - Admin Setup

Aplicação desktop multiplataforma para criação do usuário administrador inicial, desenvolvida com Qt 6.9.3 e QML.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Compilação](#compilação)
- [Execução](#execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Integração com API](#integração-com-api)
- [Componentes QML](#componentes-qml)
- [Build e Deploy](#build-e-deploy)

## 🎯 Visão Geral

O Agora Desktop é uma aplicação nativa que facilita o setup inicial do sistema, permitindo:

- Criação do primeiro usuário administrador
- Validação de campos em tempo real
- Comunicação direta com a API backend
- Interface moderna e intuitiva
- Suporte multiplataforma (Windows, Linux, macOS)

Esta aplicação resolve o problema de "como criar o primeiro admin" sem necessidade de acesso direto ao banco de dados ou uso de ferramentas de linha de comando.

## 🏗️ Arquitetura

O projeto segue o padrão **Model-View-ViewModel (MVVM)** do Qt:

```
QML (View) ↔ FormHandler (ViewModel) ↔ QNetworkAccessManager (Model)
                                              ↓
                                          Backend API
```

### Componentes Principais

- **Main.qml**: Interface visual (View)
- **FormHandler.cpp/h**: Lógica de negócio e comunicação (ViewModel)
- **CustomInput.qml**: Componente de input reutilizável
- **CustomButton.qml**: Botão customizado
- **CustomDialog.qml**: Diálogos de sucesso/erro
- **QNetworkAccessManager**: Gerenciamento de requisições HTTP

## 🛠️ Tecnologias

### Framework

- **Qt 6.9.3**: Framework C++ multiplataforma
- **QML**: Linguagem declarativa para UI
- **QtQuick 6.8**: Módulo de UI moderna
- **QtNetwork**: Requisições HTTP

### Build System

- **CMake 3.16+**: Sistema de build moderno
- **Qt Creator** (opcional): IDE recomendada

### Linguagens

- **C++**: Lógica de backend (FormHandler)
- **QML**: Interface gráfica declarativa
- **JavaScript**: Lógica UI no QML

### Recursos

- **Qt Resource System**: Gerenciamento de imagens/assets
- **Qt Property System**: Bindings reativos

## 📋 Pré-requisitos

### Windows

- **Qt 6.9.3** (MSVC 2022 ou MinGW)
- **CMake 3.16+**
- **Visual Studio 2022** ou **MinGW**
- **Git** (para clonar o repositório)

### Linux

- **Qt 6.9.3**
- **CMake 3.16+**
- **GCC 11+** ou **Clang 14+**
- **OpenGL** (geralmente já instalado)

```bash
# Ubuntu/Debian
sudo apt install qt6-base-dev qt6-declarative-dev cmake build-essential

# Fedora
sudo dnf install qt6-qtbase-devel qt6-qtdeclarative-devel cmake gcc-c++
```

### macOS

- **Qt 6.9.3**
- **CMake 3.16+**
- **Xcode Command Line Tools**

```bash
# Homebrew
brew install qt cmake
```

## 📦 Instalação

### 1. Clone o Repositório

```bash
cd desktop
```

### 2. Instale o Qt

Baixe o **Qt Online Installer**:

- [qt.io/download](https://www.qt.io/download)

Durante a instalação, selecione:

- Qt 6.9.3
- Componentes:
  - Qt Quick
  - Qt Network
  - CMake
  - Ninja (opcional, mas recomendado)

### 3. Configure o Ambiente

**Windows (Qt Creator)**:

1. Abra o Qt Creator
2. File → Open File or Project
3. Selecione `CMakeLists.txt`
4. Configure o kit (MSVC 2022 64-bit ou MinGW)

**Linux/macOS**:

```bash
export Qt6_DIR=/caminho/para/Qt/6.9.3/gcc_64
# Ou adicione ao ~/.bashrc
```

## 🛠️ Compilação

### Método 1: Qt Creator (Recomendado)

1. Abra `CMakeLists.txt` no Qt Creator
2. Configure o kit apropriado
3. Build → Build All (Ctrl+B)
4. Run → Run (Ctrl+R)

### Método 2: Linha de Comando

**Windows (PowerShell)**:

```powershell
cd desktop
mkdir build
cd build

# Configure
cmake -G "Ninja" -DCMAKE_PREFIX_PATH="C:\Qt\6.9.3\msvc2022_64" ..

# Compile
cmake --build . --config Release

# Execute
.\Release\appdesktop.exe
```

**Linux/macOS**:

```bash
cd desktop
mkdir -p build
cd build

# Configure
cmake -DCMAKE_PREFIX_PATH=/caminho/para/Qt/6.9.3/gcc_64 ..

# Compile
cmake --build . -j$(nproc)

# Execute
./appdesktop
```

### Configurações de Build

#### Debug

```bash
cmake -DCMAKE_BUILD_TYPE=Debug ..
cmake --build .
```

#### Release

```bash
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build .
```

#### MinSizeRel (tamanho otimizado)

```bash
cmake -DCMAKE_BUILD_TYPE=MinSizeRel ..
cmake --build .
```

## 🚀 Execução

### Desenvolvimento

Execute diretamente pela IDE ou terminal:

```bash
# Windows
.\build\Release\appdesktop.exe

# Linux/macOS
./build/appdesktop
```

### Configuração da API URL

Por padrão, a aplicação conecta em `http://localhost:8080`.

Para alterar, edite `Main.qml`:

```qml
Component.onCompleted: {
    formHandler.apiUrl = "https://sua-api.com"
}
```

Ou modifique o construtor em `FormHandler.cpp`:

```cpp
FormHandler::FormHandler(QObject *parent)
    : QObject(parent),
      m_apiUrl("http://sua-api-url.com")
{
    // ...
}
```

## 📂 Estrutura do Projeto

```
desktop/
├── CMakeLists.txt              # Configuração CMake
├── main.cpp                    # Entry point da aplicação
├── Main.qml                    # Interface principal
├── FormHandler.h               # Header do handler C++
├── FormHandler.cpp             # Implementação do handler
├── Images.qrc                  # Arquivo de recursos Qt
│
├── Components/                 # Componentes QML reutilizáveis
│   ├── CustomButton.qml       # Botão customizado
│   ├── CustomDialog.qml       # Diálogos de mensagem
│   └── CustomInput.qml        # Campo de input com validação
│
├── Images/                     # Assets (ícones, imagens)
│   ├── mail.png               # Ícone de email
│   ├── trancar.png            # Ícone de senha
│   └── senhas.png             # Ícone de secret
│
├── build/                      # Diretório de build (gerado)
│   ├── Desktop_Qt_6_9_3_MSVC2022_64bit-Debug/
│   ├── Desktop_Qt_6_9_3_MSVC2022_64bit-Release/
│   └── ...
│
└── deploy/                     # Binários para distribuição
```

## ✨ Funcionalidades

### Registro de Admin

- **Formulário com 3 campos**:
  - Email (validação de formato)
  - Senha (mínimo 6 caracteres)
  - Secret (chave configurada no backend)

### Validações

#### Client-Side (C++)

- **Email**: Regex para formato válido
- **Senha**: Mínimo 6 caracteres
- **Secret**: Não pode estar vazio

```cpp
bool FormHandler::validateEmail(const QString &email) {
    QRegularExpression emailRegex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    return emailRegex.match(email).hasMatch();
}

bool FormHandler::validatePassword(const QString &password) {
    return password.length() >= 6;
}
```

#### Server-Side

- Backend valida credenciais e secret
- Retorna erros específicos

### Feedback Visual

- **Loading State**: Botão desabilitado durante requisição
- **Diálogos**:
  - Sucesso: Confirma registro
  - Erro: Exibe mensagem de erro
- **Validação Inline**: Erros aparecem abaixo dos campos

### Estados de UI

```qml
CustomButton {
    text: formHandler.isLoading ? "Registrando..." : "Registrar"
    enabled: !formHandler.isLoading
}
```

## 🌐 Integração com API

### Configuração HTTP

```cpp
QNetworkAccessManager *m_networkManager;

void FormHandler::sendPostRequest(const QString &endpoint, const QJsonObject &data) {
    QUrl url(m_apiUrl + endpoint);
    QNetworkRequest request(url);
    request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

    QJsonDocument doc(data);
    QByteArray jsonData = doc.toJson();

    QNetworkReply *reply = m_networkManager->post(request, jsonData);
    connect(reply, &QNetworkReply::finished, this, &FormHandler::onRegisterFinished);
}
```

### Endpoint

```http
POST /users/admin/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "senha123",
  "secret": "chave_secreta_backend"
}
```

### Tratamento de Resposta

```cpp
void FormHandler::onRegisterFinished() {
    QNetworkReply *reply = qobject_cast<QNetworkReply *>(sender());

    if (reply->error() == QNetworkReply::NoError) {
        emit registrationSuccess("Registro realizado com sucesso!");
    } else {
        QString errorString = parseErrorResponse(reply);
        emit registrationError("Erro ao registrar: " + errorString);
    }

    reply->deleteLater();
}
```

### Signals Emitidos

- `registrationSuccess(QString message)`
- `registrationError(QString error)`
- `emailError(QString error)`
- `passwordError(QString error)`
- `secretError(QString error)`
- `isLoadingChanged()`

## 🧩 Componentes QML

### CustomInput

Campo de entrada com:

- Placeholder text
- Ícone lateral
- Modo de senha (echoMode)
- Mensagem de erro inline
- Estilização moderna

```qml
CustomInput {
    id: emailInput
    placeholderText: "Digite seu email"
    imageSource: "qrc:/Images/mail.png"
}
```

**Propriedades**:

- `text: string` - Texto do input
- `placeholderText: string` - Texto de placeholder
- `imageSource: string` - Caminho do ícone
- `echoMode: TextInput.EchoMode` - Normal ou Password
- `errorMessage: string` - Mensagem de erro

### CustomButton

Botão estilizado com:

- Hover effect
- States (enabled/disabled)
- Gradiente de cor
- Sombra

```qml
CustomButton {
    text: "Registrar"
    enabled: !formHandler.isLoading
    onClicked: { /* ação */ }
}
```

### CustomDialog

Modal para sucesso/erro:

- Ícone (✓ ou ✗)
- Mensagem customizável
- Botão de fechar

```qml
CustomDialog {
    id: successDialog
    isSuccess: true
    message: "Operação concluída!"
}
```

## 🏗️ Build e Deploy

### Geração de Executável Standalone

#### Windows

```powershell
cd build\Release

# Execute o windeployqt
C:\Qt\6.9.3\msvc2022_64\bin\windeployqt.exe appdesktop.exe

# Cria pasta com DLLs necessárias
# Resultado: appdesktop.exe + DLLs Qt
```

**Instalador**:

- Use **Qt Installer Framework** ou **Inno Setup**

#### Linux

```bash
cd build

# Use linuxdeployqt
wget https://github.com/probonopd/linuxdeployqt/releases/download/continuous/linuxdeployqt-continuous-x86_64.AppImage
chmod +x linuxdeployqt-continuous-x86_64.AppImage

./linuxdeployqt-continuous-x86_64.AppImage appdesktop -appimage

# Gera AppImage standalone
```

#### macOS

```bash
cd build

# Use macdeployqt
/caminho/para/Qt/6.9.3/macos/bin/macdeployqt appdesktop.app -dmg

# Gera .dmg para distribuição
```

### Tamanho do Binário

- **Debug**: ~50-100 MB
- **Release**: ~20-40 MB
- **MinSizeRel**: ~15-30 MB
- **Com deploy**: +20-50 MB (bibliotecas Qt)

## 🎨 Estilização

### Cores

```qml
// Gradiente de fundo
gradient: Gradient {
    GradientStop { position: 0.0; color: "#fafafa" }
    GradientStop { position: 1.0; color: "#f0f0f0" }
}

// Card branco
color: "#ffffff"
radius: 24

// Texto primário
color: "#1a1a1a"

// Texto secundário
color: "#666666"
```

### Fontes

```qml
font {
    pointSize: 24
    weight: Font.Bold
}
```

### Layout

- **ColumnLayout**: Organização vertical
- **Spacing**: Espaçamento consistente
- **Margins**: Padding responsivo

## 🔧 Configuração Avançada

### CMake Options

```cmake
# Habilitar warnings
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra")

# Otimizações de Release
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -DNDEBUG")

# Strip symbols (reduz tamanho)
set(CMAKE_EXE_LINKER_FLAGS_RELEASE "-s")
```

### Qt Properties

Exponha mais propriedades C++ para QML:

```cpp
Q_PROPERTY(QString apiUrl READ apiUrl WRITE setApiUrl NOTIFY apiUrlChanged)
```

## 🐛 Troubleshooting

### Erro: Qt não encontrado

```bash
# Defina CMAKE_PREFIX_PATH
cmake -DCMAKE_PREFIX_PATH=/caminho/para/Qt/6.9.3/gcc_64 ..
```

### Erro: DLLs faltando (Windows)

```powershell
# Copie DLLs Qt para pasta do executável
windeployqt.exe appdesktop.exe
```

### Erro: Conexão recusada

- Verifique se backend está rodando
- Confirme URL em `FormHandler.cpp`
- Desabilite firewall temporariamente

### Build falha no Windows

```powershell
# Use Ninja em vez de MSBuild
cmake -G "Ninja" ..
```

## 📝 Boas Práticas

### C++ Side

- Use `Q_PROPERTY` para expor dados ao QML
- Sempre deletar `QNetworkReply` com `deleteLater()`
- Validar dados antes de enviar

### QML Side

- Separe lógica em componentes reutilizáveis
- Use `Connections` para signals C++
- Mantenha QML declarativo, lógica em C++

### Segurança

- Nunca hardcode secrets no código
- Use HTTPS em produção
- Valide sempre no backend também

## 🚀 Roadmap

- [ ] Suporte a temas (dark mode)
- [ ] Configuração de API URL via UI
- [ ] Logs de debug em arquivo
- [ ] Suporte a múltiplos idiomas (i18n)
- [ ] Auto-update do aplicativo
- [ ] Assinatura digital do executável

## 📄 Licença

Este projeto está sob a licença especificada no arquivo LICENSE.

---

**Versão**: 0.1  
**Qt Version**: 6.9.3  
**Autora**: Stefany Campanhoni
