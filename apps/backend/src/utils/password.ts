import bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  saltRounds = 10
): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(
  rawPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(rawPassword, hashedPassword);
}
