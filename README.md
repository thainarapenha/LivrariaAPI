# Livraria API REST 📚

> ### Aplicação back-end desenvolvida pelo Squad 3 para a finalização do módulo 4 do curso de Desenvolvimento Web FullStack da Resilia Educação. 💛

![npm](https://img.shields.io/npm/v/8.5?style=for-the-badge)
![contributors](https://img.shields.io/github/contributors/thainarapenha/LivrariaAPI?style=for-the-badge)
![pull requests](https://img.shields.io/github/issues-pr-closed/thainarapenha/LivrariaAPI?style=for-the-badge)
![express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
<!--ts-->
   - [Descrição](#descricao)
   - [Tabela de Conteúdo](#tabela-de-conteudo)
   - [Rotas da API](#rotas-da-api)
    - [Livros](#Livros)
    - [Usuários](#rotas-usuarios)
    - [Funcionários](#rotas-funcionarios)
    - [Estoque](#rotas-estoque)
   * [Como executar o projeto?](#como-executar-o-projeto)
    * [Requisitos](#Requisitos-dependências)
    * [Instalação das dependências](#instalacao)
   * [Desenvolvedores](#desenvolvedores)
<!--te-->

# Rotas da API 

## Livros 📚

Acessar pela rota: http://localhost:3000/livros

Modelo do corpo da requisição: 
````
{
    "titulo": "título do livro",
    "descricao": "descrição do livro",
    "categoria": "categoria do livro",
    "url_image": "URL da imagem do livro",
    "preco": "preço do livro",
    "total_paginas": "quantidade de páginas do livro",
    "ano_publicacao": "ano da publicação do livro",
    "autor": "autor do livro"
}

Exemplo:

{
    "titulo": "Código limpo: Habilidades práticas do Agile Software",
    "descricao": "Mesmo um código ruim pode funcionar. Mas se ele não for limpo, pode acabar com uma empresa de desenvolvimento. Perdem-se a cada ano [...]",
    "categoria": "Programação",
    "url_image": "https://images-na.ssl-images-amazon.com/images/I/4153E2zZmTS._SX350_BO1,204,203,200_.jpg",
    "preco": "69.99",
    "total_paginas": "425",
    "ano_publicacao": "2009",
    "autor": "Robert C. Martin"
}
````

## Usuários 🙂

Acessar pela rota: http://localhost:3000/usuarios

Modelo do corpo da requisição: 
````
{
    "CPF": "cpf do usuário",
    "nome": "nome do usuário",
    "email": "email do usuário",
    "senha": "senha do usuário"
}

Exemplo:

{
    "CPF": "12345678900",
    "nome": "Maria Augusta",
    "email": "maria.augusta@gmail.com",
    "senha": "123456"
}
````

## Funcionários 💼

Acessar pela rota: http://localhost:3000/funcionarios

Modelo do corpo da requisição: 
````
{
    "CPF": "cpf do funcionário",
    "nome": "nome do funcionário",
    "cargo": "cargo do funcionário",
    "salario": "salário do funcionário",
    "statusFuncionario": "informa se está trabalhando ou de férias"
}

Exemplo:

{
    "CPF": "12345678900",
    "nome": "João da Silva",
    "cargo": "Gerente de vendas",
    "salário: "2.500",
    "statusFuncionario": "Férias"
}
````

## Estoque 📦

Acessar pela rota: http://localhost:3000/estoque

Modelo do corpo da requisição: 
````
{
    "nome_fornecedor": "nome do fornecedor",
    "CNPJ": "CNPJ do fornecedor",
    "qnt_livros": "quantidade de livros",
    "lote": "número do lote",
    "nome_obra": "nome da obra",
    "preco_lote": "preço do lote"
}

Exemplo: 

{
    "nome_fornecedor": "Alta Books",
    "CNPJ": "12345678900",
    "qnt_livros": "186",
    "lote": "02154878787841IF",
    "nome_obra": "Código limpo: Habilidades práticas do agile software",
    "preco_lote": "8.000,00"
}
````

# Como executar o projeto? 🤔

## 1.0 Requisitos para rodar localmente 💻 

Ferramentas **necessárias** para executar a API localmente:

<!--ts-->
   * [VsCode](https://code.visualstudio.com/download) ou outro editor de preferência
   * [Node.js](https://nodejs.org/en/download/) instalado na máquina
   * [Postman](https://www.postman.com/downloads/), [Insomnia](https://insomnia.rest/download) ou semelhante.
<!--te-->

### 1.1 Instalando as dependências 🛠️


#### 1.1.1 Clone  este repositório _localmente_ em sua máquina

#### 1.1.2 Execute o seguinte comando para instalar as dependências do projeto: 

```
npm install
```

#### 1.1.3 Execute o seguinte script para rodar o servidor: 

```
npm run dev
```
#### 1.1.4 Abra o Insomnia e execute a rotas especificadas 

## Desenvolvedores(as) 👨‍💻
<table>
    <th>
      <a href="https://github.com/thainarapenha">
        <img src="https://avatars.githubusercontent.com/thainarapenha" width="115"><br><br>
        <p align="center">
            <a href="https://github.com/thainarapenha" target="_blank">
                <img 
                    src="https://img.shields.io/badge/thainarapenha-100000?style=flat-square&logo=github&logoColor=white" 
                    alt="thainarapenha"
                />
            </a>
        </p>
      </a>
    </th>
    <th>
      <a href="https://github.com/isadoraraujo">
        <img src="https://avatars.githubusercontent.com/isadoraraujo" width="115"><br><br>
        <p align="center">
            <a href="https://github.com/isadoraraujo" target="_blank">
                <img 
                    src="https://img.shields.io/badge/isadoraraujo-100000?style=flat-square&logo=github&logoColor=white" 
                    alt="isadoraraujo"
                />
            </a>
        </p>
      </a>
    </th>
    <th>
    <a href="https://github.com/lucasmedeiros7">
        <img src="https://avatars.githubusercontent.com/lucasmedeiros7" width="115"><br><br>
        <p align="center">
            <a href="https://github.com/lucasmedeiros7" target="_blank">
                <img 
                    src="https://img.shields.io/badge/lucasmedeiros7-100000?style=flat-square&logo=github&logoColor=white" 
                    alt="lucasmedeiros7"
                />
            </a>
        </p>
      </a>
    </th>
    <th>
    <a href="https://github.com/kamirii">
        <img src="https://avatars.githubusercontent.com/kamirii" width="115"><br><br>
        <p align="center">
            <a href="https://github.com/kamirii" target="_blank">
                <img 
                    src="https://img.shields.io/badge/kamirii-100000?style=flat-square&logo=github&logoColor=white" 
                    alt="kamirii"
                />
            </a>
        </p>
      </a>
    </th>
    </table>




