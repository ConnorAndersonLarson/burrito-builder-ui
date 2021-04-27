describe('User-Flow Testing', () => {
  const baseURL = 'http://localhost:3000/'

  beforeEach(() => {
    cy.fixture('orders.json')
      .then(orders => {
        cy.intercept('http://localhost:3001/api/v1/orders', {
          body: orders
        })
      });
  });

  it('Should be able to create a new order', () => {
    cy.visit(baseURL);
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/orders'
    },
    {
      statusCode: 201,
      body: {id: 6, name: "Reginald", ingredients: ["beans", "steak", "guacamole"]}
    })
    cy.get('[type=text]').type('Reginald')
      .get('[name=beans]').click()
      .get('[name=steak]').click()
      .get('[name=guacamole]').click()
      .get('#submitOrder').click()
      .get('.order').should('have.length', 6)
      .get('.order').eq(5).should('contain', 'Reginald')
  })
})
