import { Post } from './api';
import type {
  TCalendarResponse,
  TCalendarRequest,
  TCalendarPeriod,
} from './calendar';

export async function getCalendarPeriods(
  request: TCalendarRequest
): Promise<TCalendarResponse> {
  return await Post<TCalendarResponse>('api/Calendar/get', request);
}
export interface CreateCalendarPeriodRequest {
  propertyId: number;
  startDate: string;
  endDate: string;
  state: number;
  name: string;
  description: string;
  attachedUserId?: number;
}

export interface CreateCalendarPeriodResponse {
  success: boolean;
  message: string;
  calendarPeriod?: TCalendarPeriod;
}

export interface DeleteCalendarPeriodRequest {
  id: number;
}

export interface DeleteCalendarPeriodResponse {
  success: boolean;
  message: string;
}

export async function createCalendarPeriod(
  request: CreateCalendarPeriodRequest
): Promise<CreateCalendarPeriodResponse> {
  return await Post<CreateCalendarPeriodResponse>(
    'api/Calendar/create',
    request
  );
}

export async function deleteCalendarPeriod(
  request: DeleteCalendarPeriodRequest
): Promise<DeleteCalendarPeriodResponse> {
  return await Post<DeleteCalendarPeriodResponse>(
    'api/Calendar/delete',
    request
  );
}
