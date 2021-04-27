describe('API-Testing', () => {
  const baseURL = 'http://localhost:3000/'

  it('Should show an error message on failed load', () => {
  cy.intercept({
      url:'http://localhost:3001/api/v1/orders'
    },{
      statusCode: 404,
      body: {
        "error": "This page does not exist"
      }
    })
  cy.visit(baseURL)
  cy.get('#err').should('contain', 'Our Burritos have gone rogue!')
  })

  it('Should show an error message on server error', () => {
    cy.intercept({
        url:'http://localhost:3001/api/v1/orders'
      },{
        statusCode: 500,
        body: {
          "error": "This page does not exist"
        }
      })
    cy.visit(baseURL)
    cy.get('#err').should('contain', 'Our Burritos have gone rogue!')
  })

})
