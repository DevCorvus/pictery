// / <reference types="cypress" />
import { BrowserMultiFormatReader } from '@zxing/browser';

const reader = new BrowserMultiFormatReader();

Cypress.Commands.add('getBySel', (value) => {
  return cy.get(`[data-test="${value}"]`);
});

Cypress.Commands.add('nameValidation', () => {
  cy.get('#name').clear().type('a').blur();
  cy.contains('Must have at least 2 characters');
  cy.get('#name').clear().type('a'.repeat(51)).blur();
  cy.contains('Must not be longer than 50 characters');
  cy.get('#name').clear().type('Name <?>').blur();
  cy.contains('Only alphanumeric characters');
  cy.get('#name').clear();
});

Cypress.Commands.add('descriptionValidation', () => {
  cy.get('#description')
    .clear()
    .invoke('val', 'a'.repeat(500))
    .type('a')
    .blur();
  cy.contains('Must not be longer than 500 characters');
  cy.get('#description').clear();
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Cypress.Commands.add('readQrCode', { prevSubject: 'element' }, (subject) => {
  const img = subject[0] as HTMLImageElement;
  const image = new Image();
  image.width = img.width;
  image.height = img.height;
  image.src = img.src;
  image.crossOrigin = 'Anonymous';
  return reader.decodeFromImageElement(image);
});
