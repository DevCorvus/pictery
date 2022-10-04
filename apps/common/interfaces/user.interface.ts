export interface User {
  id: string;
  googleId: string | null;
  email: string;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}
