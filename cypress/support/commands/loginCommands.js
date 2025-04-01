import {faker} from '@faker-js/faker';

Cypress.Commands.add('accessLogin',() =>{
    cy.contains("span",' Login').click({force: true});

});
Cypress.Commands.add('inputLogin',(seletor1, seletor2)=>{
  cy.getRandomUser().then((randomUser) => {
    cy.get(seletor1).type(randomUser.email);
        cy.get(seletor2).type(randomUser.password);
        cy.wrap(randomUser.email).as('userEmail');
    });

})
Cypress.Commands.add('clickBtnLogin',()=>{
   cy.contains('form > .btn', 'Login').click();      
})
Cypress.Commands.add('login',(ação) =>{
   
    switch (ação) {
      case 'home':
        cy.accessLogin();
        cy.inputLogin('#input-email','#input-password')
        cy.clickBtnLogin();      
        break;
      case 'cart':
          //cy.clickRadioLoginCart();
          cy.inputLogin('#input-login-email','#input-login-password');
          cy.get('#button-login')
            .should('be.visible')
            .click();
          break;
      case 'todosCamposVazios':
          break;
      case 'emailJaCadastrado':
          break;
  
      case 'senhaDiferente':
          break;
      default:
          cy.log('Houve um erro, usuário não cadastrado!');
  }
  

});
Cypress.Commands.add('logout', () => {
  cy.visit('/index.php?route=account/account');

  cy.get('body').then(($body) => {
    const $logoutButton = $body.find('.list-group-item').filter(':contains("Logout")');  // Verifica se o botão de logout está presente.

    if ($logoutButton.length > 0) {
      // Se o botão de logout for encontrado, clicamos nele
      cy.wrap($logoutButton).click();
      cy.log('Usuário deslogado com sucesso.');
      cy.get('#content').should('be.visible').within(() => {
        cy.contains('p', 'You have been logged off your account. It is now safe to leave the computer.')
            .should('be.visible');
        cy.contains('p', 'Your shopping cart has been saved, the items inside it will be restored whenever you log back into your account.')
            .should('be.visible');
        });
  
        // Verificar se o botão 'Continue' está visível e disponível para clicar
        cy.contains('.buttons > .btn', 'Continue').should('be.visible').click();

    } else {
      // Caso o botão de logout não seja encontrado (usuário já deslogado)
      cy.log('Usuário já está deslogado, botão de logout não encontrado.');
    }
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});

Cypress.Commands.add('forgottenPassword',() =>{
    cy.accessLogin();
    cy.contains('a', 'Forgotten Password').click();

    cy.getRandomUser().then((randomUser) => {
        cy.get('#input-email').type(randomUser.email);
        cy.contains('.float-right > .btn', 'Continue').click();

    });


    cy.get('#account-login > .alert')
      .should('be.visible')
      .contains('An email with a confirmation link has been sent your email address.')
    
})
Cypress.Commands.add('forgottenPasswordLogged',() =>{
    cy.login('home');
    //acessa o menu lateral e escolhe a opção
    cy.get('.list-group > a')  // Pega todos os links dentro de `.list-group`
    .contains('Password')  // Verifica se o link contém o texto correto
    .click();

    cy.updatePasswordLogged();

})
Cypress.Commands.add('updatePasswordLogged',() =>{
    const newPassword = faker.internet.password();
   
    cy.get('#input-password').type(newPassword);
    cy.get('#input-confirm').type(newPassword);
    cy.contains('.float-right > .btn', 'Continue').click();
    cy.validMessageUpdatePassword(newPassword);

});
Cypress.Commands.add('updateUserPasswordJson', (newPassword) => {
    // Lê o arquivo JSON onde os dados do usuário estão armazenados
    cy.readFile('cypress/fixtures/user_data.json').then((usuarios) => {
      // Supondo que o JSON seja uma lista de usuários e você tenha uma forma de identificar o usuário
      cy.get('@userEmail').then((email) => {
        const usuario = usuarios.find(u => u.email === email); // Busca o usuário pelo e-mail
       
        // Atualiza a senha
        if (usuario) {
          usuario.password = newPassword;
          
          // Escreve de volta o arquivo JSON com a nova senha
          cy.writeFile('cypress/fixtures/user_data.json', usuarios);
        } else {
          throw new Error('Usuário não encontrado');
        }
      });
    });
  });

Cypress.Commands.add('validMessageUpdatePassword', (newPassword) => {
    cy.get('#account-account > .alert')
        .should('be.visible')
        .contains('Success: Your password has been successfully updated.')
        cy.updateUserPasswordJson(newPassword);

});
Cypress.Commands.add('clickBtnContinue',()=>{
  cy.contains('.buttons > .btn', 'Continue').click();  
})
  