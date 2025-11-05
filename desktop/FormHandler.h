#ifndef FORMHANDLER_H
#define FORMHANDLER_H

#include <QObject>
#include <QString>
#include <QDebug>
#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QNetworkRequest>

class FormHandler : public QObject
{
  Q_OBJECT
  Q_PROPERTY(bool isLoading READ isLoading NOTIFY isLoadingChanged)
  Q_PROPERTY(QString apiUrl READ apiUrl WRITE setApiUrl NOTIFY apiUrlChanged)

public:
  explicit FormHandler(QObject *parent = nullptr);

  bool isLoading() const { return m_isLoading; }
  QString apiUrl() const { return m_apiUrl; }
  void setApiUrl(const QString &url);

  Q_INVOKABLE void registerAdmin(const QString &email, const QString &password, const QString &secret);
  Q_INVOKABLE bool validateEmail(const QString &email);
  Q_INVOKABLE bool validatePassword(const QString &password);

signals:
  void isLoadingChanged();
  void apiUrlChanged();
  void registrationSuccess(const QString &message);
  void registrationError(const QString &error);
  void emailError(const QString &error);
  void passwordError(const QString &error);
  void secretError(const QString &error);

private slots:
  void onRegisterFinished();

private:
  bool m_isLoading;
  QString m_apiUrl;
  QNetworkAccessManager *m_networkManager;

  void setIsLoading(bool loading);
  void sendPostRequest(const QString &endpoint, const QJsonObject &data);
};

#endif // FORMHANDLER_H
