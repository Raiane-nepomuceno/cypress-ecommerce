describe('Login', () => {
    beforeEach(() => {
        cy.visit('/'); 
    })

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

