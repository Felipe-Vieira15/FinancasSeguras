💰 Finanças Seguras: Sistema de Gestão Financeira Pessoal (Backend + Frontend)
✨ Visão Geral do Projeto
Este projeto consiste em um Sistema de Gestão Financeira Pessoal que permite aos usuários gerenciar categorias de receitas e despesas, registrar transações detalhadas e visualizar um extrato financeiro. Desenvolvido com uma arquitetura Client-Server (Frontend em HTML/CSS/JavaScript puro e Backend em Node.js/Express/Sequelize), o foco está na segurança robusta, na separação de responsabilidades e na geração de documentos (PDF) para cada transação.

A aplicação garante a integridade dos dados através de validações rigorosas e protege o usuário contra ataques web comuns como CSRF e XSS, utilizando cookies com flags de segurança e sanitização de dados.

🛠️ Guia de Utilização e Instalação
Siga os passos abaixo para configurar e executar o projeto completo (Backend e Frontend).

Pré-requisitos
Certifique-se de ter instalado em sua máquina:

Node.js (versão LTS recomendada)

npm (Node Package Manager)

Um servidor de banco de dados PostgreSQL ou SQLite (necessário para a configuração do Sequelize).

1. Configuração do Backend (Node.js/Express)
O backend é a API responsável pela lógica de negócios, autenticação e persistência de dados.

Navegue até o diretório do backend:

Bash

cd backend/

2. Instale as dependências:

Bash

npm install

3. Configuração de Variáveis de Ambiente: Crie um arquivo chamado .env na raiz do diretório backend/ e adicione as seguintes variáveis (ajuste conforme seu banco de dados):

Snippet de código

# Configuração do JWT
JWT_SECRET=sua_chave_secreta_aqui # Use uma string longa e aleatória

# Configuração do PostgreSQL/SQLite
DB_DIALECT=postgres # ou sqlite
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=financas_db

# Porta de Execução
PORT=3000

Inicialize o Banco de Dados e execute o Servidor:Bashnpm start
O servidor estará rodando em http://localhost:3000.

2. Configuração do Frontend (Web)

O frontend é a interface do usuário que consome a API RESTful do backend.

Navegue até o diretório do frontend:

Bash

cd frontend/

Execute a Aplicação:

Como o frontend é composto por arquivos HTML, CSS e JavaScript puros, você precisará de um servidor web simples para evitar erros de CORS (Cross-Origin Resource Sharing).

Opção 1 (Recomendada): Use o Live Server do VS Code ou instale o serve globalmente:

Bash

npm install -g serve
serve .
Opção 2: Use o servidor nativo do Node.js:

Bash

npx http-server . 

Acesse a Aplicação:

Abra seu navegador e acesse a URL fornecida pelo seu servidor (geralmente http://localhost:8080 ou http://127.0.0.1:5500).

🔒 Segurança

O projeto foi construído com foco na segurança, implementando as seguintes proteções no Backend:

Proteção CSRF (Cross-Site Request Forgery): Utilização de cookies de sessão com as flags SameSite=Strict e HttpOnly para proteger rotas críticas.

Proteção XSS (Cross-Site Scripting): Uso de sanitização de entrada (express-xss-sanitizer ou similar) em todos os dados recebidos do req.body antes de serem persistidos.

Segurança de Cabeçalhos: Uso da biblioteca Helmet para definir cabeçalhos HTTP de segurança, incluindo CSP (Content Security Policy), dificultando a injeção de scripts e estilos.

Autenticação: Tokens JWT armazenados em cookies com HttpOnly e Secure (em produção) para prevenir roubo de sessão.

📂 Estrutura do ProjetoA arquitetura está separada em dois grandes diretórios:

.
├── backend/
│   ├── config/             # Configurações do Sequelize (DB)
│   ├── controllers/        # Lógica de manipulação de dados
│   ├── middlewares/        # Validações, autenticação e tratamento de erros
│   ├── models/             # Definições dos modelos Sequelize (User, Category, Transaction)
│   └── routes/             # Definição das rotas da API
└── frontend/
    ├── css/                # Estilos (styles.css)
    ├── js/                 # Scripts auxiliares
    ├── dashboard.html      # Página principal da aplicação
    ├── index.html          # Página de Registro
    └── login.html          # Página de Login