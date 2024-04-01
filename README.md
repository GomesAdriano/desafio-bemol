# Desafio Bemol - E-commerce Bemol

Para rodar a aplicação, execute os seguintes comandos:

```
$ git clone git@github.com:GomesAdriano/desafio-bemol.git
$ cd desafio-bemol
$ cp .env.example .env
$ cp frontend/.env.example frontend/.env
$ cp backend/.env.example backend/.env
$ cd frontend && npm install --force && cd ..
$ cd backend && npm install && cd ..
$ docker compose up
```

## PhpMyAdmin

```
URL: http://localhost:8010
Server: db (serviço do docker compose)
Username: root
Senha: root
Banco de Dados: ecommerce_bemol
```

## Frontend
```
URL: http://localhost:3366
```

## Esquema do Banco
<img src="https://github.com/GomesAdriano/desafio-bemol/blob/main/database/ecommerce_bemol.png" alt="Esquema do banco de dados">
