export interface TCalendarPeriod {
  id: number;
  propertyId: number;
  startDate: string;
  endDate: string;
  state: number;
  name: string;
  description: string;
  attachedUserId: number | null;
  attachedUserName: string;
  createdAt: string;
  updatedAt: string;
}

export interface TCalendarResponse {
  success: boolean;
  count: number;
  periods: TCalendarPeriod[];
}

export interface TCalendarRequest {
  propertyId: number;
  startDate: string;
  endDate: string;
}
