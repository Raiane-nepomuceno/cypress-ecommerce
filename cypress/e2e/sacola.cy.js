describe('Sacola', () => {
    beforeEach(() => {
        cy.visit('/'); 
    })
    
    it('Deslogado, editando sacola vazia no primeiro acesso ao carrinho',() =>{
        cy.validCartEmpty();
        cy.clickEditCart();
        cy.validMessageWarningCartEmpty();
    })
    it('Deslogado, acessando o checkout',() =>{
        cy.validCartEmpty();
        cy.clickCheckoutCart();
        cy.validMessageWarningCartEmpty();

    })
    it('Deslogado, adicionando produto no carrinho, logando, fechando pedido',()=>{
        cy.addProductCart();
        cy.clickButtonCheckout();
        cy.clickRadioLoginCart();
        cy.logout();

    })
})