import { Post } from './api';
import type { TCalendarResponse, TCalendarRequest } from './calendar';

export async function getCalendarPeriods(
  request: TCalendarRequest
): Promise<TCalendarResponse> {
  return await Post<TCalendarResponse>('api/Calendar/get', request);
}
