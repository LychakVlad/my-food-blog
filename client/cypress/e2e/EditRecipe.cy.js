describe('Edit recipe component usage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('[data-cy="auth-email"]').click().type('testing-user@gmail.com');
    cy.get('[data-cy="auth-password"]').click().type('123456');

    cy.get('form').submit();

    cy.get('h1').should('contain', "Cook's Compas");
  });

  afterEach(() => {
    cy.get('[data-cy="profile-btn"]').click();

    cy.wait(1000);

    cy.get('[data-cy="delete-recipe-btn-Test recipe Change"]')
      .should('exist')
      .click();

    cy.on('window:confirm', () => true);

    cy.get('[data-cy="logout-btn"]').should('exist').click();
  });

  it('should edit recipe and display right title ', () => {
    cy.get('[data-cy="link-to-create-recipe"]').should('exist').click();

    cy.get('h1').should('contain', 'Create Post');

    cy.get('[data-cy="title-input"]').click().type('Test recipe');
    cy.get('[data-cy="description-input"]')
      .click()
      .type('Test recipe description');
    cy.get('[data-cy="tag-input"]').click().type('Test tag');

    cy.get('[data-cy="submit-form-btn"]').click();

    cy.get('h1').should('contain', "Cook's Compas");

    cy.get('[data-cy="test-recipe-card-Test recipe"]').should('exist');

    cy.get('[data-cy="profile-btn"]').click();

    cy.get('[data-cy="edit-recipe-btn-Test recipe"]').should('exist').click();

    cy.get('[data-cy="title-input"]').click().type(' Change');

    cy.get('[data-cy="submit-form-btn"]').click();

    cy.get('[data-cy="back-to-home-btn"]').click();

    cy.wait(1000);

    cy.get('p').should('contain', 'Test recipe Change');
  });
});
