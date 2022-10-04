export interface Picture {
  id: string;
  name: string;
  description: string | null;
  url: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  galleryId: string;
}
