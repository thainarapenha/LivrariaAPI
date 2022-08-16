# Livraria API REST 📚

> ### Aplicação back-end desenvolvida pelo Squad 3 para a finalização do módulo 4 do curso de Desenvolvimento Web FullStack da Resilia Educação. 💛

![npm](https://img.shields.io/npm/v/8.5?style=for-the-badge)
![contributors](https://img.shields.io/github/contributors/thainarapenha/LivrariaAPI?style=for-the-badge)
![pull requests](https://img.shields.io/github/issues-pr-closed/thainarapenha/LivrariaAPI?style=for-the-badge)
![express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
<!--ts-->
   * [Descrição](#descricao)
   * [Tabela de Conteúdo](#tabela-de-conteudo)
   * [Rotas da API](#rotas-da-api)
    * [Livros](#Livros)
    * [Usuários](#rotas-usuarios)
    * [Funcionários](#rotas-funcionarios)
    * [Estoque](#rotas-estoque)
   * [Como executar o projeto?](#como-executar-o-projeto)
    * [Requisitos](#Requisitos-dependências)
    * [Instalação das dependências](#instalacao)
   * [Desenvolvedores](#desenvolvedores)
<!--te-->

# Rotas da API 

## Livros 📚

| Métodos       | Rotas           | Descrição   |
| ------------- |:---------------:|:-----------:|
| GET           | /livros           | Retorna tabela inteira de livros      
| GET           | /livros/:*id*     | Retorna livro especificado por id 
| POST          | /livros           | Cria um novo livro na tabela          
| PATCH         | /livros/:*id*     | Atualiza um livro especificado por id 
| DELETE        | /livros/:*id*     | Deleta um livro especificado por id  

## Usuários 🙂

| Métodos       | Rotas           | Descrição   |
| ------------- |:---------------:|:-----------:|
| GET           | /usuarios         | Retorna tabela inteira de usuarios  
| GET           | /usuarios/:id     | Retorna usuarios especificado por id 
| POST          | /usuarios         | Cria um novo usuarios na tabela      
| PATCH         | /usuarios/:id     | Atualiza um usuarios especificado por id 
| DELETE        | /usuarios/:id     | Deleta um usuarios especificado por id


## Funcionários 💼

| Métodos       | Rotas                 | Descrição   |
| ------------- |:---------------:      |:-----------:|
| GET           | /funcionarios         | Retorna tabela inteira de funcionarios  
| GET           | /funcionarios/:id     | Retorna funcionarios especificado por id 
| POST          | /funcionarios         | Cria um novo funcionarios na tabela     
| PATCH         | /funcionarios/:id     | Atualiza um funcionarios especificado por id
| DELETE        | /funcionarios/:id     | Deleta um funcionarios especificado por id

## Estoque 📦

| Métodos       | Rotas             | Descrição   |
| ------------- |:----------------: |:-----------:|
| GET           | /estoque          | Retorna tabela inteira de estoque
| GET           | /estoque/:id      | Retorna estoque especificado por id 
| POST          | /estoque          | Cria um novo estoque na tabela       
| PATCH         | /estoque/:id      | Atualiza um estoque especificado por id
| DELETE        | /estoque/:id      | Deleta um estoque especificado por id



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




