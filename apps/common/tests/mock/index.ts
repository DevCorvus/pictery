export const userMock = {
  name: 'fulano',
  email: 'fulano@example.com',
  password: '12345678',
};

export const userLoginMock = {
  email: userMock.email,
  password: userMock.password,
};

export const anotherUserMock = {
  name: 'fulana',
  email: 'fulana@example.com',
  password: '12345678',
};

export const anotherUserLoginMock = {
  email: anotherUserMock.email,
  password: anotherUserMock.password,
};

export const userWithGoogleMock = {
  googleId: '4444',
  name: 'fulanoG',
  email: 'fulano@gmail.com',
};

export const profileMock = {
  name: 'fulano',
  galleries: 0,
  pictures: 0,
};

export const galleryMock = {
  name: 'Generic gallery',
  description: 'random description',
  public: true,
};

export const galleryWithAllowedUsersMock = {
  ...galleryMock,
  allowedUsers: [],
};

export const anotherGalleryMock = {
  name: 'Another gallery',
  description: 'another random description',
  public: false,
};

export const anotherGalleryWithAllowedUsersMock = {
  ...anotherGalleryMock,
  allowedUsers: [],
};

export const galleryUpdateMock = {
  name: 'Updated gallery',
  description: 'new random description',
  public: false,
};

export const galleryUpdateWithAllowedUsersMock = {
  ...galleryUpdateMock,
  allowedUsers: [],
};

export const pictureMock = (galleryId: string) => ({
  galleryId,
  name: 'Generic picture',
  description: 'random description',
  url: 'https://www.example.com/picture.jpg', // TODO: Replace this with a real URL
  key: '4444',
});

export const pictureUpdateMock = (galleryId: string) => ({
  galleryId,
  name: 'Updated picture',
  description: 'new random description',
});

export const anotherPictureMock = {
  name: 'Another picture',
  description: 'another random description',
};
