# Aplicação de Cadastro e Listagem de Produtos

Este projeto consiste em uma API REST mock e uma aplicação front-end em ReactJS para cadastrar e listar produtos.

## Tecnologias Utilizadas

-   **Front-end:** ReactJS, React Router, Axios
-   **Back-end (Mock API):** Node.js, json-server

---

## Descrição da API

A API foi construída com `json-server` e expõe os seguintes endpoints para o recurso `products`:

-   `GET /products`
    -   **Descrição:** Retorna uma lista com todos os produtos cadastrados.
    -   **Exemplo de Resposta:**
      ```json
      [
        { "id": 1, "name": "Notebook Gamer", "price": "4599.90" }
      ]
      ```

-   `POST /products`
    -   **Descrição:** Cadastra um novo produto.
    -   **Corpo da Requisição (JSON):**
      ```json
      {
        "name": "Teclado Mecânico",
        "price": "350.00"
      }
      ```
    -   **Exemplo de Resposta:**
      ```json
      { "id": 3, "name": "Teclado Mecânico", "price": "350.00" }
      ```

---

## Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/react-crud-produtos.git](https://github.com/seu-usuario/react-crud-produtos.git)
    cd react-crud-produtos
    ```

2.  **Execute a API:**
    -   Navegue para a pasta da API: `cd api-produtos`
    -   Instale a dependência (se ainda não tiver): `npm install -g json-server`
    -   Inicie o servidor: `json-server --watch db.json --port 3001`
    -   A API estará rodando em `http://localhost:3001`

3.  **Execute a Aplicação React:**
    -   Abra um **novo terminal** e navegue para a pasta do cliente: `cd client-products`
    -   Instale as dependências: `npm install`
    -   Inicie a aplicação: `npm start`
    -   A aplicação abrirá em `http://localhost:3000` no seu navegador.