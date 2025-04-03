# Automação de Testes para E-Commerce

Este projeto contém a automação de testes para uma aplicação de e-commerce utilizando Cypress. O foco dos testes é garantir a funcionalidade dos principais fluxos de usuário, como cadastro, login, adição de produtos ao carrinho e finalização de compra.

## Tecnologias Utilizadas:
- **Cypress**: Framework para automação de testes de frontend.
- **JavaScript**: Linguagem de programação utilizada para escrever os testes.
- **GitHub Actions**: Pipeline de CI/CD para execução automática dos testes.

## Pré-Requisitos:
É necessário ter instalado o Node.js e npm installed para rodar o projeto.

## Installation

Para baixar as dependências execute `npm install` (ou `npm i`) para instalar as dependências.


## Funcionalidades Testadas:
- Cadastro de novo usuário.
- Login e logout de usuários.
- Filtragem de produtos (preço, marca, cor, etc.).
- Ações no carrinho de compras.
- Checkout e validações relacionadas.

Este repositório contém uma série de testes que simulam o comportamento de usuários em diferentes cenários.

## Estrutura do Repositório

O repositório segue a estrutura padrão do Cypress com algumas personalizações para facilitar a reutilização de código.
## Estrutura do Repositório

Aqui está a estrutura de diretórios do repositório:

- 📁 `/cypress`
    -  📂 `/e2e`          # Casos de teste
  - 📂 `/fixtures`        # Dados de teste mockados
  - 📂 `/integration`     # Testes automatizados (onde estão localizados os arquivos de teste)
  - 📂 `/support`         # Funções customizadas e comandos
    - 📝 `commands.js`    # Comandos personalizados como login, criação de conta, etc.
  - 🔌 `/plugins`         # Plugins utilizados pelo Cypress
  - 📹 `/videos`          # Vídeos gerados pelas execuções de testes
  - 📸 `/screenshots`     # Capturas de tela dos testes falhos

## 🤖 Testes Automatizados
### 1. **Cadastro de Usuário (Create Account)**

**Objetivo**: Garantir que o processo de criação de conta esteja funcionando corretamente, validando diferentes fluxos de cadastro.

#### Cenários Testados:
- **Cadastro com aceite dos termos de privacidade**:
  Testa a criação de uma conta com a seleção do checkbox para aceitar os termos.
  
- **Cadastro sem aceitar os termos de privacidade**:
  Testa a criação de conta sem a seleção do checkbox, esperando uma mensagem de erro.
  
- **Cadastro com e-mail já registrado**:
  Testa a criação de conta com um e-mail que já foi utilizado, esperando que o sistema informe que o e-mail já existe.
  
- **Cadastro com senha diferente**:
  Testa a criação de conta quando as senhas fornecidas não coincidem.

#### Como Executar:
1. Execute `npm run cy:open` no terminal para abrir o Cypress.
2. Para executar executar

## 2 - Login de Usuário (Login)

Objetivo: Validar os fluxos de login e logout, além de testar a recuperação de senha.

#### Cenários Testados:
- **Login com dados válidos**:
    Testa o login com um usuário existente.
    
- **Logout após login**:
     Testa o processo de logout.

- **Esqueci minha senha**:
    Testa a funcionalidade de recuperação de senha.

- **Alteração de senha enquanto logado**:
    Testa a funcionalidade de alteração de senha enquanto o usuário já está logado.

##  3. Carrinho de Compras (Sacola) 

Objetivo: Testar os comportamentos relacionados ao carrinho de compras, como adicionar e remover produtos e finalizar o pedido.
### Cenários Testados:

- **Deslogado, acessando sacola vazia:**
     Testa o comportamento quando um usuário deslogado tenta acessar um carrinho vazio.

- **Deslogado, acessando o checkout:** Testa o comportamento quando um usuário deslogado tenta acessar o checkout com um carrinho vazio.

- **Adicionando produto ao carrinho e finalizando a compra:**
 Testa o fluxo de adicionar um produto ao carrinho, realizar login e finalizar a compra.

## 4. Testes de Filtragem de Produtos

Objetivo: Validar que a filtragem de produtos nas páginas de categoria esteja funcionando corretamente.
### Cenários Testados:

- **Filtragem por preço**:
Testa a funcionalidade de filtragem de produtos com base no preço de forma randômica.

- **Filtragem por marca**:
Testa a funcionalidade de filtragem de produtos por marca.

- **Filtragem por cor, tamanho e disponibilidade**:
 Testa as opções de filtragem de produtos por cor, tamanho e disponibilidade.
 
 
