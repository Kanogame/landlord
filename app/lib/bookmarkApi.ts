import { Post } from './api';

export interface BookmarkRequest {
  propertyId: number;
}

export interface BookmarkResponse {
  success: boolean;
  message: string;
}

export async function addBookmark(
  propertyId: number
): Promise<BookmarkResponse> {
  return await Post<BookmarkResponse>('api/Bookmark/add', { propertyId });
}

export async function removeBookmark(
  propertyId: number
): Promise<BookmarkResponse> {
  return await Post<BookmarkResponse>('api/Bookmark/remove', { propertyId });
}
