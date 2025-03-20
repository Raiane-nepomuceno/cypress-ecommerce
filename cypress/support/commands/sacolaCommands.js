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

  // Aqui você pode esperar por um pedido de rede que indique que o produto foi adicionado, se necessário
  cy.wait(2000); // Espere um tempo específico ou use interceptação de rede para aguardar

  // Agora tenta buscar o label
  cy.get('label[for="input-account-login"]', { timeout: 5000 })
    .then(($label) => {
      if ($label.length > 0) {
        cy.wrap($label).click();
        cy.log('Elemento encontrado e clicado');
      } else {
        cy.log('Elemento não encontrado, seguindo com o teste');
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
})
Cypress.Commands.add('selectTermsAndCondictions',()=>{
  cy.scrollTo('bottom');
  cy.get('#input-agree').check({force:true});
})
Cypress.Commands.add('clickButtonSaveAddress',()=>{
  cy.scrollTo('bottom');
  cy.get('#button-save')
    .should('be.visible')
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
      //cy.clickButtonSaveAddress();
      cy.validatePageConfirmAddress();
    
    } else {
      // Se o campo não existir, avança para o próximo passo (pode ser um clique, navegação, etc.)
      cy.clickButtonSaveAddress(); // Substitua pelo seletor correto
    }
  });


})
Cypress.Commands.add('validatePageConfirmAddress', () => {
  // Intercepta a requisição POST para salvar o endereço
  cy.intercept('POST', '/index.php?route=extension/maza/checkout/save').as('saveAddressRequest');
  
  // Intercepta a requisição GET para a página de confirmação
  cy.intercept('GET', '/index.php?route=extension/maza/checkout/confirm').as('checkoutConfirm');
  
  // Clica no botão que dispara a navegação (salvar endereço)
  cy.get('#button-save').should('be.visible').click({ force: true });

  // Espera a requisição POST para salvar o endereço ser concluída
  cy.wait('@saveAddressRequest').then((interception) => {
    // Verifica se a requisição POST foi bem-sucedida
    if (interception.response.statusCode === 200) {
      console.log('Requisição de endereço salva com sucesso!');
    } else {
      cy.log('Erro ao salvar o endereço. Status Code:', interception.response.statusCode);
      assert.fail('Falha ao salvar o endereço no checkout');
    }
  });

  // Espera pela requisição GET de confirmação ser concluída
  cy.wait('@checkoutConfirm', { timeout: 10000 }).then((interception) => {
    // Verifica se a resposta foi HTML (indicando erro no servidor)
    if (interception.response.body.includes('<html>')) {
      cy.log('Resposta inesperada (HTML) recebida: ' + interception.response.body);
      assert.fail('Esperado JSON, mas a resposta foi HTML, o que indica erro no servidor');
    }

    // Verifica se a requisição GET de confirmação foi bem-sucedida (status 200)
    if (interception.response.statusCode === 200) {
      console.log('Requisição de confirmação realizada com sucesso');
    } else {
      cy.log('Erro na requisição de confirmação. Status Code:', interception.response.statusCode);
      assert.fail('Requisição de confirmação falhou');
    }
  });

  // Pode-se usar cy.on('fail', ...) para capturar erros globais se necessário
  cy.on('fail', (error, runnable) => {
    cy.log('Erro inesperado:', error.message);
    // Aqui você pode personalizar o comportamento de falha
    throw error; // Re-throw para garantir que o teste falhe
  });
});
