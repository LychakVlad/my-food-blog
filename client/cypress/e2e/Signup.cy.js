describe('Signup Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/sign-up');
  });

  const randomEmail = `test-${Math.floor(Math.random() * 100000)}@example.com`;

  it('should display the login form', () => {
    cy.get('form').should('exist');
    cy.get('form').should('contain', 'Email');
    cy.get('form').should('contain', 'Password');
    cy.get('form').should('contain', 'Name');
    cy.get('form').should('contain', 'Sign up');
  });

  it('should have a link to the signup page', () => {
    cy.get('[data-cy="link-to-login-page"]').should('exist');
    cy.get('[data-cy="link-to-login-page"]').should(
      'have.attr',
      'href',
      '/login'
    );
  });

  it('should show an error message on when inputs empty', () => {
    cy.get('form').submit();
    cy.get('p').should('contain', 'Email address field is required');
    cy.get('p').should('contain', 'Name field is required');
    cy.get('p').should('contain', 'Password field is required');
  });

  it('should sign up new user and redirect to new page', () => {
    cy.get('[data-cy="auth-email"]').click().type(randomEmail);
    cy.get('[data-cy="auth-name"]').click().type('Test User');
    cy.get('[data-cy="auth-password"]').click().type('123456');

    cy.get('form').submit();

    cy.get('form').should('contain', 'Log in');
  });
});
