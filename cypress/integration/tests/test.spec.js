/// <reference types="cypress"/>
describe('Calendar App', () => {

  const baseURL = "http://localhost:8080";
  
  beforeEach(() => {
    cy.visit(baseURL);
  });

  it('adding events and validating events ',()=>{
    //adding past event
    cy.get('.btn').first().click()
    cy.get(':nth-child(5) > .rbc-row-bg > :nth-child(3)').click()
    cy.get('[placeholder="Event Title"]').type('Past Event')
    cy.get('[placeholder="Event Location"]').type('Delhi')
    cy.get('.mm-popup__box__footer__right-space > .mm-popup__btn').click()

    //Adding upcoming event
    cy.get('.btn').eq(1).click().click()
    cy.get(':nth-child(4) > .rbc-row-bg > :nth-child(5)').click()
    cy.get('[placeholder="Event Title"]').type('Upcoming Event')
    cy.get('[placeholder="Event Location"]').type('New York')
    cy.get('.mm-popup__box__footer__right-space > .mm-popup__btn').click()

    cy.get('.btn').first().click()

    //Validating All Events
    cy.get(':nth-child(4) > .btn').click()
    cy.get('.btn').first().click()
    cy.get('button[style="background-color: rgb(222, 105, 135);"]').should('exist')
    cy.get('.btn').eq(1).click().click()
    cy.get('button[style="background-color: rgb(140, 189, 76);"]').should('exist')

    //Validating Past events
    cy.get(':nth-child(5) > .btn').click()
    cy.get('button[style="background-color: rgb(140, 189, 76);"]').should('not.exist')
    cy.get('.btn').first().click().click()
    cy.get('button[style="background-color: rgb(222, 105, 135);"]').should('exist')

    //Validating Upcoming Events
    cy.get(':nth-child(6) > .btn').click()
    cy.get('button[style="background-color: rgb(222, 105, 135);"]').should('not.exist')
    cy.get('.btn').eq(1).click().click()
    cy.get('button[style="background-color: rgb(140, 189, 76);"]').should('exist')

    //Editing an Event
    cy.get('.rbc-event').click()
    cy.get('.mm-popup__btn--info').click()
    cy.get('.mm-popup__box__footer__left-space > .mm-popup__btn').click()
    cy.get('.rbc-event-content').should('have.text','Upcoming Event')
    cy.get('.rbc-event').click()
    cy.get('.mm-popup__btn--info').click()
    cy.get('[placeholder="Event Title"]').type(' Edited')
    cy.get('.mm-popup__box__footer__right-space > .mm-popup__btn').click()
    cy.get('.rbc-event-content').should('have.text','Upcoming Event Edited')

    //Deleting an Event
    cy.get('.rbc-event').click()
    cy.get('.mm-popup__btn--danger').click()
    cy.get('button[style="background-color: rgb(140, 189, 76);"]').should('not.exist')
  })
});
