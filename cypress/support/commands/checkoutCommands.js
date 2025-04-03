import {faker} from '@faker-js/faker';
Cypress.Commands.add('validatePageConfirmCheckout',()=>{
    cy.get('.page-title', { timeout: 5000 }) // Ajusta o timeout
        .then(($el) => {
          if ($el.length > 0) {
            cy.log('Elemento Confirm Order encontrado!');
            cy.wrap($el).contains('Confirm Order');
          } else {
            cy.log('Elemento Confirm Order não encontrado.');
          }
        });


});
Cypress.Commands.add('clickBtnConfirm',()=>{
    cy.scrollTo('bottom');
    cy.get('#button-confirm').click();
});
Cypress.Commands.add('validatePageConfirmOrder',()=>{
    cy.url().should('include', '/index.php?route=checkout/success');
    cy.get('.page-title')
      .should('be.visible')
      .contains('Your order has been placed!')    
})
Cypress.Commands.add('removeProductFromCheckout',()=>{
    cy.get('button.btn.btn-danger[title="Remove"]').each(($btn) => {
      cy.wrap($btn).click({ force: true });
      cy.log('Produto removido do checkout.');
    });
  });

Cypress.Commands.add('selectTermsAndCondictions',()=>{
    cy.scrollTo('bottom');
    cy.get('#input-agree').check({force:true});
  });
Cypress.Commands.add('clickButtonSaveAddress',()=>{
    cy.scrollTo('bottom');
    cy.get('#button-save')
      .should('be.visible')
      .scrollIntoView()
      .click();
  
  
});

Cypress.Commands.add('goToScreenInputFirstAddress',()=>{
  cy.inputCommentsAboutOrder();
  cy.selectTermsAndCondictions();
  //cy.clickButtonSaveAddress();

});
Cypress.Commands.add('inputCommentsAboutOrder',()=>{
  const text = faker.lorem.sentence();

    // Intercepta a requisição e espera que ela seja concluída
    cy.intercept('GET', '/index.php?route=checkout/checkout/country*').as('countryRequest');
  
    // Espera pela conclusão da requisição
    cy.wait('@countryRequest');
    cy.scrollTo('bottom');

    cy.get('#input-comment')
      .should('be.visible')
      .then(($el) => {
        if ($el.is(':visible')) {
          cy.wrap($el).type(text);
        }
      });
});

Cypress.Commands.add('billingAddress',()=>{
    //const text = faker.lorem.sentence();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const word = faker.lorem.words();
  
    cy.get('#input-payment-firstname')  // Selecione o campo desejado
    .then(($campo) => {
      // Verifica se o campo existe
      if ($campo.length) {
        //cy.wait(3000);
        // Se o campo existir, preenche com o valor desejado
        cy.wrap($campo).type(firstName);
        cy.get('#input-payment-lastname').type(lastName);
        cy.get('#input-payment-company').type(word);
        cy.get('#input-payment-address-1').type(word);
        cy.get('#input-payment-address-2').type(word);
        cy.get('#input-payment-city').type(word);
        cy.get('#input-payment-postcode').type('13560470');
        cy.get('#input-payment-country').select('30');
        cy.get('#input-payment-zone').select('440');
        cy.validatePageConfirmAddress();
      
      } else {
        // Se o campo não existir, avança para o próximo passo (pode ser um clique, navegação, etc.)
        cy.clickButtonSaveAddress(); // Substitua pelo seletor correto
      }
    });
  
  
  });
  Cypress.Commands.add('validateAddress', () => {
    // Passo 1: Verificar se o campo de primeiro nome está visível
    cy.get('body').then(($body) => {
      const paymentFirstNameField = $body.find('#input-payment-firstname');
  
      // Verificar se o campo existe e está visível
      if (paymentFirstNameField.length > 0 && paymentFirstNameField.is(':visible')) {
        cy.log('Campo de primeiro nome encontrado, preenchendo o formulário...');
        cy.billingAddress();
      } else {
        // Passo 2: Caso o campo não esteja visível, clicar no radio button "existing"
        cy.log('Campo de primeiro nome não encontrado, indicando que o endereço já está salvo...');
        cy.get('#input-payment-address-existing')  
          .check({ force: true })
          .should('be.checked');
        cy.log('Endereço existente selecionado.');
      }
    });
  });
  
  Cypress.Commands.add('validatePageConfirmAddress', () => {
    // Passo 1: Tentar salvar o endereço e continuar
    cy.clickButtonSaveAddress();
  
    cy.wait(2000);
    cy.get('body').then(($body) => {
      const pageTitle = $body.find('.page-title');
  
      if (pageTitle.length > 0 && pageTitle.text().includes('Confirm Order')) {
        cy.log('Confirm order encontrado, avançando no checkout.');
      } else {
        cy.log('Erro ao avançar no checkout, recarregando a página...');
        
        cy.reload();
        cy.wait(2000);  
  
        
        cy.removeProductFromCheckout();
        cy.validMessageWarningCartEmpty();
        cy.logout();

        cy.on('window:alert', (alertText) => {
          if (alertText.includes('Warning: Payment method required!')) {
            cy.log('Erro de pagamento detectado');
            
            cy.reload();
            cy.wait(2000);  
  
            cy.removeProductFromCheckout();
            cy.validMessageWarningCartEmpty();
            cy.logout();
          }
        });
      }
    });
  });