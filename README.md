# Meu Livro API

API desenvolvida para o back-end da aplicação **Meu Livro**, um e-commerce de livraria online que permite aos usuários explorar livros, pesquisar títulos, consultar detalhes, visualizar promoções e lançamentos, gerenciar o carrinho e realizar compras simuladas.

O projeto surgiu como trabalho final de módulo do curso de formação em Desenvolvimento Web Full Stack da Resilia Educação, em 2022. Em 2026, foi reformulado com melhorias na arquitetura, padronização da nomenclatura, refatoração das tabelas e relacionamentos, refatoração de rotas, além da configuração de um novo banco e hospedagem.

**Repositório Front-End:** [Meu Livro](https://github.com/thainarapenha/MeuLivro)

<div align="center">Node.js | JavaScript | Express | PostgreSQL | JWT | bcrypt | REST API</div>

## O que tem feito

### Autenticação
- [x] Cadastro de clientes
- [x] Login com e-mail e senha
- [x] Hash de senha com bcrypt
- [x] Autenticação via JWT
- [x] Middleware de autenticação
- [x] Restringir operações aos clientes autenticados
- [x] Validar e-mails sem diferenciar letras maiúsculas e minúsculas
- [x] Consultar dados do cliente autenticado
- [x] Atualizar dados cadastrais do cliente

### Livros
- [x] Lista livros disponíveis
- [x] Consulta detalhes de um livro por ID
- [x] Lista livros por categoria
- [x] Associar livros às categorias
- [x] Identificar livros em pré-venda
- [x] Identificar livros em lançamento
- [x] Identificar livros em promoção

### Pedidos
- [x] Cria pedidos vinculados ao cliente autenticado
- [x] Calcula o valor total da compra
- [x] Registra os itens do pedido
- [x] Armazena informações dos livros nos itens do pedido
- [x] Valida disponibilidade de estoque
- [x] Valida os livros e quantidades informados
- [x] Consulta detalhes de um pedido
- [x] Consulta pedidos do cliente autenticado
- [x] Restringe a consulta de pedidos ao respectivo cliente

### Infraestrutura e Segurança
- [x] Organiza o projeto em camadas
- [x] Separa controllers, services e repositories
- [x] Configura autenticação JWT
- [x] Configura conexão com PostgreSQL
- [x] Configura variáveis de ambiente
- [x] Configura CORS para origens autorizadas
- [x] Implementa tratamento padronizado de erros

## O que falta
- [ ] Recuperação de senha
- [ ] Code Review de novas implementações

## Endpoints

### Saúde da API

| Método | Rota | Descrição |
| :---: | :--- | :--- |
| GET | `/health` | Verifica a disponibilidade da API |
| GET | `/ready` | Verifica se a API está pronta e conectada ao banco de dados |

### Livros

| Método | Rota | Descrição |
| :---: | :--- | :--- |
| GET | `/books` | Lista os livros disponíveis |
| GET | `/books/:id` | Consulta os detalhes de um livro |

### Categorias

| Método | Rota | Descrição |
| :---: | :--- | :--- |
| GET | `/categories` | Lista as categorias disponíveis |

### Clientes e autenticação

| Método | Rota | Descrição |
| :---: | :--- | :--- |
| POST | `/customers/register` | Cadastra um novo cliente |
| POST | `/customers/login` | Autentica o cliente e retorna um token JWT |
| GET | `/customers/me` | Consulta os dados do cliente autenticado |
| PATCH | `/customers/me` | Atualiza os dados do cliente autenticado |

### Pedidos

| Método | Rota | Descrição |
| :---: | :--- | :--- |
| POST | `/orders` | Cria um pedido para o cliente autenticado |
| GET | `/orders` | Lista os pedidos do cliente autenticado |
| GET | `/orders/:id` | Consulta os detalhes de um pedido |

As rotas de clientes que exigem autenticação e todas as rotas de pedidos protegidas utilizam JWT.

O token deve ser enviado no header:

```http
Authorization: Bearer SEU_TOKEN
```

As rotas públicas de catálogo e cadastro/login não exigem autenticação.

## JSON

### POST /customers/register

```json
{
  "name": "Seu Nome",
  "email": "seu_email@teste.com",
  "password": "sua_senha"
}
```

### POST /customers/login

```json
{
  "email": "seu_email@teste.com",
  "password": "sua_senha"
}
```

### POST /orders

O pedido deve ser enviado com os itens e quantidades desejados. O cliente é identificado pelo token JWT, não por um ID informado pelo frontend.

> A estrutura exata do corpo da requisição deve ser documentada conforme a validação implementada no endpoint.

##  Instalando e Executando

Clonando o repositório:

```bash
git clone https://github.com/thainarapenha/MeuLivroAPI.git
```

Entrar na pasta do projeto:

```bash
cd MeuLivroAPI
```

Instalando todos os pacotes:

```bash
npm install
```

Rodando o projeto:

```
npm run dev
```

### Configurando as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto, utilizando o `.env.example` como referência.

Variáveis necessárias:

```env
DATABASE_URI=sua_url_de_conexao_postgresql
JWT_SECRET=seu_segredo_jwt
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:5173
```

Não compartilhe ou versione o arquivo `.env`.

### Configurando o banco de dados

O projeto utiliza PostgreSQL.

Os arquivos SQL estão organizados em:

- `database/schema.sql`: estrutura das tabelas, relacionamentos, índices e categorias iniciais.
- `database/scripts/seed_catalog.sql`: dados iniciais do catálogo de livros.

Em uma instalação nova, execute primeiro o `schema.sql` e depois o `seed_catalog.sql`.

**Atenção:** o seed contém os registros reais do catálogo atual e não deve ser executado novamente sobre um banco que já tenha esses livros cadastrados.

### Executando localmente

```bash
npm run dev
```

Para iniciar em modo de produção:

```bash
npm start
```

## Contato
Site: [thainarapenha.com](https://www.thainarapenha.com/)
LinkedIn: [Thainara Penha](https://www.linkedin.com/in/thainarapenha/)
