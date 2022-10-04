export interface Gallery {
  id: string;
  name: string;
  description: string | null;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  pictures?: { url: string }[];
}

export interface GalleryAllowedUser {
  id: string;
  email: string;
  createdAt: Date;
  galleryId: string;
}
