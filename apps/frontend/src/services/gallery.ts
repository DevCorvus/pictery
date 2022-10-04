import { Gallery } from '@common/interfaces/gallery.interface';

import { axiosInstance } from '@lib/axios';

export interface GalleryDto {
  name: string;
  description: string;
  public: boolean;
  allowedUsers: string[];
}

export async function galleryAllowedUsers(galleryId: string) {
  const { data } = await axiosInstance.get<string[]>(
    `/galleries/${galleryId}/allowed-users`
  );
  return data;
}

export async function createGallery(values: GalleryDto) {
  const { data } = await axiosInstance.post<Gallery>('/galleries', values);
  return data;
}

export async function deleteGallery(galleryId: string) {
  const { data } = await axiosInstance.delete<Gallery>(
    `/galleries/${galleryId}`
  );
  return data;
}

export async function deleteManyGalleries(data: { galleryIds: string[] }) {
  return axiosInstance.put('/galleries', data);
}

export async function updateGallery(galleryId: string, values: GalleryDto) {
  const { data } = await axiosInstance.put<Gallery>(
    `/galleries/${galleryId}`,
    values
  );
  return data;
}
