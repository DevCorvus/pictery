import { axiosInstance } from '@lib/axios';

export async function check() {
  return axiosInstance.get('/protected');
}

export interface LoginDto {
  email: string;
  password: string;
}
export async function login(values: LoginDto) {
  return axiosInstance.post('/auth/login', values);
}

export async function logout() {
  return axiosInstance.post('/auth/logout');
}
