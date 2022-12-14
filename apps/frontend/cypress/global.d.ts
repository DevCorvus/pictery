// / <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getBySel(value: string): Chainable<JQuery<HTMLElement>>;

    nameValidation(): void;
    descriptionValidation(): void;

    readQrCode(): Chainable<unknown>;
  }
}

declare module '*.vue';
