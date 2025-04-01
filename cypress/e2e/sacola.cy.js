describe('Login', () => {
    beforeEach(() => {
        cy.visit('/'); 
    })
    Cypress._.times(2, () =>{

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
    it.only('Deslogado, adicionando produto no carrinho, logando, fechando pedido',()=>{
        cy.addProductCart();
        cy.clickButtonCheckout();
        cy.clickRadioLoginCart();
        //tratar quando por algum motivo foi adicionado produto sem estoque
        cy.logout();


    })
    it('Logado, adicionando e editando produto no carrinho', () =>{
        
    })
})
})
