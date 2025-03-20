// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import {faker} from '@faker-js/faker';


Cypress.Commands.add('accessFormCreateAccount',() =>{
    cy.contains("span",' My account').click({force: true});
    cy.contains(".card-body > .btn", 'Continue').click();

});

Cypress.Commands.add('createAccount',(preencheForm) =>{

    cy.accessFormCreateAccount();
    cy.contains("span",' My account').click({force: true});
    cy.contains(".card-body > .btn", 'Continue').click();

    cy.registerAccount(preencheForm);


});

Cypress.Commands.add('inputForm',() =>{
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    cy.get('#input-firstname').type(firstName)
    cy.get('#input-lastname').type(lastName)

});

Cypress.Commands.add('selectCheckboxTerms', () => {
    cy.get('label[for="input-agree"]').check();
    cy.contains('.float-right > .btn', 'Continue').click();
    //cy.validRegisterMessageSucess(email, password);
    
})
Cypress.Commands.add('unCheckboxTerms', () => {
    cy.contains('.float-right > .btn', 'Continue').click();
    cy.validRegisterMessageError();

})
Cypress.Commands.add('selectRandomRadioValue', () => {
    const values = [0, 1]; // Alterar valores conforme necessário
    const randomValue = values[Math.floor(Math.random() * values.length)];

    // Altera a opacidade do radio button para 1 (visível)
    cy.get(`input[type="radio"][value="${randomValue}"]`)
      .invoke('css', 'opacity', '1')  // Torna o elemento visível
      .should('be.visible')  // Garante que o radio button está visível após a alteração
      .check({force: true});  // Marca o radio button
});

Cypress.Commands.add('registerAccount',(ação) =>{
    const email = faker.internet.email();
    const password = faker.internet.password();
    const phone = faker.phone.number();

    cy.inputForm();
    switch (ação) {
    case 'checkboxTermosMarcado':
        cy.get('#input-email').type(email);
        cy.get('#input-telephone').type(phone);
        cy.get('#input-password').type(password);
        cy.get('#input-confirm').type(password);
        cy.selectRandomRadioValue();
        cy.selectCheckboxTerms();
        cy.validRegisterMessageSucess(email,password);
        break;
    case 'checkboxTermosDesmarcado':
        cy.get('#input-email').type(email);
        cy.get('#input-telephone').type(phone);
        cy.get('#input-password').type(password);
        cy.get('#input-confirm').type(password);
        cy.selectRandomRadioValue();
        cy.contains('.float-right > .btn','Continue').click();
        cy.validRegisterMessageError();
        break;
    case 'todosCamposVazios':
        cy.emptyForm();
        break;
    case 'emailJaCadastrado':
        cy.inputEmail();
        cy.get('#input-telephone').type(phone);
        cy.get('#input-password').type(password);
        cy.get('#input-confirm').type(password);
        cy.selectRandomRadioValue();
        cy.selectCheckboxTerms();
        cy.validMessageAddressIsAlready();
        break;

    case 'senhaDiferente':
        cy.get('#input-email').type(email);
        cy.get('#input-telephone').type(phone);
        cy.get('#input-password').type(password+1);
        cy.get('#input-confirm').type(password);
        cy.selectRandomRadioValue();
        cy.selectCheckboxTerms();
        cy.validMessagePasswordError();
        break;
    default:
        cy.log('Houve um erro, usuário não cadastrado!');
}
    
});
Cypress.Commands.add('validMessageAddressIsAlready',() =>{
    cy.get('#account-register > .alert')
        .should('be.visible')
        .contains('Warning: E-Mail Address is already registered!')
    });
