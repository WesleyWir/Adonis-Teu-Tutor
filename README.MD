# Teututor
## _Back-end_
### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:
- [Adonis](https://adonisjs.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/en/)
- [Maria DB](https://mariadb.org/)
- [phpMyAdmin](https://www.phpmyadmin.net/)

## Requisitos
- Node.js >= 14
- MariaDB|MySQL

### 🎲 Rodando o Back End (servidor)

```bash
# Rode o sistema de gerenciamento de banco de dados
# Clone este repositório
$ git clone <https://github.com/WesleyWir/Adonis-Teu-Tutor>

# Acesse a pasta do projeto no terminal/cmd
$ cd Adonis-Teu-Tutor

# Configure o arquivo .env
PORT=3001
HOST=[localhost]
NODE_ENV=development
APP_KEY=Emluf_ua0aUuprpZv9seqzjUkBcZALVY
DRIVE_DISK=local
DB_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=secret
MYSQL_DB_NAME=[nome_do_banco]
CACHE_VIEWS=false
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=587
SMTP_USERNAME=smtp_username
SMTP_PASSWORD=smtp_password
TZ=America/Sao_Paulo
FRONT_URL=http://localhost:3000 [front-end url]

# 1° Opção - Rodar com node instalado localmente
# Instale as dependências
$ npm install
# Rodar as migrations | Necessário apenas na primeira instalação.
$ node ace migration:run

# 2° Opção - Rodar com docker
# Docker e Docker compose requisitado.
$ docker-compose up -d

# Instale as dependências
$ docker-compose exec node npm install

# Rodar as migrations | Necessário apenas na primeira instalação.
$ docker-compose exec node
$ node ace migration:run

# Execute a aplicação em modo de desenvolvimento
$ docker-compose exec node npm run dev

# O servidor da api inciará na porta configurado no arquivo .env (padrão 3001) - acesse <http://localhost:3001>