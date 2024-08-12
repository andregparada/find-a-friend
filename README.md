# Find a Friend

O **Find a Friend** é uma aplicação proposta como desafio prático do curso Node.js da **Rocketseat**. Ele conecta pessoas interessadas em adotar pets com organizações de adoção. Através dela, os usuários podem navegar por uma lista de pets disponíveis e filtrá-los por características específicas. Foi desenvolvida em TypeScript, executada com Node.js e utiliza o Fastify como framework. O ORM escolhido foi o Prisma, e a biblioteca Zod foi empregada para validação de esquemas. Além disso, para testes unitários e e2e, foram utilizadas as tecnologias Vitest e Supertest.

## Funcionalidades

- Cadastro e login de organizações (ORGs).
- Registro e gestão de pets disponíveis para adoção.
- Filtragem de pets por raça, idade, porte, entre outros.
- Contato com a organização via WhatsApp.

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Prisma**
- **Fastify**
- **Vitest**
- **Supertest**
- **Docker**
- **Zod**

## Como Executar

1. Clone o repositório:
    ```bash
    git clone https://github.com/andregparada/find-a-friend.git
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Configure o banco de dados usando o Prisma:
    ```bash
    npx prisma migrate dev
    ```
4. Inicie a aplicação:
    ```bash
    npm run start:dev
    ```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Rocketseat

Este projeto foi idealizado pela Rocketseat como desafio prático para a trilha de **[Node.js](https://www.rocketseat.com.br/)**.
