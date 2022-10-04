import { Picture } from '@common/interfaces';

import { axiosInstance } from '@lib/axios';

export interface CreatePictureDto {
  galleryId: string;
  name: string;
  description: string;
  image: File | Blob;
}
export async function createPicture(values: CreatePictureDto) {
  const { data } = await axiosInstance.post<Picture>('/pictures', values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function deletePicture(pictureId: string) {
  const { data } = await axiosInstance.delete<Picture>(
    `/pictures/${pictureId}`
  );
  return data;
}

export async function deleteManyPictures(data: { pictureIds: string[] }) {
  return axiosInstance.put('/pictures/delete', data);
}

export interface UpdatePictureDto {
  galleryId: string;
  name: string;
  description: string;
}
export async function updatePicture(
  pictureId: string,
  values: UpdatePictureDto
) {
  const { data } = await axiosInstance.put<Picture>(
    `/pictures/${pictureId}`,
    values
  );
  return data;
}

export async function moveManyPictures(data: {
  galleryId: string;
  pictureIds: string[];
}) {
  return axiosInstance.put('/pictures/move', data);
}
