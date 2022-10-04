import { parseUser } from './user.utils';

describe('User Utils', () => {
  it('Should parse user output', () => {
    const date = new Date();

    const user = {
      id: '4444',
      googleId: '8888',
      name: 'fulano',
      email: 'fulano@example.com',
      password: '12345678',
      createdAt: date,
      updatedAt: date,
    };

    const parsedUser = parseUser(user);

    expect(parsedUser).toMatchObject({
      id: '4444',
      name: 'fulano',
      email: 'fulano@example.com',
      createdAt: date,
      updatedAt: date,
    });
    expect(parsedUser).not.toHaveProperty('googleId');
    expect(parsedUser).not.toHaveProperty('password');
  });
});
