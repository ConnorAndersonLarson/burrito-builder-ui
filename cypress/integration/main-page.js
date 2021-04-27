describe('Main-Page Testing', () => {
  const baseURL = 'http://localhost:3000/'

  beforeEach(() => {
    cy.fixture('orders.json')
      .then(orders => {
        cy.intercept('http://localhost:3001/api/v1/orders', {
          body: orders
        })
      });
    cy.visit(baseURL);
  });
  it('Should display site name', () => {
    cy.get('h1').should('contain', 'Burrito Builder')
  })
  it('Should display orders on the page', () => {
    cy.get('.order').should('have.length', 5)
      .get('.order').eq(0).should('contain', 'Pat')
      .get('.order').eq(2).should('contain', 'Alex')
      .get('.order').eq(4).should('contain', 'connor')
  })
  it('Should show ingredients for orders', () => {
    cy.get('.order').eq(0).should('contain', 'queso fresco')
      .get('.order').eq(0).should('not.contain', 'steak')
      .get('.order').eq(1).should('contain', 'pico de gallo')
      .get('.order').eq(3).should('contain', 'cilantro')
  })
  it('Should have a name input and ingredient options', () => {
    cy.get('[type=text]').should('exist')
    cy.get('form').get('button').should('have.length', 13)
      .get('[name=beans]').should('exist')
      .get('[name=steak]').should('exist')
      .get('[name=carnitas]').should('exist')
      .get('[name=sofritas]').should('exist')
      .get('[name=lettuce]').should('exist')
      .get('[name="queso fresco"]').should('exist')
      .get('[name="pico de gallo"]').should('exist')
      .get('[name="hot sauce"]').should('exist')
      .get('[name=guacamole]').should('exist')
      .get('[name=jalapenos]').should('exist')
      .get('[name=cilantro]').should('exist')
      .get('[name="sour cream"]').should('exist')
  })
  it('Should show selected ingredients', () => {
    cy.get('[name=beans]').click()
      .get('[name=sofritas]').click()
      .get('[name="sour cream"]').click()
      .get('#userIng').should('contain', 'beans').should('contain', 'sour cream')
  })

})
