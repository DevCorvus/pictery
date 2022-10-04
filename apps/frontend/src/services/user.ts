import { Profile } from '@common/interfaces';

import { axiosInstance } from '@lib/axios';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}
export async function createUser(values: CreateUserDto) {
  return axiosInstance.post('/users', values);
}

export async function getMyProfile() {
  const { data } = await axiosInstance.get<Profile>('/profile');
  return data;
}

export async function getProfile(userId: string) {
  const { data } = await axiosInstance.get<Profile>(`/profile/${userId}`);
  return data;
}

export async function getEmail() {
  const { data } = await axiosInstance.get<string>('/users');
  return data;
}

export async function deleteUser() {
  return axiosInstance.delete('/users');
}
