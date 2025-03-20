describe('Login', () => {
    beforeEach(() => {
        cy.visit('/'); 
    })
    Cypress._.times(6, () =>{

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
    it.only('Deslogado, adicionando produto no carrinho e logando na sequência',()=>{
        cy.addProductCart();
        cy.clickButtonCheckout();
        cy.clickRadioLoginCart();
        cy.login('cart');//tratar quando por algum motivo foi adicionado produto sem estoque
        cy.goToScreenInputFirstAddress();
        cy.billingAddress();
        cy.validatePageConfirmCheckout();
        cy.clickBtnConfirm();
        cy.validatePageConfirmOrder();
        cy.clickBtnContinue();
        cy.logout();

    })
    it('Logado, adicionando e editando produto no carrinho', () =>{
        
    })
})
})
