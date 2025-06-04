import { useState, useMemo } from 'react';
import {
  getCalendarPeriods,
  createCalendarPeriod,
  deleteCalendarPeriod,
} from '~/lib/calendarApi';
import { ErrorToast } from '~/lib/api';
import type { TCalendarResponse, TCalendarPeriod } from '~/lib/calendar';
import type { CreateCalendarPeriodRequest } from '~/lib/calendarApi';
import { TCalendarState } from '~/lib/calendar';

interface NewPeriodData {
  startDate: Date | undefined;
  endDate: Date | undefined;
  state: TCalendarState;
  name: string;
  description: string;
}

export const usePropertyCalendar = (
  propertyId: number,
  initialCalendarData: TCalendarResponse,
  onCalendarUpdate?: (calendarData: TCalendarResponse) => void
) => {
  const [calendarData, setCalendarData] =
    useState<TCalendarResponse>(initialCalendarData);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<TCalendarPeriod | null>(
    null
  );

  // Get all dates that are part of periods
  const periodDates = useMemo(() => {
    const dateMap = new Map<string, TCalendarPeriod>();

    calendarData.periods?.forEach(period => {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateKey = d.toDateString();
        dateMap.set(dateKey, period);
      }
    });

    return dateMap;
  }, [calendarData.periods]);

  // Load calendar data for specific month
  const loadCalendarData = async (month: Date) => {
    try {
      const startDate = new Date(
        month.getFullYear(),
        month.getMonth(),
        1
      ).toISOString();
      const endDate = new Date(
        month.getFullYear(),
        month.getMonth() + 1,
        0,
        23,
        59,
        59
      ).toISOString();

      const response = await getCalendarPeriods({
        propertyId,
        startDate,
        endDate,
      });

      if (response.success) {
        setCalendarData(response);
        setSelectedPeriod(null);
        onCalendarUpdate?.(response);
      } else {
        ErrorToast('Ошибка при загрузке календаря');
      }
    } catch (error) {
      ErrorToast('Ошибка при загрузке календаря');
    }
  };

  // Handle month change
  const handleMonthChange = (month: Date) => {
    const newMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const oldMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );

    if (newMonth.getTime() !== oldMonth.getTime()) {
      setCurrentMonth(newMonth);
      loadCalendarData(newMonth);
    }
  };

  // Handle day click to select period
  const handleDayClick = (date: Date | undefined) => {
    const dateKey = date?.toDateString() ?? '';
    const period = periodDates.get(dateKey);

    if (period) {
      setSelectedPeriod(period);
    } else {
      setSelectedPeriod(null);
    }
  };

  // Handle delete period
  const handleDeletePeriod = async (periodId: number) => {
    try {
      const response = await deleteCalendarPeriod({ id: periodId });

      if (response.success) {
        setSelectedPeriod(null);
        await loadCalendarData(currentMonth);
      } else {
        ErrorToast(response.message || 'Ошибка при удалении периода');
      }
    } catch (error) {
      ErrorToast('Ошибка при удалении периода');
    }
  };

  // Handle save new period
  const handleSavePeriod = async (periodData: NewPeriodData) => {
    if (
      !periodData.startDate ||
      !periodData.endDate ||
      !periodData.name.trim()
    ) {
      ErrorToast('Заполните все обязательные поля');
      return false;
    }

    try {
      const request: CreateCalendarPeriodRequest = {
        propertyId,
        startDate: periodData.startDate.toISOString(),
        endDate: new Date(
          periodData.endDate.getFullYear(),
          periodData.endDate.getMonth(),
          periodData.endDate.getDate(),
          23,
          59,
          59
        ).toISOString(),
        state: periodData.state,
        name: periodData.name,
        description: periodData.description,
      };

      const response = await createCalendarPeriod(request);

      if (response.success) {
        await loadCalendarData(currentMonth);
        return true;
      } else {
        ErrorToast(response.message || 'Ошибка при создании периода');
        return false;
      }
    } catch (error) {
      ErrorToast('Ошибка при создании периода');
      return false;
    }
  };

  // Custom day content to show period styling
  const getDayClassName = (date: Date) => {
    const dateKey = date.toDateString();
    const period = periodDates.get(dateKey);

    if (!period) return '';

    const periodStart = new Date(period.startDate);
    const periodEnd = new Date(period.endDate);
    const isStart = date.toDateString() === periodStart.toDateString();
    const isEnd = date.toDateString() === periodEnd.toDateString();
    const isSelected = selectedPeriod?.id === period.id;

    let className = '';

    if (isSelected) {
      className += 'text-[#8B2635] bg-[rgba(139,38,53,0.12)] ';
    }

    if (isStart && isEnd) {
      className += 'bg-[#DCBEC2] rounded-full w-[100%] ';
    } else if (isStart) {
      className += 'bg-[#DCBEC2] rounded-bl-full rounded-l-full w-[100%] ';
    } else if (isEnd) {
      className += 'bg-[#DCBEC2] rounded-br-full rounded-r-full w-[100%] ';
    } else {
      className += 'bg-[#DCBEC2] w-[100%] ';
    }

    return className;
  };

  return {
    calendarData,
    currentMonth,
    selectedPeriod,
    periodDates,
    setSelectedPeriod,
    handleMonthChange,
    handleDayClick,
    handleDeletePeriod,
    handleSavePeriod,
    getDayClassName,
  };
};
