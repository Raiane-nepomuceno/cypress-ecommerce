describe('Criar Conta', () => {
  beforeEach(() => {
    cy.visit('/');
  
  })

  it('Cadastro de novo usuário marcando o checkbox de aceite dos termos de privacidade', () => {
    cy.createAccount('checkboxTermosMarcado')
})
  it('Cadastro de novo usuário não marcando o checkbox de aceite dos termos de privacidade',() =>{
    cy.createAccount('checkboxTermosDesmarcado')
  })
  it('Cadastro vazio, validando mensagens de erro',()=>{
   cy.createAccount('todosCamposVazios');
  }) 
  it('Cadastro com e-mail já registrado',() =>{
    cy.createAccount('emailJaCadastrado');
  })
  it('Cadastro com caracteres de senha diferentes e email já cadastrado', () =>{
    cy.createAccount('senhaDiferente');
  })


})

