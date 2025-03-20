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
Cypress.Commands.add('checkSelectPDP', () => {
  cy.scrollTo('top');

  cy.get('body').then(($body) => {
    // Procurar pelo primeiro <select> com a classe "custom-select"
    const $select = $body.find('select.custom-select').first();

    if ($select.length > 0) {
      // Verificar quantas opções existem no <select>
      cy.wrap($select).find('option').then(($options) => {
        const optionsCount = $options.length;
        cy.log(`Número de opções disponíveis: ${optionsCount}`);
        
        if (optionsCount > 1) {
          // Se houver mais de uma opção, selecionar aleatoriamente uma opção visível
          cy.wrap($select).find('option')
            .filter(':visible')  // Filtra apenas as opções visíveis
            .then(($visibleOptions) => {
              const randomIndex = Math.floor(Math.random() * $visibleOptions.length);
              const randomOption = $visibleOptions[randomIndex];  // Pega a opção aleatória
              const optionValue = randomOption.value;

              cy.log('Opção selecionada: ' + optionValue);

              // Verifica se o select está habilitado e visível antes de selecionar a opção
              cy.wrap($select).should('be.visible').and('not.be.disabled');
              
              // Seleciona a opção aleatória
              cy.wrap($select).select(optionValue).should('have.value', optionValue);  // Verifica se a seleção foi bem-sucedida
              cy.clickAddToCart();

            });
        }
        else{
                    // Se não houver opções válidas ou só houver a opção padrão, registra isso
          cy.log('Produto sem variações ou com apenas a opção padrão disponível.');
          cy.log('Executando a função de adicionar um novo produto na sacola.')

          // Aqui você pode adicionar um fluxo de erro ou outras ações conforme necessário
          cy.addProductCart();

        }
      });
    }else{
      cy.log('Produto sem seletores de variação ou com problema.');
      // Adicionar o produto diretamente ao carrinho, por exemplo
      cy.clickAddToCart();

    }
  });
});
