#include "FormHandler.h"
#include <QRegularExpression>
#include <QJsonDocument>
#include <QJsonObject>

FormHandler::FormHandler(QObject *parent)
    : QObject(parent),
      m_isLoading(false),
      m_apiUrl("http://localhost:8080") // URL padrão, pode ser alterada
{
  m_networkManager = new QNetworkAccessManager(this);
}

void FormHandler::setIsLoading(bool loading)
{
  if (m_isLoading != loading)
  {
    m_isLoading = loading;
    emit isLoadingChanged();
  }
}

void FormHandler::setApiUrl(const QString &url)
{
  if (m_apiUrl != url)
  {
    m_apiUrl = url;
    emit apiUrlChanged();
  }
}

void FormHandler::sendPostRequest(const QString &endpoint, const QJsonObject &data)
{
  QUrl url(m_apiUrl + endpoint);
  QNetworkRequest request(url);
  request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");

  QJsonDocument doc(data);
  QByteArray jsonData = doc.toJson();

  qDebug() << "Enviando requisição para:" << url.toString();
  qDebug() << "Dados:" << jsonData;

  QNetworkReply *reply = m_networkManager->post(request, jsonData);
  connect(reply, &QNetworkReply::finished, this, &FormHandler::onRegisterFinished);
}

void FormHandler::onRegisterFinished()
{
  QNetworkReply *reply = qobject_cast<QNetworkReply *>(sender());
  if (!reply)
    return;

  setIsLoading(false);

  if (reply->error() == QNetworkReply::NoError)
  {
    QByteArray response = reply->readAll();
    QJsonDocument jsonDoc = QJsonDocument::fromJson(response);
    QJsonObject jsonObj = jsonDoc.object();

    qDebug() << "Resposta da API:" << response;

    emit registrationSuccess("Registro realizado com sucesso!");
  }
  else
  {
    QString errorString = reply->errorString();
    qDebug() << "Erro na requisição:" << errorString;

    QByteArray response = reply->readAll();
    if (!response.isEmpty())
    {
      QJsonDocument jsonDoc = QJsonDocument::fromJson(response);
      QJsonObject jsonObj = jsonDoc.object();

      if (jsonObj.contains("error"))
      {
        errorString = jsonObj["error"].toString();
      }
      else if (jsonObj.contains("message"))
      {
        errorString = jsonObj["message"].toString();
      }
    }

    emit registrationError("Erro ao registrar: " + errorString);
  }

  reply->deleteLater();
}

bool FormHandler::validateEmail(const QString &email)
{
  QRegularExpression emailRegex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
  return emailRegex.match(email).hasMatch();
}

bool FormHandler::validatePassword(const QString &password)
{
  return password.length() >= 6;
}

void FormHandler::registerAdmin(const QString &email, const QString &password, const QString &secret)
{
  bool hasError = false;

  // Validação do email
  if (email.isEmpty())
  {
    emit emailError("O email não pode estar vazio!");
    hasError = true;
  }
  else if (!validateEmail(email))
  {
    emit emailError("Por favor, insira um email válido!");
    hasError = true;
  }

  // Validação da senha
  if (password.isEmpty())
  {
    emit passwordError("A senha não pode estar vazia!");
    hasError = true;
  }
  else if (!validatePassword(password))
  {
    emit passwordError("A senha deve ter no mínimo 6 caracteres!");
    hasError = true;
  }

  // Validação da secret
  if (secret.isEmpty())
  {
    emit secretError("A secret não pode estar vazia!");
    hasError = true;
  }

  // Se houver algum erro de validação, não continua
  if (hasError)
  {
    return;
  }

  setIsLoading(true);

  qDebug() << "Registrando admin...";
  qDebug() << "Email:" << email;

  QJsonObject jsonData;
  jsonData["email"] = email;
  jsonData["password"] = password;
  jsonData["secret"] = secret;

  sendPostRequest("/users/admin/register", jsonData);
}
