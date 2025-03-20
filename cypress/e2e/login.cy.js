describe('Login', () => {
    beforeEach(() => {
        cy.visit('/'); 
    })
    Cypress._.times(3, () =>{

    it('Realizando login com dados válidos',() =>{
        cy.login('home');
    })
    it('Realizando logout',()=>{
        cy.login('home');
        cy.logout();
    })
    it('Esqueci minha senha',()=>{
        cy.forgottenPassword();
    })
    it('Alterando a senha ao estar logado', () =>{
        cy.forgottenPasswordLogged();
    })
    

})
})

//fazer o cenario de quando tenta realizar o cadastro de usuario ja existente e logo em seguida fazer o login

