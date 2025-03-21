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
Cypress.Commands.add('addProductCart',()=>{
    cy.filterInStock();
    cy.wait(3000);
    cy.clickRandomProduct();
    //cy.clickAddToCart();
    cy.checkSelectPDP();
    cy.validTextCart();

});
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

  // Aumentar o timeout e garantir que o alerta seja visível
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
          cy.billingAddress();
          cy.validatePageConfirmCheckout();
          cy.clickBtnConfirm();
          cy.validatePageConfirmOrder();
          cy.clickBtnContinue();  
        } else {
          cy.log('Elemento de login não encontrado, seguindo com o teste');
        }
      });
    }
  });
});
Cypress.Commands.add('clickAddToCart', () => {
  cy.configViewPortAddCart();  // Suponho que este comando tenha configurado o tamanho da tela

  // Intercepta a requisição XHR antes de qualquer ação
  cy.intercept('GET', '/index.php?route=extension/mz_widget/total/reload*').as('reloadRequest');
  // cy.wait('@reloadRequest').then((interception) => {
  //   console.log(interception);  // Exibe os detalhes da requisição no console
  // });
  // Espera um tempo suficiente para garantir que tudo esteja carregado antes de clicar
  cy.wait(1000); // Ajuste o tempo se necessário

  // Interage com o botão "Add to Cart"
  cy.get('#entry_216842 > .text')
    .should('be.visible')
    .click();

  // Espera pela requisição XHR ser disparada
  cy.wait('@reloadRequest', { timeout: 10000 }).should('exist');  // Aguarda até 10 segundos pela requisição

  // Agora, espera o toast aparecer e interage com ele
  cy.get('.toast-body', { timeout: 10000 })  // Aguarda até 10 segundos pelo toast
    .should('be.visible')  // Verifica se o toast está visível
    .contains('View Cart')  // Verifica se o texto "View Cart" está presente
    .click();  // Clica no toast
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
      .scrollIntoView()
      .type(text);
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
Cypress.Commands.add('validatePageConfirmAddress',()=>{
  // Intercepta a requisição POST para salvar o endereço
  cy.intercept('POST', '/index.php?route=extension/maza/checkout/save').as('saveAddressRequest');
  
  // Intercepta a requisição GET para a página de confirmação
  cy.intercept('GET', '/index.php?route=extension/maza/checkout/confirm').as('checkoutConfirm');
    // Clica no botão que dispara a navegação (salvar endereço)
  cy.clickButtonSaveAddress();

  cy.wait('@checkoutConfirm', { timeout: 15000 }).then((interception) => {
    // Verifica se a resposta foi HTML (indicando erro no servidor)
    if (interception.response.body.includes('<html>')) {
      cy.log('Resposta inesperada (HTML) recebida: ' + interception.response.body);
      
      // Se a resposta contiver o erro de "Método de pagamento necessário"
      if (interception.response.body.includes("Warning: Payment method required!")) {  
        cy.log('Erro de pagamento detectado. Repreenchendo os campos...');
        
        // Preenche novamente os campos de país e região/estado
        cy.billingAddress();

        // Clica no botão de continuar para submeter novamente
        cy.get('#button-continue').should('be.visible').click({ force: true });
        cy.log('Campos de país e região/estado preenchidos novamente e continuando...');
        
        // Tenta novamente esperar pela requisição de confirmação após preencher os campos
        cy.wait('@checkoutConfirm', { timeout: 15000 }).then((finalInterception) => {
          if (finalInterception.response.statusCode === 200) {
            cy.log('Requisição de confirmação realizada com sucesso após preencher os campos de pagamento');
          } else {
            cy.log('Erro na requisição de confirmação após preencher os campos de pagamento. Status Code:', finalInterception.response.statusCode);
            assert.fail('Falha na requisição de confirmação após corrigir erro de pagamento');
          }
        });
      } else {
        assert.fail('Esperado JSON, mas a resposta foi HTML, indicando erro no servidor');
      }
    } else {
      // Caso a requisição de confirmação tenha retornado o esperado
      cy.log('Requisição de confirmação realizada com sucesso');
    }
  });
})