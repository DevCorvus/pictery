import NameAndDescription from '@components/form/NameAndDescription.vue';

describe('<NameAndDescription />', () => {
  it('Should render and type in fields', () => {
    cy.mount(NameAndDescription, { props: { name: 'Gallery' } });
    cy.get('#name').type('Random name');
    cy.get('#description').type('random description');
  });
});
