describe('Home', () => {
    beforeEach(() => {
      cy.visit('/'); 
})
    Cypress._.times(1, () =>{
        it('filtrando produtos da categoria pelo preço',() =>{
        //cy.login();
        //cy.searchCategoriesInHome();
        cy.filterPrice();
        
    })
    it('filtrando produtos da categoria pela marca ',()=>{
      //cy.login();
      //cy.searchCategoriesInHome();
      cy.filterManufacturer();

    })
    it('filtrando produtos da categoria pela cor', ()=>{
      cy.filterColor();
    })
    it('filtrando produtos da categoria pelo tamanho',()=>{
      cy.filterSize();
    })

    it('filtrando produtos da categoria pela disponibilidade',()=>{
      cy.filterAvailability();
    })
    it.only('filtrando os produtos da busca de categoria pelo sort-by',()=>{
      cy.sortByProducts();
    })
    it('filtrando os produtos da busca de categoria pelo filtro show',()=>{
      cy.showProducts();
    })
    
})

})

