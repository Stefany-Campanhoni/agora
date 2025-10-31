import QtQuick
import QtQuick.Controls.Basic
import QtQuick.Layouts

Item {
    id: root
    
    property alias text: textField.text
    property alias placeholderText: textField.placeholderText
    property alias echoMode: textField.echoMode
    property string imageSource: ""
    property string errorMessage: ""
    property bool hasError: errorMessage !== ""
    
    implicitHeight: textField.height + (errorLabel.visible ? errorLabel.height + 4 : 0)
    
    Layout.fillWidth: true
    
    TextField {
        id: textField
        
        anchors {
            left: parent.left
            right: parent.right
            top: parent.top
        }
        
        implicitHeight: 48
        
        color: "#1e1e1e"
        font.pointSize: 11
        
        leftPadding: 16
        rightPadding: 48
        placeholderTextColor: "#999"
        
        onTextChanged: {
            // Limpa o erro quando o usuário começa a digitar
            root.errorMessage = ""
        }
        
        background: Rectangle {
            anchors.fill: parent
            color: textField.activeFocus ? "#ffffff" : "#f5f5f5"
            radius: 12
            border.width: textField.activeFocus ? 2 : 1
            border.color: root.hasError ? "#FF3951" : (textField.activeFocus ? "#FF3951" : "#e0e0e0")
            
            Behavior on color {
                ColorAnimation { duration: 200 }
            }
            
            Behavior on border.color {
                ColorAnimation { duration: 200 }
            }
        }
        
        Image {
            anchors {
                right: parent.right
                rightMargin: 16
                verticalCenter: parent.verticalCenter
            }
            width: 20
            height: 20
            source: root.imageSource
            fillMode: Image.PreserveAspectFit
            opacity: 0.6
        }
    }
    
    Label {
        id: errorLabel
        
        anchors {
            left: parent.left
            right: parent.right
            top: textField.bottom
            topMargin: 4
            leftMargin: 4
        }
        
        text: root.errorMessage
        visible: root.hasError
        color: "#FF3951"
        font.pointSize: 8
        wrapMode: Text.WordWrap
        
        opacity: visible ? 1 : 0
        
        Behavior on opacity {
            NumberAnimation { duration: 200 }
        }
    }
}
