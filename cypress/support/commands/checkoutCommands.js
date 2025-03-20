Cypress.Commands.add('validatePageConfirmCheckout',()=>{
    cy.get('.page-title')
      .should('be.visible')
      .contains('Confirm Order')

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