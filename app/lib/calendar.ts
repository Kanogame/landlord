export enum TCalendarState {
  Available = 1,
  Rented = 2,
  Sold = 3,
  Maintenance = 4,
  Blocked = 5,
  Reserved = 6,
}

export const calendarStateOptions = [
  { value: TCalendarState.Available, label: 'Доступно' },
  { value: TCalendarState.Rented, label: 'Сдано' },
  { value: TCalendarState.Sold, label: 'Продано' },
  { value: TCalendarState.Maintenance, label: 'Обслуживание' },
  { value: TCalendarState.Blocked, label: 'Заблокировано' },
  { value: TCalendarState.Reserved, label: 'Зарезервировано' },
];

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
