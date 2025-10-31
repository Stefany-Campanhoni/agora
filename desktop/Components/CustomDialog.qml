import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import QtQuick.Effects

Dialog {
    id: dialog
    
    property string message: ""
    property bool isSuccess: true
    
    modal: true
    anchors.centerIn: parent
    closePolicy: Popup.CloseOnEscape | Popup.CloseOnPressOutside
    
    width: 340
    padding: 0
    
    background: Rectangle {
        color: "#ffffff"
        radius: 20
        
        layer.enabled: true
    }
    
    contentItem: ColumnLayout {
        spacing: 20
        
        Item {
            Layout.fillWidth: true
            Layout.preferredHeight: 100
            Layout.topMargin: 30
            
            Rectangle {
                id: outerCircle
                anchors.centerIn: parent
                width: 80
                height: 80
                radius: 40
                color: dialog.isSuccess ? "#E8F5E9" : "#FFEBEE"
                
                Rectangle {
                    anchors.centerIn: parent
                    width: 56
                    height: 56
                    radius: 28
                    color: dialog.isSuccess ? "#4CAF50" : "#FF3951"
                    
                    Text {
                        anchors.centerIn: parent
                        text: dialog.isSuccess ? "✓" : "✕"
                        font.pixelSize: 36
                        font.bold: true
                        color: "#ffffff"
                    }
                }
            }
        }
        
        Label {
            Layout.fillWidth: true
            Layout.leftMargin: 30
            Layout.rightMargin: 30
            
            text: dialog.isSuccess ? "Sucesso!" : "Erro!"
            horizontalAlignment: Text.AlignHCenter
            color: "#1a1a1a"
            font {
                pointSize: 18
                weight: Font.Bold
            }
        }
        
        Label {
            Layout.fillWidth: true
            Layout.leftMargin: 30
            Layout.rightMargin: 30
            
            text: dialog.message
            horizontalAlignment: Text.AlignHCenter
            wrapMode: Text.WordWrap
            color: "#666666"
            font.pointSize: 11
        }
        
        Item {
            Layout.preferredHeight: 20
        }
        
        Button {
            Layout.fillWidth: true
            Layout.leftMargin: 30
            Layout.rightMargin: 30
            Layout.bottomMargin: 30
            
            text: "OK"
            
            contentItem: Text {
                text: parent.text
                font {
                    pointSize: 11
                    weight: Font.DemiBold
                }
                color: "#fff"
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }
            
            background: Rectangle {
                implicitHeight: 44
                color: parent.pressed ? Qt.darker(dialog.isSuccess ? "#4CAF50" : "#FF3951", 1.1) : (dialog.isSuccess ? "#4CAF50" : "#FF3951")
                radius: 10
                
                Behavior on color {
                    ColorAnimation { duration: 150 }
                }
            }
            
            onClicked: dialog.close()
        }
    }
    
    enter: Transition {
        NumberAnimation {
            property: "scale"
            from: 0.8
            to: 1.0
            duration: 200
            easing.type: Easing.OutBack
        }
        NumberAnimation {
            property: "opacity"
            from: 0
            to: 1
            duration: 200
        }
    }
    
    exit: Transition {
        NumberAnimation {
            property: "scale"
            from: 1.0
            to: 0.8
            duration: 150
        }
        NumberAnimation {
            property: "opacity"
            from: 1
            to: 0
            duration: 150
        }
    }
}

