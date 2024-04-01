# Desafio Bemol - E-commerce Bemol

Para rodar a aplicação utilizando Docker, execute os seguintes comandos:

```
$ git clone git@github.com:GomesAdriano/desafio-bemol.git
$ cd desafio-bemol
$ cp .env.example .env
$ cp frontend/.env.example frontend/.env
$ cp backend/.env.example.comdocker backend/.env
$ cd frontend
$ npm install --force
$ cd ..
$ cd backend
$ npm install
$ cd ..
$ docker compose up
```

## PhpMyAdmin

Para verificar o banco de dados caso esteja utilizando Docker:

```
URL: http://localhost:8010
Server: db (serviço do docker compose)
Username: root
Senha: root
Banco de Dados: ecommerce_bemol
```

## Execução manual sem Docker
```
$ git clone git@github.com:GomesAdriano/desafio-bemol.git
$ cd desafio-bemol
$ cp .env.example .env
$ cp frontend/.env.example frontend/.env
$ cp backend/.env.example.semdocker backend/.env
$ Executar o 'script.sql' em /database no seu SGBD para criação do banco e tabelas
$ cd backend (Terminal 1)
$ npm install
$ npm run build
$ npm run prod
$ cd frontend (Terminal 2)
$ npm install --force
$ npm run start
```

- Utilizar seu SGBD para verificar o banco de dados, verifique as informações em backend/.env, mudar os dados caso necessário do #Database e reexecutar os comandos do backend

## Frontend
```
URL: http://localhost:3366
```

## Esquema do Banco
<img src="https://github.com/GomesAdriano/desafio-bemol/blob/main/database/ecommerce_bemol.png" alt="Esquema do banco de dados">
