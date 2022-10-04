import { Gallery, Picture } from '@common/interfaces';
import {
  anotherGalleryWithAllowedUsersMock,
  anotherPictureMock,
  anotherUserMock,
  galleryMock,
  galleryUpdateMock,
  galleryWithAllowedUsersMock,
  pictureMock as pictureMockGen,
  pictureUpdateMock as pictureUpdateMockGen,
  userLoginMock,
  userMock,
} from '@common/tests/mock';

import { login, logout } from '@services/auth';
import { createGallery, deleteGallery } from '@services/gallery';
import { createPicture, deletePicture } from '@services/picture';
import { createUser, deleteUser } from '@services/user';

import { apiUrlResolver, getBlobFromBase64 } from '../support/utils';

const pictureMock = pictureMockGen('');
const pictureUpdateMock = pictureUpdateMockGen('');

async function reset() {
  try {
    await login(userLoginMock);
  } catch {
    // ...
  }
  try {
    await deleteUser();
  } catch {
    // ...
  }
}

// I know that nested tests are ugly but I need them to run faster than using individual setups

context('App walkthrough', () => {
  before(reset);

  it('Should go to the home page and "Get started"', () => {
    cy.visit('/');
    cy.contains('Get started').click();

    cy.url().should('include', '/register');
  });

  it('Should use navbar links and go between login and register through bottom links', () => {
    cy.visit('/');

    cy.getBySel('loginLink').click();
    cy.url().should('include', '/login');
    cy.getBySel('loginLink').should('not.exist');

    cy.getBySel('registerLink').click();
    cy.url().should('include', '/register');
    cy.getBySel('registerLink').should('not.exist');

    cy.contains('Sign in').click();
    cy.url().should('include', '/login');

    cy.contains('Sign up').click();
    cy.url().should('include', '/register');
  });

  it('Should get not found and go back', () => {
    cy.visit('/fulano');
    cy.contains('Page not found');
    cy.contains('Go back').click();

    cy.url().should('not.include', '/fulano');
    cy.contains('Get started');
  });

  context(
    'If not authenticated, it should be redirected to the login page in these pages',
    () => {
      afterEach(() => {
        cy.url().should('include', '/login');
      });

      it('Dashboard', () => {
        cy.visit('/dashboard');
      });

      it('Profile (yours)', () => {
        cy.visit('/profile');
      });

      it('Profile (other)', () => {
        cy.visit('/profile/uuid');
      });

      it('Gallery', () => {
        cy.visit('/gallery/uuid');
      });
    }
  );

  context('Registering user', () => {
    after(reset);

    it('Should pass', () => {
      cy.visit('/register');

      cy.nameValidation();
      cy.get('#name').type(userMock.name);

      cy.get('#email').type('random@example').blur();
      cy.contains('Invalid email');

      cy.get('#email').clear().type(userMock.email);

      cy.get('#password').type('12345').blur();
      cy.contains('Must have at least 6 characters');
      cy.get('#password').clear().type('1'.repeat(101)).blur();
      cy.contains('Must not be longer than 100 characters');

      cy.get('#password').clear().type(userMock.password);

      cy.get('#passwordConfirm').type('1234567890').blur();
      cy.contains('Passwords do not match');

      cy.get('#passwordConfirm').clear().type(userMock.password);

      cy.intercept({ method: 'POST', url: apiUrlResolver('/users') }).as(
        'register'
      );

      cy.contains('Sign Up').click();
      cy.wait('@register');

      cy.url().should(
        'include',
        `/login?register=success&email=${userMock.email}`
      );

      cy.contains('Account created successfully');
      cy.get('#email').invoke('val').should('equal', userMock.email);

      cy.wait(3000)
        .contains('Account created successfully')
        .should('not.exist');
    });
  });

  context('After user created', () => {
    before(async () => {
      await createUser(userMock);
    });

    after(reset);

    it('Should login and logout user', () => {
      cy.visit('/login');

      cy.get('#email').type(userMock.email);
      cy.get('#password').type(userMock.password + 'ñ');

      cy.intercept({ method: 'POST', url: apiUrlResolver('/auth/login') }).as(
        'loginAttempt'
      );

      cy.contains('Sign In').click();
      cy.wait('@loginAttempt');

      cy.contains('Wrong email or password');

      cy.get('#password').clear().type(userMock.password);

      cy.intercept({ method: 'POST', url: apiUrlResolver('/auth/login') }).as(
        'login'
      );

      cy.contains('Sign In').click();
      cy.wait('@login');

      cy.url().should('include', '/dashboard');

      cy.intercept({ method: 'POST', url: apiUrlResolver('/auth/logout') }).as(
        'logout'
      );

      cy.getBySel('logout').click();
      cy.wait('@logout');

      cy.url().should('not.include', '/dashboard');
    });

    context('After user logged in', () => {
      beforeEach(async () => {
        await login(userLoginMock);
      });

      afterEach(async () => {
        await logout();
      });

      it('Toggle dark mode', () => {
        cy.visit('/dashboard');

        cy.getBySel('toggleDarkMode').click();

        cy.getBySel('appRoot').should('have.class', 'dark');

        cy.contains('New').click();

        cy.getBySel('modalRoot').should('have.class', 'dark');

        cy.getBySel('closeModal').click();
        cy.getBySel('toggleDarkMode').click();

        cy.getBySel('appRoot').should('not.have.class', 'dark');

        cy.contains('New').click();

        cy.getBySel('modalRoot').should('not.have.class', 'dark');
      });

      it('Should go to the Dashboard and close the welcome message', () => {
        cy.visit('/dashboard');

        cy.contains('Dashboard');
        cy.contains(userMock.name);

        cy.contains('Welcome');
        cy.getBySel('dashboardWelcome').click();
        cy.contains('Welcome').should('not.exist');
      });

      it('Should go to the profile', () => {
        cy.visit('/dashboard');

        cy.contains(userMock.name).click();
        cy.url().should('include', '/profile');

        cy.contains('Profile');
        cy.contains('0 pictures');
        cy.contains('0 galleries');
      });

      context(
        'If authenticated, it should be redirected to the Dashboard in these pages',
        () => {
          afterEach(() => {
            cy.url().should('include', '/dashboard');
          });

          it('Home', () => {
            cy.visit('/');
          });

          it('Login', () => {
            cy.visit('/login');
          });

          it('Register', () => {
            cy.visit('/register');
          });
        }
      );

      context('Creating gallery', () => {
        let gallery: Gallery;

        afterEach(async () => {
          if (gallery) await deleteGallery(gallery.id);
        });

        it('Public one', () => {
          cy.visit('/dashboard');

          cy.contains('New').click();

          cy.nameValidation();
          cy.get('#name').type(galleryMock.name);

          cy.descriptionValidation();
          cy.get('#description').type(galleryMock.description);

          cy.intercept({
            method: 'POST',
            url: apiUrlResolver('/galleries'),
          }).as('creatingGallery');

          cy.contains('Create').click();

          cy.wait('@creatingGallery').then((interception) => {
            if (interception.response) {
              gallery = interception.response.body as Gallery;
            }
          });

          cy.contains(galleryMock.name);

          cy.getBySel('addItem').click();
          cy.contains('New gallery');
        });

        it('Private one', () => {
          cy.visit('/dashboard');

          cy.contains('New').click();

          cy.intercept({ method: 'GET', url: apiUrlResolver('/users') }).as(
            'fetchingUserEmail'
          );

          cy.getBySel('selectPrivate').click();
          cy.wait('@fetchingUserEmail');

          cy.get('#name').type(galleryMock.name);
          cy.get('#description').type(galleryMock.description);

          cy.getBySel('newAllowedUser').click();
          cy.get('#email').type('fulano@');

          cy.contains('Add').click();
          cy.contains('Invalid email');

          cy.get('#email').clear().type(userMock.email);

          cy.contains('Add').click();
          cy.contains('You cannot add your email');

          cy.get('#email').clear().type(anotherUserMock.email);
          cy.contains('Add').click();

          cy.getBySel('newAllowedUser').click();
          cy.get('#email').type(anotherUserMock.email);

          cy.contains('Add').click();
          cy.contains('Email already in the list');

          cy.getBySel('cancelNewAllowedUser').click();

          cy.intercept({
            method: 'POST',
            url: apiUrlResolver('/galleries'),
          }).as('creatingGallery');

          cy.contains('Create').click();

          cy.wait('@creatingGallery').then((interception) => {
            if (interception.response) {
              gallery = interception.response.body as Gallery;
            }
          });

          cy.contains(galleryMock.name);

          cy.getBySel('addItem').click();
          cy.contains('New gallery');
        });
      });

      context('Deleting gallery', () => {
        let gallery: Gallery;

        beforeEach(async () => {
          gallery = await createGallery(galleryWithAllowedUsersMock);
        });

        it('Should delete one', () => {
          cy.visit(`/gallery/${gallery.id}`);

          cy.getBySel('openGalleryDetails').click();
          cy.contains('Delete').click();

          cy.intercept({
            method: 'DELETE',
            url: apiUrlResolver(`/galleries/${gallery.id}`),
          }).as('deletingGallery');

          cy.contains('Confirm').click();
          cy.wait('@deletingGallery');

          cy.url().should('include', '/dashboard');
          cy.contains(galleryMock.name).should('not.exist');
        });

        it('Should delete one using the delete mode', () => {
          cy.visit('/dashboard');

          cy.getBySel('toggleDeleteMode').click();

          cy.getBySel('deleteModeFirstTime').click();
          cy.contains('delete mode').should('not.exist');

          cy.getBySel('toggleDeleteMode').dblclick();

          cy.getBySel('deleteCount').contains('0');

          cy.contains(galleryMock.name).dblclick().click();

          cy.getBySel('deleteCount').contains('1');

          cy.intercept({ method: 'PUT', url: apiUrlResolver('/galleries') }).as(
            'deletingGalleries'
          );

          cy.contains('Confirm').click();
          cy.wait('@deletingGalleries');

          cy.contains(galleryMock.name).should('not.exist');
        });
      });

      context('After gallery created', () => {
        let gallery: Gallery;

        beforeEach(async () => {
          gallery = await createGallery(galleryWithAllowedUsersMock);
        });

        afterEach(async () => {
          if (gallery) await deleteGallery(gallery.id);
        });

        it('Should search gallery', () => {
          cy.visit('/dashboard');

          cy.get('#search').type('sus');
          cy.contains(galleryMock.name).should('not.exist');

          cy.get('#search').clear().type('generic');
          cy.contains(galleryMock.name);
        });

        it('Should open gallery, go back and open again', () => {
          cy.visit('/dashboard');

          cy.contains(galleryMock.name).click();
          cy.url().should('include', '/gallery');

          cy.getBySel('galleryWelcome').click();

          cy.getBySel('goBack').click();
          cy.url().should('include', '/dashboard');

          cy.contains(galleryMock.name).click();
          cy.url().should('include', '/gallery');

          cy.contains('this is a gallery that you own').should('not.exist');
        });

        it('Should scan QR code and check clipboard in gallery', () => {
          cy.visit(`/gallery/${gallery.id}`);

          cy.url().then((url) => {
            cy.getBySel('openQr').click();

            cy.getBySel('qr').readQrCode().should('have.property', 'text', url);

            cy.getBySel('closeModal').click();

            cy.getBySel('clipboard').click();

            cy.window()
              .its('navigator.clipboard')
              .invoke('readText')
              .should('equal', url);
          });
        });

        it('Should open gallery details and go to author profile', () => {
          cy.visit(`/gallery/${gallery.id}`);

          cy.getBySel('openGalleryDetails').click();

          cy.contains('Public');
          cy.contains(galleryMock.name);
          cy.contains(galleryMock.description);

          cy.contains('Go to author').click();
          cy.url().should('include', '/profile');

          cy.contains('Profile');
          cy.contains('0 pictures');
          cy.contains('1 galleries');
        });

        it('Should edit gallery', () => {
          cy.visit(`/gallery/${gallery.id}`);

          cy.getBySel('openGalleryDetails').click();
          cy.contains('Edit').click();

          cy.nameValidation();
          cy.get('#name').type(galleryUpdateMock.name);

          cy.descriptionValidation();
          cy.get('#description').type(galleryUpdateMock.description);

          cy.intercept({
            method: 'PUT',
            url: apiUrlResolver(`/galleries/${gallery.id}`),
          }).as('updatingGallery');

          cy.contains('Save').click();
          cy.wait('@updatingGallery');

          cy.contains(galleryUpdateMock.name);
          cy.contains(galleryUpdateMock.description);

          cy.reload();

          cy.getBySel('openGalleryDetails').click();
          cy.contains(galleryUpdateMock.name);
        });

        context('Creating picture', () => {
          let picture: Picture;

          afterEach(async () => {
            if (picture) await deletePicture(picture.id);
          });

          it('Should pass', () => {
            cy.visit(`/gallery/${gallery.id}`);

            cy.contains('New').click();

            cy.getBySel('fileInput').selectFile(
              '../common/tests/static/document.txt',
              { action: 'drag-drop' }
            );

            cy.contains('Must be an image and not exceed 1 MB');

            cy.getBySel('fileInput').selectFile(
              '../common/tests/static/pixel-earth-big.jpg',
              { action: 'drag-drop' }
            );

            cy.contains('Must be an image and not exceed 1 MB');

            cy.getBySel('fileInput').selectFile(
              '../common/tests/static/pixel-earth.jpg',
              { action: 'drag-drop' }
            );

            cy.nameValidation();
            cy.get('#name').type(pictureMock.name);

            cy.descriptionValidation();
            cy.get('#description').type(pictureMock.description);

            cy.intercept({
              method: 'POST',
              url: apiUrlResolver('/pictures'),
            }).as('creatingPicture');

            cy.contains('Create').click();

            cy.wait('@creatingPicture').then((interception) => {
              if (interception.response) {
                picture = interception.response.body as Picture;
              }
            });

            cy.getBySel(pictureMock.name)
              .find('img')
              .should('be.visible')
              .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0);
              });

            cy.getBySel('addItem').click();
            cy.contains('New picture');
          });
        });

        context('After loading a file', () => {
          let file: Blob;

          before(() => {
            cy.task('readFileAsBase64', 'pixel-earth.jpg')
              .then((base64String) => {
                return getBlobFromBase64(base64String as string, 'image/jpeg');
              })
              .then((blob) => {
                file = blob;
              });
          });

          context('Deleting picture', () => {
            let picture: Picture;

            beforeEach(() => {
              cy.wrap(
                createPicture({
                  galleryId: gallery.id,
                  name: pictureMock.name,
                  description: pictureMock.description,
                  image: file,
                })
              ).then((newPicture) => {
                picture = newPicture as Picture;

                cy.visit(`/gallery/${gallery.id}`);
              });
            });

            it('Should delete one', () => {
              cy.getBySel(pictureMock.name).click();

              cy.contains('Delete').click();

              cy.intercept({
                method: 'DELETE',
                url: apiUrlResolver(`/pictures/${picture.id}`),
              }).as('deletingPicture');

              cy.contains('Confirm').click();
              cy.wait('@deletingPicture');

              cy.getBySel(pictureMock.name).should('not.exist');
            });

            it('Should delete one using the delete mode', () => {
              cy.getBySel('toggleDeleteMode').as('toggleDeleteMode').click();

              cy.getBySel('deleteCount').contains('0');

              cy.contains(pictureMock.name).click();

              cy.getBySel('deleteCount').contains('1');

              cy.intercept({
                method: 'PUT',
                url: apiUrlResolver('/pictures/delete'),
              }).as('deletingPictures');

              cy.contains('Confirm').click();
              cy.wait('@deletingPictures');

              cy.getBySel(pictureMock.name).should('not.exist');
            });
          });

          context('After picture created', () => {
            let picture: Picture;

            beforeEach(() => {
              cy.wrap(
                createPicture({
                  galleryId: gallery.id,
                  name: pictureMock.name,
                  description: pictureMock.description,
                  image: file,
                })
              ).then((newPicture) => {
                picture = newPicture as Picture;
              });
            });

            // afterEach(async () => {
            //   if (picture) await deletePicture(picture.id);
            // });

            context('Downloading', () => {
              before(() => {
                cy.task('deleteDownloadsDir');
              });

              after(() => {
                cy.task('deleteDownloadsDir');
              });

              it('Should open a picture and download it', () => {
                cy.visit(`/gallery/${gallery.id}`);

                cy.getBySel(pictureMock.name).click();

                cy.contains(pictureMock.name);
                cy.contains(pictureMock.description);

                cy.getBySel('downloadBtn').click();

                cy.task(
                  'resolveDownloadedFilePath',
                  `${pictureMock.name}.jpg`
                ).then((downloadedFilePath) => {
                  cy.readFile(downloadedFilePath as string, 'binary', {
                    timeout: 15000,
                  }).should((buffer) => {
                    expect(buffer.length).to.be.gt(1000);
                  });
                });

                cy.getBySel('closeModal').click();
              });
            });

            it('Should edit a picture', () => {
              cy.visit(`/gallery/${gallery.id}`);

              cy.getBySel(picture.name).click();

              cy.intercept({
                method: 'GET',
                url: apiUrlResolver('/galleries?mode=minimal'),
              }).as('fetchingGalleries');

              cy.contains('Edit').click();
              cy.wait('@fetchingGalleries');

              cy.nameValidation();
              cy.get('#name').type(pictureUpdateMock.name);

              cy.descriptionValidation();
              cy.get('#description').type(pictureUpdateMock.description);

              cy.intercept({
                method: 'PUT',
                url: apiUrlResolver(`/pictures/${picture.id}`),
              }).as('updatingPicture');

              cy.contains('Save').click();
              cy.wait('@updatingPicture');

              cy.contains(pictureUpdateMock.name);
              cy.contains(pictureUpdateMock.description);

              cy.reload();

              cy.getBySel(pictureUpdateMock.name).click();

              cy.contains(pictureUpdateMock.name);
              cy.contains(pictureUpdateMock.description);
            });

            context('After another gallery created', () => {
              let anotherGallery: Gallery;

              beforeEach(async () => {
                anotherGallery = await createGallery(
                  anotherGalleryWithAllowedUsersMock
                );
              });

              afterEach(async () => {
                if (anotherGallery) await deleteGallery(anotherGallery.id);
              });

              it('Should sort galleries', () => {
                cy.visit('/dashboard');

                cy.getBySel('ascending').should('exist');

                cy.getBySel(anotherGallery.name)
                  .next()
                  .within(() => {
                    cy.contains(gallery.name);
                  });

                cy.getBySel('ascending').click();
                cy.getBySel('descending').should('exist');

                cy.getBySel(gallery.name)
                  .next()
                  .within(() => {
                    cy.contains(anotherGallery.name);
                  });

                cy.getBySel('descending').click();
                cy.getBySel('alphabet').should('exist');

                cy.getBySel(anotherGallery.name)
                  .next()
                  .within(() => {
                    cy.contains(gallery.name);
                  });

                cy.getBySel('alphabet').click();
                cy.getBySel('ascending').should('exist');
              });

              it('Should move a picture', () => {
                cy.visit(`/gallery/${gallery.id}`);

                cy.getBySel(picture.name).click();

                cy.intercept({
                  method: 'GET',
                  url: apiUrlResolver('/galleries?mode=minimal'),
                }).as('fetchingGalleries');

                cy.contains('Edit').click();
                cy.wait('@fetchingGalleries');

                cy.contains(gallery.name).click();
                cy.contains(anotherGallery.name).click();

                cy.intercept({
                  method: 'PUT',
                  url: apiUrlResolver(`/pictures/${picture.id}`),
                }).as('movingPicture');

                cy.contains('Save').click();
                cy.wait('@movingPicture');

                cy.getBySel(picture.name).should('not.exist');

                cy.visit(`/gallery/${anotherGallery.id}`);

                cy.getBySel(picture.name).should('exist');
              });

              it('Should move one picture using the move pictures mode', () => {
                cy.visit(`/gallery/${gallery.id}`);

                cy.getBySel('toggleMovePicturesMode').click();

                cy.getBySel('movePicturesModeFirstTime').click();
                cy.contains('move pictures mode').should('not.exist');

                cy.contains('Cancel').click();

                cy.intercept({
                  method: 'GET',
                  url: apiUrlResolver('/galleries?mode=minimal'),
                }).as('fetchingGalleries');

                cy.getBySel('toggleMovePicturesMode').click();
                cy.wait('@fetchingGalleries');

                cy.getBySel('movePicturesCount').contains('0');

                cy.contains(picture.name).click();

                cy.getBySel('movePicturesCount').contains('1');

                cy.contains(gallery.name).click();
                cy.contains(anotherGallery.name).click();

                cy.intercept({
                  method: 'PUT',
                  url: apiUrlResolver('/pictures/move'),
                }).as('movingPictures');

                cy.contains('Confirm').click();
                cy.wait('@movingPictures');

                cy.getBySel(picture.name).should('not.exist');

                cy.visit(`/gallery/${anotherGallery.id}`);

                cy.getBySel(picture.name).should('exist');
              });
            });

            describe('After another picture created', () => {
              let anotherPicture: Picture;

              beforeEach(() => {
                cy.wrap(
                  createPicture({
                    galleryId: gallery.id,
                    name: anotherPictureMock.name,
                    description: anotherPictureMock.description,
                    image: file,
                  })
                ).then((newPicture) => {
                  anotherPicture = newPicture as Picture;
                });
              });

              it('Should sort pictures', () => {
                cy.visit(`/gallery/${gallery.id}`);

                cy.getBySel('ascending').should('exist');

                cy.getBySel(anotherPicture.name)
                  .next()
                  .then((elem) => {
                    elem.trigger('hover');
                  })
                  .within(() => {
                    cy.contains(picture.name);
                  });

                cy.getBySel('ascending').click();
                cy.getBySel('descending').should('exist');

                cy.getBySel(picture.name)
                  .next()
                  .then((elem) => {
                    elem.trigger('hover');
                  })
                  .within(() => {
                    cy.contains(anotherPicture.name);
                  });

                cy.getBySel('descending').click();
                cy.getBySel('alphabet').should('exist');

                cy.getBySel(anotherPicture.name)
                  .next()
                  .then((elem) => {
                    elem.trigger('hover');
                  })
                  .within(() => {
                    cy.contains(picture.name);
                  });

                cy.getBySel('alphabet').click();
                cy.getBySel('ascending').should('exist');
              });
            });
          });
        });
      });
    });
  });
});
