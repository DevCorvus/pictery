import { comparePassword, hashPassword } from './password';

const passwordMock = '12345678';

describe('Password Hashing', () => {
  it('Should hash the password', async () => {
    const hashedPassword = await hashPassword(passwordMock);
    expect(hashedPassword).not.toBe(passwordMock);
  });

  describe('Comparing hashed password', () => {
    let hashedPassword: string;

    beforeAll(async () => {
      hashedPassword = await hashPassword(passwordMock);
    });

    it('Should return true when hash is compared to the right password', async () => {
      const result = await comparePassword(passwordMock, hashedPassword);
      expect(result).toBe(true);
    });

    it('Should return false when hash is compared to the wrong password', async () => {
      const wrongPasswordMock = '87654321';

      const result = await comparePassword(wrongPasswordMock, hashedPassword);
      expect(result).toBe(false);
    });
  });
});
