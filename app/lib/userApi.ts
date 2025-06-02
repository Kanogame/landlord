import { Get, Post } from './api';

export interface GetUserInfoRequest {
  userId: number;
}

export interface GetUserInfoResponse {
  success: boolean;
  fullName: string;
  activePropertiesCount: number;
  rentedSoldRentEndingCount: number;
  experience: string;
}

export interface GetPropertiesByUserIdRequest {
  userId: number;
  pageNumber: number;
  pageSize: number;
  sortBy: number;
}

export async function getUserInfo(
  userId: number
): Promise<GetUserInfoResponse> {
  return await Post<GetUserInfoResponse>('api/User/get_user_info', {
    userId: userId,
  });
}
