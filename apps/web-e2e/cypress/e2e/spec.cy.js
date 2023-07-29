describe('template spec', () => {
  const baseUrl = Cypress.env('baseUrl')
  it('passes', () => {
    cy.visit(baseUrl)
  })
})
