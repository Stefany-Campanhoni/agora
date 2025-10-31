#include <QGuiApplication>
#include <QQmlApplicationEngine>
#include <QQmlContext>
#include "FormHandler.h"

int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);

    QQmlApplicationEngine engine;

    // Registra o FormHandler para uso no QML
    FormHandler formHandler;
    engine.rootContext()->setContextProperty("formHandler", &formHandler);

    QObject::connect(
        &engine,
        &QQmlApplicationEngine::objectCreationFailed,
        &app,
        []()
        { QCoreApplication::exit(-1); },
        Qt::QueuedConnection);
    engine.loadFromModule("desktop", "Main");

    return app.exec();
}