Cypress.Commands.add('validMessagePasswordError',() =>{
''
    cy.get('.text-danger')
      .should('be.visible')
      .contains('Password confirmation does not match password!')

    cy.scrollTo('top');  // Rola a página até o topo


    cy.get('#content > p')
      .should('be.visible')
      .contains('If you already have an account with us, please login at the login page')
});
Cypress.Commands.add('validRegisterMessageError',() =>{
    cy.get('#account-register > .alert')
     .should('be.visible')
     .contains('Warning: You must agree to the Privacy Policy!')
});
Cypress.Commands.add('validRegisterMessageSucess',(email, password)=>{
    cy.get('.page-title')
     .should('be.visible')
     .contains('Your Account Has Been Created!');

     cy.salveUserJson(email, password);  // Chama o comando que salva o email e senha
    
     cy.contains('.buttons > .btn', 'Continue').click();

});

  Cypress.Commands.add('emptyForm',() =>{
      
    cy.accessFormCreateAccount();
    cy.contains('.float-right > .btn', 'Continue').click({force: true});
    cy.validRegisterMessageError();

    cy.get('.text-danger').should('contain.text', 'First Name must be between 1 and 32 characters!');
    cy.get('.text-danger').should('contain.text', 'Last Name must be between 1 and 32 characters!');
    cy.get('.text-danger').should('contain.text', 'E-Mail Address does not appear to be valid!');
    cy.get('.text-danger').should('contain.text', 'Telephone must be between 3 and 32 characters!');
    cy.get('.text-danger').should('contain.text', 'Password must be between 4 and 20 characters!');
  
});

Cypress.Commands.add('salveUserJson', (email, password) => {
    const userData = {
      email: email,
      password: password
    };
  
    // Ler o arquivo JSON existente, ou criar um array vazio se o arquivo não existir ou estiver vazio
    cy.readFile('cypress/fixtures/user_data.json', { failOnStatusCode: false }) // Não falhar caso o arquivo não exista
      .then((existingData) => {
        // Verificar se os dados existentes são um array, senão, inicializar um array vazio
        const dataToWrite = Array.isArray(existingData) ? existingData : [];
        
        // Adicionar o novo usuário ao array
        dataToWrite.push(userData);
  
        // Escrever o array atualizado de volta no arquivo JSON
        cy.writeFile('cypress/fixtures/user_data.json', dataToWrite);
      });
  });


Cypress.Commands.add('inputFormMinimoCaractere', () => {
    // Gera os dados com o Faker e limita ou força para um caractere, conforme necessário
    const email = faker.internet.email();  // Limita a 20 caracteres (pode gerar um email válido)
    const password = faker.internet.password().slice(0, 4);  // Limita a 4 caracteres
    const phone = faker.phone.number().slice(0, 3);  // Limita a 3 caracteres (pode gerar um número válido)
    const firstName = faker.person.firstName().slice(0, 1);  // Limita a 1 caractere
    const lastName = faker.person.lastName().slice(0, 1);  // Limita a 1 caractere

    // Preenchendo os campos do formulário com os dados gerados
    cy.get('#input-email').type(email);
    cy.get('#input-telephone').type(phone);
    cy.get('#input-password').type(password);
    cy.get('#input-confirm').type(password);
    cy.get('#input-firstname').type(firstName);
    cy.get('#input-lastname').type(lastName);
});
  
  //------------------------- Manipulando Json -------------------

// Comando para pegar um usuário aleatório do JSON
Cypress.Commands.add('getRandomUser', () => {
    cy.readFile('cypress/fixtures/user_data.json', { timeout: 10000 })  // Aumenta o timeout para 10 segundos
    .then((users) => {
        const randomIndex = Math.floor(Math.random() * users.length);
        return users[randomIndex];
    });
});

// Comando para preencher o email com um usuário aleatório
Cypress.Commands.add('inputEmail', () => {
    cy.getRandomUser().then((randomUser) => {
        // Verifica se o campo de e-mail existe na página antes de preenchê-lo
        cy.get('#input-email').then(($input) => {
            if ($input.length) {  // Verifica se o campo existe (se há pelo menos um elemento)
                $input.type(randomUser.email);
            }
            else{
                cy.log('não encontrado o input do login')
            }
        });
    });
});
