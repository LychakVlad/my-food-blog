describe('Login Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display the login form', () => {
    cy.get('form').should('exist');
    cy.get('form').should('contain', 'Email');
    cy.get('form').should('contain', 'Password');
    cy.get('form').should('contain', 'Log in');
  });

  it('should have a link to the signup page', () => {
    cy.get('[data-cy="link-to-signup-page"]').should('exist');
    cy.get('[data-cy="link-to-signup-page"]').should(
      'have.attr',
      'href',
      '/sign-up'
    );
  });

  it('should show an error message on failed login attempt', () => {
    cy.get('form').submit();
    cy.get('p').should('contain', 'Email address field is required');
  });

  it('should display an error when wrong credentials', () => {
    cy.get('[data-cy="auth-email"]').click().type('wrong@gmail.com');
    cy.get('[data-cy="auth-password"]').click().type('123456');

    cy.get('form').submit();

    cy.get('p').should('contain', 'Wrong credentials.');
  });

  it('should display an error when wrong credentials', () => {
    cy.get('[data-cy="auth-email"]').click().type('testing-user@gmail.com');
    cy.get('[data-cy="auth-password"]').click().type('123456');

    cy.get('form').submit();

    cy.get('h1').should('contain', "Cook's Compas");
  });
});
