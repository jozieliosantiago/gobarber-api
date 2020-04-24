# GoBarber API

Essa aplicação trata-se de uma pequena API para o gerenciamento de agendamentos de uma barbearia fictícia chamada GoBarber. Essa aplicação faz parte do curso GoStack - Bootcamp da [Rocketseat](https://rocketseat.com.br/).

# Instalação

Indica-se o uso de containers para o gerenciamento dos bancos de dados utilizados pela API. Para a execução dos próximos comandos é necessário que o docker tenha sido instalado previamente.

### Banco Postgres

```
docker run --name gobarber-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```
Usando linha de comando ou uma interface crie um banco no container criado. O nome do banco criado será usado posteriormente nas variáveis de ambiente.

### MongoDB

```
docker run --name gobarber-mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=username -e MONGO_INITDB_ROOT_PASSWORD=password -d mongo
```

### Redis
```
docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine
```

OBS: O mailtrap foi utilizado para realizar os testes de envio de e-mail, dessa forma, caso deseje utilizar outra ferramenta será necessário realizar as configurações indicadas pela ferramenta. Caso prefira permanecer com os testes no mailtrap basta criar uma conta em https://mailtrap.io/ e informar as credenciais de acesso no arquivo .env

## Variáveis de ambiente

Após clonar o projeto entre na pasta gobarber-api gerada. Renomei o arquivo .env.example para .env e informe os valores das variáveis de ambiente.

Para rodar localmente o projeto informe os seguintes valores:

```
APP_URL=localhost
APP_PORT=3333
```
As variáveis abaixo serão utilizadas para criptografar/descriptografar senhas e definir o tempo de validade do token gerado ao iniciar uma sessão. O valor de expiração pode estar em segundos ou em dias. **Ex:** EXPIRED_IN=2d.

```
SECRET=
EXPIRED_IN=
```

No banco postgres o valor do USERNAME por padrão é postgres

```
DB_USERNAME=postgres
```

Crie uma conta no [Sentry](https://sentry.io/welcome/) para acompanhar os logs de erros da aplicação. Informe a url DSN do projeto criado no Sentry na variável SENTRY_DSN.

**Caso deseje desativar esse recurso as linhas de import do Sentry e sentryConfig, em app.js, devem ser comentadas.*

```
SENTRY_DSN=
```

### Apoś informar o valor das variáveis execute, dentro da pasta fastfeet-api, os seguintes comandos:

```
yarn
yarn sequelize db:migrate
yarn start
```

# API

## Users
Gerenciamento de usuários da aplicação

## POST / Criar usuário

### Path

```
localhost:3333/users
```

### Headers

```
Content-Type	application/json
```

### Body

```
{
	"name":"Nome do Usuário",
	"email":"usuario@email.com",
	"password": "123456",
	"provider": true
}

```

### Example Request
```
POST /users HTTP/1.1
Host: localhost:3333
Content-Type: application/json

{
	"name":"Nome do Usuário",
	"email":"usuario@email.com",
	"password": "123456",
	"provider": true
}
```

### Example Response

```
{
  "id": 4,
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "provider": true
}
```
<hr>

## PUT / Atualizar dados do usuário

### Path

```
localhost:3333/users
```

### Headers

```
Content-Type	application/json
Authorization	Bearer {{token}}
```

### Body

```
{
	"email":"usuario@email.com",
	"avatar_id": 2
}
```

### Example Request

```
PUT /users HTTP/1.1
Host: localhost:3333
Content-Type: application/json
Authorization: Bearer {{token}}

{
	"email":"usuario@email.com",
	"avatar_id": 2
}
```

### Example Response

```
{
  "id": 4,
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "avatar": {
    "url": "http://localhost:3333/files/3b3e62d9eb4ed51e8546607de20cdeaa2bda73c9.jpg",
    "id": 2,
    "path": "3b3e62d9eb4ed51e8546607de20cdeaa2bda73c9.jpg"
  }
}
```

<hr>

## Session

Criar sessões

## POST / Iniciar uma sessão

### Path

```
localhost:3333/sessions
```

### Headers

```
Content-Type	application/json
```

### Body

```
{
	"email":"usuario@email.com",
	"password": "123456"
}
```

### Example Request

```
POST /sessions HTTP/1.1
Host: localhost:3333
Content-Type: application/json

{
	"email":"usuario@email.com",
	"password": "123456"
}
```

### Example Response

```
{
  "user": {
    "id": 4,
    "name": "Nome do Usuário",
    "email": "usuario@email.com",
    "provider": true,
    "avatar": {
      "url": "http://localhost:3333/files/3b3e62d9eb4ed51e8546607de20cdeaa2bda73c9.jpg",
      "id": 2,
      "path": "3b3e62d9eb4ed51e8546607de20cdeaa2bda73c9.jpg"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTg3NjA3MDU4LCJleHAiOjE1ODc2OTM0NTh9.RbblC2Vuy_OEjIOB-MlriuN6FKiQNuuxxZ43-2XFbL4"
}
```

<hr>

## Providers

Obter lista dos provedores de serviço cadastrados

## GET / Obter lista

### Path

```
localhost:3333/providers
```

### Headers

```
Content-Type	application/json
Authorization	Bearer {{token}}
```

### Example Request

```
GET /providers HTTP/1.1
Host: localhost:3333
Content-Type: application/json
Authorization: Bearer {{token}}
```

### Example Response

```
[
  {
    "id": 1,
    "name": "Joziélio Santiago",
    "email": "jozieliosantiago@gmail.com",
    "avatar_id": 1,
    "avatar": {
      "url": "http://localhost:3333/files/fd06bd0ff7596646604c169d1e8383b01c6277e3.jpg",
      "name": "eu.jpg",
      "path": "fd06bd0ff7596646604c169d1e8383b01c6277e3.jpg"
    }
  },
  {
    "id": 4,
    "name": "Nome do Usuário",
    "email": "usuario@email.com",
    "avatar_id": 2,
    "avatar": {
      "url": "http://localhost:3333/files/3b3e62d9eb4ed51e8546607de20cdeaa2bda73c9.jpg",
      "name": "photo.jpg",
      "path": "3b3e62d9eb4ed51e8546607de20cdeaa2bda73c9.jpg"
    }
  },
  {
    "id": 3,
    "name": "Fulano",
    "email": "exemplo@email.com",
    "avatar_id": null,
    "avatar": null
  }
]
```

<hr>

## Files

Enviar arquivos de imagem

## POST / Enviar avatar do usuário

### Path

```
localhost:3333/files
```

### Headers

```
Content-Type	multipart/form-data
Authorization	Bearer {{token}}
```

### Body

```
file
```

### Example Request

```
POST /files HTTP/1.1
Host: localhost:3333
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Authorization: Bearer {{token}}

----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="photo.jpg"
Content-Type: image/jpeg

(data)
----WebKitFormBoundary7MA4YWxkTrZu0gW
```

### Example Response

```
{
  "url": "http://localhost:3333/files/3b3e62d9eb4ed51e8546607de20cdeaa2bda73c9.jpg",
  "id": 2,
  "name": "photo.jpg",
  "path": "3b3e62d9eb4ed51e8546607de20cdeaa2bda73c9.jpg",
  "updatedAt": "2020-04-23T01:48:37.454Z",
  "createdAt": "2020-04-23T01:48:37.454Z"
}
```

<hr>

## Appointments

Agendamento/Cancelamento de horário

## POST / Agendar horário

### Path

```
localhost:3333/appointments
```

### Headers

```
Content-Type	application/json
Authorization	Bearer {{token}}
```

### Body

```
{
	"provider_id": 3,
	"date": "2020-04-30T09:00:00-03:00"
}
```

### Example Request

```
POST /appointments HTTP/1.1
Host: localhost:3333
Content-Type: application/json
Authorization: Bearer {{token}}

{
	"provider_id": 3,
	"date": "2020-04-30T09:00:00-03:00"
}
```

### Example Response

```
{
  "past": false,
  "cancelable": true,
  "id": 2,
  "user_id": 4,
  "provider_id": 3,
  "date": "2020-04-30T12:00:00.000Z",
  "updatedAt": "2020-04-23T02:03:17.841Z",
  "createdAt": "2020-04-23T02:03:17.841Z",
  "canceled_at": null
}

```

<hr>

## DELETE / Cancelar horário agendado

**Variáveis obrigatórias**

- *appointment_id*

### Path

```
localhost:3333/appointments/:appointment_id
```

### Headers

```
Content-Type	application/json
Authorization	Bearer {{token}}
```

### Path Variables

```
appointment_id	2
```

### Example Request

```
DELETE /appointments/2 HTTP/1.1
Host: localhost:3333
Content-Type: application/json
Authorization: Bearer {{token}}
```

### Example Response

```
{
  "past": false,
  "cancelable": true,
  "id": 2,
  "date": "2020-04-30T12:00:00.000Z",
  "canceled_at": "2020-04-23T02:06:56.776Z",
  "createdAt": "2020-04-23T02:03:17.841Z",
  "updatedAt": "2020-04-23T02:06:56.776Z",
  "user_id": 4,
  "provider_id": 3,
  "provider": {
    "name": "Fulano",
    "email": "exemplo@email.com"
  },
  "user": {
    "name": "Nome do Usuário"
  }
}
```

<hr>

## GET / Obter lista de horários agendados

**Parâmetros opcionais**

- *page* (default: 1)

### Path

```
localhost:3333/appointments?page=1
```

### Headers

```
Content-Type	application/json
Authorization	Bearer {{token}}
```

### Params

```
page	1
```

### Example Request

```
GET /appointments?page=1 HTTP/1.1
Host: localhost:3333
Content-Type: application/json
Authorization: Bearer {{token}}
```

### Example Response

```
[
  {
    "past": false,
    "cancelable": true,
    "id": 6,
    "date": "2020-04-24T12:00:00.000Z",
    "provider": {
      "id": 3,
      "name": "Fulano",
      "avatar": null
    }
  },
  {
    "past": false,
    "cancelable": true,
    "id": 5,
    "date": "2020-04-30T13:00:00.000Z",
    "provider": {
      "id": 1,
      "name": "Joziélio Santiago",
      "avatar": {
        "url": "http://localhost:3333/files/fd06bd0ff7596646604c169d1e8383b01c6277e3.jpg",
        "id": 1,
        "path": "fd06bd0ff7596646604c169d1e8383b01c6277e3.jpg"
      }
    }
  }
]
```

<hr>

## Schedule

Obter lista de horários agendados do provedor

## GET / Obter lista por data

**Parâmetros obrigatórios**

- *date*

### Path

```
localhost:3333/schedule?date=2020-04-30T00:00:00-03:00
```

### Headers

```
Content-Type	application/json
Authorization	Bearer {{token}}
```

### Params

```
date	2020-04-30T00:00:00-03:00
```

### Example Request

```
GET /schedule?date=2020-04-30T00:00:00-03:00 HTTP/1.1
Host: localhost:3333
Content-Type: application/json
Authorization: Bearer {{token}}
```

### Example Response

```
[
  {
    "past": false,
    "cancelable": true,
    "id": 4,
    "date": "2020-04-30T13:00:00.000Z",
    "canceled_at": null,
    "createdAt": "2020-04-23T02:10:16.027Z",
    "updatedAt": "2020-04-23T02:10:16.027Z",
    "user_id": 3,
    "provider_id": 4,
    "user": {
      "name": "Fulano"
    }
  }
]
```

<hr>

## Notifications

Obter lista de notificações. As notificações são criadas sempre que um agendamento é realizado.

## GET / Obter notificações

### Path

```
localhost:3333/notifications
```

### Headers

```
Content-Type	application/json
Authorization	Bearer {{token}}
```

### Example Request

```
GET /notifications HTTP/1.1
Host: localhost:3333
Content-Type: application/json
Authorization: Bearer {{token}}
```

### Example Response

```
[
  {
    "read": false,
    "_id": "5ea0f908d10a6916e1985ee0",
    "content": "Novo agendamento de Fulano para dia 30 de abril, às 10:00h",
    "user": 4,
    "createdAt": "2020-04-23T02:10:16.036Z",
    "updatedAt": "2020-04-23T02:10:16.036Z",
    "__v": 0
  },
  {
    "read": false,
    "_id": "5ea0f8ded10a6916e1985edf",
    "content": "Novo agendamento de Joziélio Santiago para dia 30 de abril, às 9:00h",
    "user": 4,
    "createdAt": "2020-04-23T02:09:34.643Z",
    "updatedAt": "2020-04-23T02:09:34.643Z",
    "__v": 0
  }
]
```

<hr>

## PUT / Marcar notificação como lida

**Variáveis obrigatórias**
- *notification_id*

### Path

```
localhost:3333/notifications/:notification_id
```

### Headers

```
Content-Type	application/json
Authorization	Bearer {{token}}
```

### Path Variables

```
notification_id	5ea21efab813563eac5e6e7f
```

### Example Request

```
PUT /notifications/5ea21efab813563eac5e6e7f HTTP/1.1
Host: localhost:3333
Content-Type: application/json
Authorization: Bearer {{token}}
```

### Example Response

```
{
  "read": true,
  "_id": "5ea21efab813563eac5e6e7f",
  "content": "Novo agendamento de Nome do Usuário para dia 24 de abril, às 9:00h",
  "user": 3,
  "createdAt": "2020-04-23T23:04:26.903Z",
  "updatedAt": "2020-04-23T23:25:52.811Z",
  "__v": 0
}
```

<hr>

## Available

Obter lista de horários disponíveis para agendamento

## GET / Obter lista de horários.

**Parâmetros obrigatórios**

- *date*

### Path

```
localhost:3333/providers/3/available?date=1587684718798
```

### Headers

```
Content-Type	application/json
Authorization	Bearer {{token}}
```

### Params

```
date	1587684718798
```

### Example Request

```
GET /providers/3/available?date=1587684718798 HTTP/1.1
Host: localhost:3333
Content-Type: application/json
Authorization: Bearer {{token}}
```

### Example Response

```
[
  {
    "time": "08:00",
    "value": "2020-03-05T08:00:00-03:00",
    "available": false
  },
  {
    "time": "09:00",
    "value": "2020-03-05T09:00:00-03:00",
    "available": false
  },
  {
    "time": "11:00",
    "value": "2020-03-05T11:00:00-03:00",
    "available": false
  },
  {
    "time": "12:00",
    "value": "2020-03-05T12:00:00-03:00",
    "available": false
  }
]
```

<hr>

### Documentação Postman nesse [link](https://documenter.getpostman.com/view/2922382/SzfAxR68)

## Licença
[MIT](https://choosealicense.com/licenses/mit/)
