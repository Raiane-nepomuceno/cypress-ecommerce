import {faker} from '@faker-js/faker';

Cypress.Commands.add('searchCategoriesInHome',() =>{
    cy.clickAllCategoriesHome();
    cy.clickRandomCategory();
});

Cypress.Commands.add('clickAllCategoriesHome', () => {
    cy.get('.btn.dropdown-toggle')
      .filter(':visible')
      .click();

});

Cypress.Commands.add('clickRandomCategory', () => {
  cy.scrollTo('top');
  cy.log('Acessando a função clickRandomCategory');
    cy.get('.dropdown-menu.dropdown-menu-left.show > .dropdown-item').then(($categories) => {
      const categories = [];
  
      $categories.each((index, category) => {
        const categoryText = category.innerText.trim();
        
        if (categoryText) {
          categories.push(categoryText);
        }
      });
  
      const randomIndex = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[randomIndex];
  
      cy.log('Categoria aleatória: ' + randomCategory);
  
      cy.contains('.dropdown-item', randomCategory).click();
  
      cy.clickSearch();
    });
  });
  
  Cypress.Commands.add('clickSearch', () => {
    cy.scrollTo('top');
    
    cy.contains('.type-text', 'Search')
      .should('be.visible')
      .click();
  });
  
  Cypress.Commands.add('clickFilterProduct', () => {
      cy.wait(1000);
      cy.log('Acessando a função clickFilterProduct');
      cy.scrollTo('top');
    
      cy.get('#entry_212462 > .icon-left').then(($icon) => {
        if ($icon.is(':visible')) {
          cy.wrap($icon).click({ force: true });
          cy.log('Ícone de filtro clicado');
        } else {
          cy.log('Ícone de filtro não visível');
        }
      });
    });
  Cypress.Commands.add('moveCenterPage',()=>{
    cy.scrollTo('center') 
 })
  Cypress.Commands.add('closeModalFilter',() =>{
  
    cy.get('#entry_212478 > .icon-left > .icon', { timeout: 10000 })  // Aumenta o tempo de espera para 10 segundos
    .then(($icon) => {
      // Verifica se o ícone existe
      if ($icon.length > 0) {
        // Verifica se o ícone está visível
        cy.wrap($icon)
          .scrollIntoView()  // Tenta rolar o ícone até a área visível
          .should('be.visible')  // Espera o ícone ser visível
          .click();  // Clica no ícone
        cy.log('Ícone x clicado');
      } else {
        // Caso o ícone não tenha sido encontrado
        cy.log('Ícone não encontrado');
      }
    });
        

})
Cypress.Commands.add('clickRandomProduct', () => {
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
            .trigger('mouseover',{force: true}) 
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
    cy.get('[name="mz_fp[min]"]')
      .filter(":visible")
      .scrollIntoView()
      .should('be.visible')
      .clear()
      .type(min.toString());

    // Seleciona e garante que o campo de preço máximo está visível e disponível para interação
    cy.get('[name="mz_fp[max]"]')
      .filter(":visible")
      .scrollIntoView()
      .should('be.visible')
      .clear()
      .type(max.toString());

      cy.get('#entry_212455')
       .should('be.visible')
       .click();  


  })                
  Cypress.Commands.add('filterPrice', () => {
    cy.searchCategoriesInHome();

    cy.clickFilterProduct();
    
    cy.randomPrice();

    cy.wait(1500);

    cy.clickRandomProduct();

        
  
});
Cypress.Commands.add('clickSeeMore',(seletor1)=>{
  cy.get(seletor1)
  .filter(':visible')
  .should('be.visible')
  .click();

})
Cypress.Commands.add('randomCheckbox',(seletor2,scroll)=>{
  //cy.wait(2000);
  if(scroll==true){
    cy.get('#entry_212474')
    .scrollTo(0, 600);

  }else{
    cy.get('#entry_212474')
    .scrollTo(0, 300);
  }

  cy.get(seletor2, { timeout: 10000 })  // Aumenta o timeout para garantir que o elemento foi carregado
  .filter(':visible')  // Filtra apenas os elementos visíveis
  .should('have.length.greaterThan', 0)  // Verifica se existem checkboxes

  .then(($checkboxes) => {
    const randomIndex = Math.floor(Math.random() * $checkboxes.length);  // Gera um índice aleatório

    cy.log(`Índice aleatório: ${randomIndex}`);  // Loga o índice aleatório para depuração

    const checkbox = $checkboxes[randomIndex];  // Pega o checkbox aleatório

    // Agora encontra o input[type="checkbox"] dentro da div e pega o valor
    cy.wrap(checkbox)  // Envolve o checkbox com Cypress
      .find('input[type="checkbox"]')  // Encontra o input do tipo checkbox dentro da div
      .then((checkboxInput) => {
        // Pega o valor do checkbox (valor atribuído ao atributo 'value' do input)
        const checkboxValue = checkboxInput.val();
        cy.log(`Valor do checkbox: ${checkboxValue}`);  // Loga o valor do checkbox no console

        // Agora que encontramos o input, chamamos o check() nele
        cy.wrap(checkboxInput)  // Envolve o input para realizar a interação
          .check({ force: true })  // Marca o checkbox
          .should('be.checked')  // Verifica se o checkbox foi marcado
          .trigger('mouseover', { force: true });  // Aciona o evento de mouseover com force
      });
  });
});  
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
      cy.clickSeeMore('.mz-see-more.btn-link');
      cy.randomCheckbox('.mz-filter-group-content.more > .mz-filter-value.both > .custom-control.custom-checkbox', true);

  })
 
  Cypress.Commands.add('filterColor',()=>{
    cy.searchCategoriesInHome();
    cy.clickFilterProduct();
    cy.randomCheckbox('.mz-filter-group-content.more > .mz-filter-value.image.default > .custom-control.custom-checkbox')

  })

  Cypress.Commands.add('filterAvailability',()=>{
    cy.searchCategoriesInHome();
    cy.clickFilterProduct();
    cy.moveCenterPage();
    cy.randomCheckbox('#mz-filter-panel-0-4 > .mz-filter-group-content > .mz-filter-value > .custom-control.custom-checkbox',true);

  })
  Cypress.Commands.add('filterSize',()=>{

    cy.searchCategoriesInHome();
    cy.clickFilterProduct();
    cy.randomCheckbox('#mz-filter-panel-0-5 > .mz-filter-group-content.more > .mz-filter-value.text.button >.custom-control.custom-checkbox',true);

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
    cy.moveCenterPage();
    cy.wait(1000);

      cy.get('#mz-filter-panel-0-4 > .mz-filter-group-content > .mz-filter-value > .custom-control.custom-checkbox')
        .contains('label.custom-control-label', 'In stock')  
        .prev('input[type="checkbox"]') 
        .check({ force: true }) 
        .should('be.checked');                
      
    });
    
  Cypress.Commands.add('filterInStock',()=>{
    cy.searchCategoriesInHome();
    cy.clickFilterProduct();
    cy.filterStock();
    //cy.closeModalFilter();

  })
  Cypress.Commands.add('clickCartHome',()=>{
    cy.get('a[href="#cart-total-drawer"]')
        .filter(':visible') 
        .click()
});
  
  