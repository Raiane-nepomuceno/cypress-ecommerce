import {faker} from '@faker-js/faker';
Cypress.Commands.add('validCartEmpty',()=>{
    cy.clickCartHome();
    cy.validMessageCartEmpty();
})

Cypress.Commands.add('validMessageCartEmpty',()=>{
    cy.get('#entry_217847 > .m-0')
      .should('be.visible')
      .contains('Your shopping cart is empty!')

      cy.get('.table').should('contain.text', 'Sub-Total:');
      cy.get('.table').should('contain.text', 'Total:');
      cy.get('.table').should('contain.text', '$0.00');

      cy.get('#entry_217850 > .icon-right')
        .should('be.visible')
        .contains('Edit cart');
      cy.get('#entry_217851 > .icon-right')
        .should('be.visible')
        .contains('Checkout');
    })
Cypress.Commands.add('clickCheckoutCart',()=>{
    cy.get('#entry_217851 > .icon-right')
    .should('be.visible')
    .trigger('mouseover') 
    .contains('Checkout')
    .click();
})
Cypress.Commands.add('clickEditCart',()=>{
    cy.get('#entry_217850 > .icon-right')
      .should('be.visible')
      .contains('Edit cart')
      .trigger('mouseover') 
      .click();

})
Cypress.Commands.add('validMessageWarningCartEmpty',()=>{
    cy.get('#content').should('contain.text','Your shopping cart is empty!')
    cy.get('.buttons > .btn').click();

})
Cypress.Commands.add('configViewPortAddCart',()=>{
  cy.viewport(1230, 660); // Ajuste a resolução para garantir que o botão seja visível
})
Cypress.Commands.add('addProductCart', () => {
  cy.intercept('GET', '**/mz_filter/product**').as('loadProducts'); // Aguarda os produtos
  cy.filterInStock();
  cy.wait('@loadProducts'); // Aguarda a requisição antes de continuar
  
  cy.clickRandomProduct();
  cy.checkSelectPDP();
  cy.validTextCart();
  cy.clickBtnContinue();
})

Cypress.Commands.add('clickAddToCart', () => {
  // Intercepta a requisição POST para adicionar o item ao carrinho
  cy.intercept('POST', '/index.php?route=checkout/cart/add').as('addToCartRequest');

  // Ajusta a viewport, se necessário
  cy.configViewPortAddCart();
  
  // Rola até o topo da página
  cy.scrollTo('top');
  
  // Clica no produto ou botão desejado para adicionar ao carrinho
  cy.get('#entry_216842 > .text')
    .should('be.visible')
    .click();

  // Aguarda a requisição POST para adicionar ao carrinho ser concluída
  cy.wait('@addToCartRequest');
  
  // Após a requisição ser concluída, valida a exibição do toast
  cy.get('.toast-body')
    .should('be.visible')
    .contains('View Cart')
    .click();
});

Cypress.Commands.add('clickButtonCheckout',()=>{
  cy.get('.buttons.d-flex')
    .should('be.visible')
    .contains('Checkout')
    .click();
})
Cypress.Commands.add('clickButtonContinueShopping',()=>{
  cy.get('.buttons.d-flex')
    .should('be.visible')
    .contains('Continue Shopping')
    .click();
})
Cypress.Commands.add('validTextCart',()=>{
  cy.get('.page-title')
    .should('be.visible')
    .contains('Shopping Cart')
    
  cy.get('h4')
    .should('be.visible')
    .contains('What would you like to do next?')
  
});
Cypress.Commands.add('clickRadioLoginCart', () => {
  cy.scrollTo('top');

  cy.get('body').then(($body) => {
    const alerta = $body.find('#checkout-cart > .alert');

    if (alerta.length > 0) {
      // Se o alerta for encontrado, loga a mensagem
      cy.log('Encontrado o toast de aviso sobre o estoque do produto na sacola');
      cy.log('Mensagem de alerta encontrada: ' + alerta.text());
    } else {
      // Caso o alerta não seja encontrado, procura pelo campo de login
      cy.get('label[for="input-account-login"]', { timeout: 10000 }).then(($label) => {
        if ($label.length > 0) {
          cy.wrap($label).click();
          cy.log('Elemento de login encontrado e clicado');
          cy.login('cart');
          cy.goToScreenInputFirstAddress();

          
          cy.billingAddress().then(() => {
            cy.checkIfLoggedIn(); 
          
            cy.get('@isLoggedIn').then((isLoggedIn) => {
              if (isLoggedIn) {
                cy.go('back');
                cy.validatePageConfirmCheckout();
                cy.clickBtnConfirm();
                cy.validatePageConfirmOrder();
                cy.clickBtnContinue();
              } else {
                cy.log('Usuário deslogado, não continuando a execução');
              }
            });
          });
     

        } else {
          cy.log('Elemento de login não encontrado, seguindo com o teste');
        }
      });
    }
  });
});
Cypress.Commands.add('clickAddToCart', () => {
  cy.configViewPortAddCart();

  cy.intercept('GET', '/index.php?route=extension/mz_widget/total/reload*').as('reloadRequest');
  cy.wait(1000);

  cy.get('#entry_216842 > .text')
    .should('be.visible')
    .click();

  cy.wait('@reloadRequest', { timeout: 10000 }).should('exist');  // Aguarda até 10 segundos pela requisição

  cy.get('.toast-body', { timeout: 10000 })  
    .should('be.visible')  
    .contains('View Cart')  
    .click({force: true});  
});
Cypress.Commands.add('addProductCart',()=>{
  cy.filterInStock();
  cy.wait(3000);
  cy.clickRandomProduct();
  cy.checkSelectPDP();
  cy.validTextCart();

});
Cypress.Commands.add('goToScreenInputFirstAddress',()=>{
  cy.inputCommentsAboutOrder();
  cy.selectTermsAndCondictions();

});
Cypress.Commands.add('inputCommentsAboutOrder',()=>{
  const text = faker.lorem.sentence();

    cy.intercept('GET', '/index.php?route=checkout/checkout/country*').as('countryRequest');
  
    cy.wait('@countryRequest');
    cy.scrollTo('bottom');
    cy.get('#input-comment')
      .should('be.visible')
      .scrollIntoView()
      .type(text);
});
Cypress.Commands.add('clickBtnCheckout',()=>{
  cy.get('.buttons.d-flex > .btn-primary')
  .contains('Checkout')
  .should('be.visible')
  .click();
})
