import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import QtQuick.Effects

import desktop

Window {
    id: root
    width: 480
    height: 680
    visible: true
    title: qsTr("Admin Creation")
    
    Component.onCompleted: {
        // Configura a URL da API (pode ser alterada conforme necessário)
        // formHandler.apiUrl = "http://localhost:3000"
        // formHandler.apiUrl = "https://sua-api.com"
    }
    
    // Gradient background
    Rectangle {
        anchors.fill: parent
        gradient: Gradient {
            GradientStop { position: 0.0; color: "#fafafa" }
            GradientStop { position: 1.0; color: "#f0f0f0" }
        }

        // Form container
        Rectangle {
            anchors {
                fill: parent
                margins: 30
                topMargin: 50
                bottomMargin: 50
            }
            
            color: "#ffffff"
            radius: 24
            
            layer.enabled: true

            ColumnLayout {
                anchors {
                    fill: parent
                    margins: 40
                }

                spacing: 0

                // Header
                Item {
                    Layout.fillWidth: true
                    Layout.preferredHeight: 80

                    ColumnLayout {
                        anchors.centerIn: parent
                        spacing: 8

                        Label {
                            text: qsTr("Bem-vindo!")
                            color: "#1a1a1a"
                            font {
                                pointSize: 24
                                weight: Font.Bold
                            }
                            Layout.alignment: Qt.AlignHCenter
                        }

                        Label {
                            text: qsTr("Registre seu usuário admin")
                            color: "#666666"
                            font {
                                pointSize: 11
                                weight: Font.Normal
                            }
                            Layout.alignment: Qt.AlignHCenter
                        }
                    }
                }

                Item { Layout.preferredHeight: 30 }

                // Email field
                Label {
                    text: qsTr("Email")
                    color: "#333333"
                    font {
                        pointSize: 10
                        weight: Font.Medium
                    }
                }

                Item { Layout.preferredHeight: 8 }

                CustomInput {
                    id: emailInput
                    Layout.fillWidth: true
                    placeholderText: qsTr("Digite seu email")
                    imageSource: "qrc:/Images/mail.png"
                }

                Item { Layout.preferredHeight: 24 }

                // Password field
                Label {
                    text: qsTr("Senha")
                    color: "#333333"
                    font {
                        pointSize: 10
                        weight: Font.Medium
                    }
                }

                Item { Layout.preferredHeight: 8 }

                CustomInput {
                    id: passwordInput
                    Layout.fillWidth: true
                    placeholderText: qsTr("Digite sua senha")
                    echoMode: TextInput.Password
                    imageSource: "qrc:/Images/trancar.png"
                }

                Item { Layout.preferredHeight: 24 }

                // Secret field
                Label {
                    text: qsTr("Secret")
                    color: "#333333"
                    font {
                        pointSize: 10
                        weight: Font.Medium
                    }
                }

                Item { Layout.preferredHeight: 8 }

                CustomInput {
                    id: secretInput
                    Layout.fillWidth: true
                    placeholderText: qsTr("Digite a secret")
                    echoMode: TextInput.Password
                    imageSource: "qrc:/Images/senhas.png"
                }

                Item { Layout.fillHeight: true }

                // Register button
                CustomButton {
                    Layout.fillWidth: true
                    text: formHandler.isLoading ? qsTr("Registrando...") : qsTr("Registrar")
                    enabled: !formHandler.isLoading
                    
                    onClicked: {
                        formHandler.registerAdmin(
                            emailInput.text,
                            passwordInput.text,
                            secretInput.text
                        );
                    }
                }
            }
        }
    }
    
    // Success Dialog
    CustomDialog {
        id: successDialog
        isSuccess: true
        
        onClosed: {
            // Clear fields on success
            emailInput.text = "";
            passwordInput.text = "";
            secretInput.text = "";
        }
    }
    
    // Error Dialog
    CustomDialog {
        id: errorDialog
        isSuccess: false
    }

    // Connections to handle C++ signals
    Connections {
        target: formHandler
        
        function onRegistrationSuccess(message) {
            successDialog.message = message;
            successDialog.open();
        }
        
        function onRegistrationError(error) {
            // Erros de API aparecem no dialog
            errorDialog.message = error;
            errorDialog.open();
        }
        
        function onEmailError(error) {
            // Erros de validação aparecem no campo
            emailInput.errorMessage = error;
        }
        
        function onPasswordError(error) {
            // Erros de validação aparecem no campo
            passwordInput.errorMessage = error;
        }
        
        function onSecretError(error) {
            // Erros de validação aparecem no campo
            secretInput.errorMessage = error;
        }
    }
}

