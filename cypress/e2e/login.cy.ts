Cypress.on('fail', (error, runnable) => {
    debugger

    // we now have access to the err instance
    // and the mocha runnable this failed on

    throw error // throw error to have test still fail
})

it('signup works', () => {
    cy.visit('http://localhost:8080/clear');

    cy.visit('http://localhost:8080/');
    cy.get('#title').should('have.text', 'triptix');
    cy.get('#signup')
        .should('have.text', 'Sign Up')
        .click();
    cy.get('input[type=email]')
        .should('have.attr', 'placeholder', 'Email')
        .type('felix@triptix.tech');
    cy.get('input[type=password]')
        .should('have.attr', 'placeholder', 'Password')
        .type('MySecurePassword123');
    cy.wait(2000);  // wait for turnstile
    cy.get('button[type=submit]')
        .click();

    cy.task('getLastEmail', 'felix@triptix.tech')
        .its('TextBody') // check the plain email text
        .then(cy.wrap)
        // Tip: modern browsers supports named groups
        .invoke('match', /Visit this link to activate your accout: (?<url>.*)/)
        // the confirmation code
        .its('groups.url')
        .should('be.a', 'string')
        .then((url) => {
            cy.visit(url);
            cy.get('#proceed').click();

            cy.get('#logout').click();
            cy.get('#login').click();

            cy.get('input[type=email]')
                .should('have.attr', 'placeholder', 'Email')
                .type('felix@triptix.tech');
            cy.get('input[type=password]')
                .should('have.attr', 'placeholder', 'Password')
                .type('MySecurePassword123');

            cy.wait(2000);  // wait for turnstile

            cy.get('button[type=submit]')
                .click();

            /* LOGOUT */
            cy.get('#logout').click();

            /* REQUEST PASSWORD RESET LINK */
            cy.get('#login').click();
            cy.get('#pwreset').click();
            cy.get('input[type=email]')
                .should('have.attr', 'placeholder', 'Email')
                .type('felix@triptix.tech');
            cy.wait(2000);  // wait for turnstile
            cy.get('button[type=submit]')
                .click();

            cy.task('getLastEmail', 'felix@triptix.tech')
                .its('TextBody') // check the plain email text
                .then(cy.wrap)
                // Tip: modern browsers supports named groups
                .invoke('match', /Click on the following link to reset your password: (?<url>.*)/)
                // the confirmation code
                .its('groups.url')
                .should('be.a', 'string')
                .then((url) => {
                    /* RESET PASSWORD */
                    cy.visit(url);

                    cy.get('input[type=password]')
                        .should('have.attr', 'placeholder', 'Password')
                        .type('MySecurePassword1234');
                    cy.wait(2000);  // wait for turnstile
                    cy.get('button[type=submit]')
                        .click();

                    cy.contains('Password reset successful. Welcome!');

                    /* LOGOUT */
                    cy.get('#logout').click();

                    /* LOGIN WITH NEW PASSWORD */
                    cy.get('#login').click();

                    cy.get('input[type=email]')
                        .should('have.attr', 'placeholder', 'Email')
                        .type('felix@triptix.tech');
                    cy.get('input[type=password]')
                        .should('have.attr', 'placeholder', 'Password')
                        .type('MySecurePassword1234');

                    cy.wait(2000);  // wait for turnstile

                    cy.get('button[type=submit]')
                        .click();
                });
        })
});