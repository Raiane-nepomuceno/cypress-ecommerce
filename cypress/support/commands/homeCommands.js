import {faker} from '@faker-js/faker';

Cypress.Commands.add('searchCategoriesInHome',() =>{
    cy.clickAllCategoriesHome();
    cy.clickRandomCategory();
});

Cypress.Commands.add('clickAllCategoriesHome', () => {
    cy.contains('.search-input-group > .search-input > .dropdown > .btn', 'All Categories').click();

});

Cypress.Commands.add('clickRandomCategory', () => {
  cy.log('Acessando a função clickRandomCategory');
    // Coleta as categorias da página
    cy.get('.dropdown-menu.dropdown-menu-left.show > .dropdown-item').then(($categories) => {
      const categories = [];
  
      // Itera sobre os itens e coleta o texto
      $categories.each((index, category) => {
        const categoryText = category.innerText.trim();
        
        // Adiciona a categoria ao array, se não for vazia
        if (categoryText) {
          categories.push(categoryText);
        }
      });
  
      // Escolhe uma categoria aleatória
      const randomIndex = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[randomIndex];
  
      // Log para ver qual categoria foi escolhida
      cy.log('Categoria aleatória: ' + randomCategory);
  
      // Clica na categoria aleatória
      cy.contains('.dropdown-item', randomCategory).click();
  
      // Após o clique, chama o comando de pesquisa
      cy.clickSearch();
    });
  });
  
  Cypress.Commands.add('clickSearch', () => {
    cy.scrollTo('top');
    
    // Clica na opção de pesquisa (ajuste conforme necessário)
    cy.contains('.type-text', 'Search')
      .should('be.visible')
      .click();
  });

  Cypress.Commands.add('clickFilterProduct', () => {
    cy.wait(2000);

    cy.log('acessndo a função clickFilterProduct');
    // Faz o scroll para o topo da página
    cy.scrollTo('top');
  
    // Mostra o elemento (se estiver oculto) e então clica
    cy.get('#entry_212462 > .icon-left')
       .scrollIntoView()
       .should('be.visible')
       .click({force: true});
  });
  Cypress.Commands.add('closeModalFilter',() =>{
   cy.get('#entry_212478 > .icon-left > .icon')
    .scrollIntoView()
    .should('be.visible')
    .click();

})
Cypress.Commands.add('clickRandomProduct', () => {
  // Primeiro, verifique se há a mensagem de "nenhum produto encontrado"
  cy.get('body').then(($body) => {
    if ($body.text().includes('There is no product that matches the search criteria.')) {
      // Se a mensagem aparecer, adiciona novo filtro e tenta novamente
      cy.log('Nenhum produto encontrado. Tentando adicionar novo filtro...');
      
      // Ação para aplicar o filtro
      cy.filterInStock();
      

      // Espera os produtos aparecerem após o filtro ser aplicado
      cy.get('.carousel-item', { timeout: 10000 }) // Espera até 10 segundos
        .filter(':visible') // Filtra os itens visíveis
        .should('have.length.greaterThan', 0) // Verifica se há produtos visíveis
        .then(($items) => {
          // Gera um índice aleatório com base no número de itens visíveis
          const randomIndex = Math.floor(Math.random() * $items.length);
          cy.log('RandomIndex:', randomIndex);

          // Clica no item aleatório
          cy.wrap($items[randomIndex])
            .trigger('mouseover') 
            .click();
        });
    } else {
      // Caso a mensagem não apareça, verifica os itens do carrossel
      cy.get('.carousel-item', { timeout: 10000 }) // Espera até 10 segundos
        .filter(':visible') // Filtra os itens visíveis
        .should('have.length.greaterThan', 0) // Verifica se há produtos visíveis
        .then(($items) => {
          // Gera um índice aleatório com base no número de itens visíveis
          const randomIndex = Math.floor(Math.random() * $items.length);
          cy.log('RandomIndex:', randomIndex);

          // Clica no item aleatório
          cy.wrap($items[randomIndex])
          .find('img') // Encontra a imagem dentro do item
          .trigger('mouseover') // Passa o mouse sobre a imagem]
          .click();
        });
    }
  });
});
Cypress.Commands.add('randomPrice',() =>{

    const minLimit = 200;      // Defina o valor mínimo desejado
    const maxLimit = 1000;    // Defina o valor máximo desejado

    // Gera o valor aleatório para o preço mínimo
    const min = faker.number.int({ min: 100, max: 950 });
    // Gera o valor aleatório para o preço máximo
    const max = faker.number.int({ min: min, max: maxLimit });

    // Seleciona e garante que o campo de preço mínimo está visível e disponível para interação
    cy.get('#mz-filter-panel-1-0 > .mz-filter-group-content > .d-flex > [name="mz_fp[min]"]')
    .should('be.visible')
      .clear()
      .type(min.toString());

    // Seleciona e garante que o campo de preço máximo está visível e disponível para interação
    cy.get('#mz-filter-panel-1-0 > .mz-filter-group-content > .d-flex > [name="mz_fp[max]"]') 
      .should('be.visible')
      .clear()
      .type(max.toString());

    cy.get('#mz-filter-panel-1-0 > .mz-filter-group-content').click();  


  })                
  Cypress.Commands.add('filterPrice', () => {
    cy.searchCategoriesInHome();

    cy.clickFilterProduct();
    
    cy.randomPrice();

    cy.closeModalFilter();

    cy.clickRandomProduct();

        
  
});
Cypress.Commands.add('filterCheckboxFilter',(seletor1,seletor2,scroll)=>{
  cy.wait(2000);
  if(scroll==true){
    cy.get('#entry_212474')
    .scrollTo(0, 600);

  }else{
    cy.get('#entry_212474')
    .scrollTo(0, 300);
  }
  cy.get(seletor1)
    .should('be.visible')
    .click();
    cy.get(seletor2)  // Seletor do contêiner
      .find('input[type="checkbox"]')  // Encontra todos os checkboxes
      .then(($checkboxes) => {
        // Gera um índice aleatório com base no número de checkboxes encontrados
        const randomIndex = Math.floor(Math.random() * $checkboxes.length);
  
        // Marca o checkbox aleatório
        cy.wrap($checkboxes[randomIndex]).check( {force: true} )  // Marca o checkbox
         .should('be.checked')
      });
  });
  
  Cypress.Commands.add('validateOptionFilter',(seletor1,seletor2)=>{
    cy.get(seletor1)  
    .click();
    cy.get(seletor2)  
     .then(($cores) => {
      // Gera um índice aleatório com base no número de cores encontrados
      const randomIndex = Math.floor(Math.random() * $cores.length);
      
      cy.wrap($cores[randomIndex]).click( {force: true} )  // Marca o checkbox
    });

  })


  Cypress.Commands.add('orderByFilter',(seletor1)=>{
    cy.get(seletor1)
    .should('be.visible')
    .children('option')
    .then(options => {
      const randomOption = options[Math.floor(Math.random() * options.length)].value; // Pega o valor da opção
      cy.log(randomOption)
      cy.get(seletor1).select(randomOption); // Seleciona a opção aleatória
      
    });
  
  })

  Cypress.Commands.add('filterManufacturer',()=>{
    
      cy.searchCategoriesInHome();
      cy.clickFilterProduct();
      cy.filterCheckboxFilter('#mz-filter-panel-1-1 > .mz-filter-group-content > .mz-see-more','#mz-filter-panel-1-1 > .mz-filter-group-content');
      cy.closeModalFilter();
      //cy.clickRandomProduct();


  })
 
  Cypress.Commands.add('filterColor',()=>{
    cy.searchCategoriesInHome();
    cy.clickFilterProduct();
    cy.validateOptionFilter('#mz-filter-panel-1-3 > .mz-filter-group-content','.mz-filter-value.image.default')
    cy.closeModalFilter();
    //cy.clickRandomProduct();

  })
  Cypress.Commands.add('filterSize',()=>{

    cy.searchCategoriesInHome();
    cy.clickFilterProduct();
    cy.get('#mz-filter-panel-1-5 > .mz-filter-group-content')
    cy.validateOptionFilter('#mz-filter-panel-1-5 > .mz-filter-group-content', '.custom-control.custom-checkbox',true);

    cy.closeModalFilter();
    //cy.clickRandomProduct();


  })
  Cypress.Commands.add('filterAvailability',()=>{
    cy.searchCategoriesInHome();
    cy.clickFilterProduct();
    cy.filterCheckboxFilter('#mz-filter-panel-1-4 > .mz-filter-group-content','.custom-control.custom-checkbox',true);
    cy.closeModalFilter();
    //cy.clickRandomProduct();


  })

  Cypress.Commands.add('sortByProducts',()=>{
    cy.searchCategoriesInHome();
    //cy.get('#input-sort-212464').should('be.visible').select('Best sellers');
    cy.orderByFilter('#input-sort-212464');
    //cy.clickRandomProduct();


  })
  Cypress.Commands.add('showProducts',()=>{
    cy.searchCategoriesInHome();
    cy.orderByFilter('#input-limit-212463');
    //cy.clickRandomProduct();

  })
  Cypress.Commands.add('filterStock',()=>{
    
    cy.get('#entry_212474', { timeout: 10000 })
      .should('be.visible')
      .and('have.css', 'opacity', '1') // Garantir que a opacidade seja 1 (visível)
        //cy.get('#entry_212474', { timeout: 10000 })
      .scrollTo(0, 600)
      
      cy.contains('label.custom-control-label', 'In stock')  
        .prev('input[type="checkbox"]') 
        .check({ force: true }) 
        .should('be.checked');
                          
      
    });
    
  Cypress.Commands.add('filterInStock',()=>{
    cy.searchCategoriesInHome();
    cy.clickFilterProduct();
    cy.filterStock();
    cy.closeModalFilter();

  })
  Cypress.Commands.add('clickCartHome',()=>{
    cy.get('a[href="#cart-total-drawer"]')
        .filter(':visible') 
        .click()
})

  
  