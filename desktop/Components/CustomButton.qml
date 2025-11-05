import QtQuick
import QtQuick.Controls.Basic
import QtQuick.Controls.impl
import QtQuick.Templates as T
import QtQuick.Effects

Button {
    id: control

    implicitHeight: 52

    contentItem: IconLabel {
        spacing: control.spacing
        mirrored: control.mirrored
        display: control.display

        icon: control.icon
        text: control.text
        font {
            pointSize: 12
            weight: Font.DemiBold
        }
        color: "#fff"
    }

    background: Rectangle {
        implicitWidth: 100
        implicitHeight: 52
        visible: !control.flat || control.down || control.checked || control.highlighted
        color: control.enabled ? (control.pressed ? Qt.darker("#FF3951", 1.08) : "#FF3951") : "#cccccc"
        radius: 12
        
        layer.enabled: control.enabled && !control.pressed

        Behavior on color {
            ColorAnimation { duration: 200 }
        }
    }
    
    scale: control.pressed ? 0.98 : 1.0
    
    Behavior on scale {
        NumberAnimation { duration: 100 }
    }
}

