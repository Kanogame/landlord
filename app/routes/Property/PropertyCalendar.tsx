import { useState, useMemo } from 'react';
import { useDesktop } from '~/hooks/useDesktop';
import Block from '../../components/Block';
import ButtonAccent from '../../components/ButtonAccent';
import { Calendar } from '~/components/ui/calendar';
import { getCalendarPeriods } from '~/lib/calendarApi';
import { ErrorToast } from '~/lib/api';
import type { TCalendarResponse, TCalendarPeriod } from '~/lib/calendar';
import { Drawer, DrawerContent } from '../../components/ui/drawer';

interface PropertyCalendarProps {
  propertyId: number;
  initialCalendarData: TCalendarResponse;
}

export default function PropertyCalendar({
  propertyId,
  initialCalendarData,
}: PropertyCalendarProps) {
  const isDesktop = useDesktop();
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
        setSelectedPeriod(null); // Reset selection when month changes
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

  const formatDateRange = (period: TCalendarPeriod) => {
    const start = new Date(period.startDate).toLocaleDateString('ru-RU');
    const end = new Date(period.endDate).toLocaleDateString('ru-RU');
    return `${start} - ${end}`;
  };

  const renderEventContent = () => {
    if (!selectedPeriod) {
      return 'Выберите период на календаре, чтобы увидеть события';
    }

    return `${selectedPeriod.description}

${
  selectedPeriod.attachedUserName
    ? `Ответственный: ${selectedPeriod.attachedUserName}`
    : ''
}

Создано: ${new Date(selectedPeriod.createdAt).toLocaleDateString('ru-RU')}
${
  selectedPeriod.updatedAt !== selectedPeriod.createdAt
    ? `Обновлено: ${new Date(selectedPeriod.updatedAt).toLocaleDateString(
        'ru-RU'
      )}`
    : ''
}`;
  };

  const getEventTitle = () => {
    if (!selectedPeriod) {
      return 'Выберите период';
    }

    return `${selectedPeriod.name} (${formatDateRange(selectedPeriod)})`;
  };

  return (
    <Block label="Календарь" isDesktop={isDesktop}>
      <div className={isDesktop ? 'flex gap-[12px]' : 'flex'}>
        <div
          className={isDesktop ? 'flex-shrink-0' : 'flex-1'}
          style={{ width: 370 }}
        >
          <Calendar
            mode="single"
            onSelect={handleDayClick}
            onMonthChange={handleMonthChange}
            numberOfMonths={1}
            className="w-[100%] bg-white flex flex-col"
            classNames={{
              months: 'flex flex-col',
              month: 'space-y-0',
              caption:
                'flex justify-between pt-[6px] items-center h-[44px] px-[12px]',
              caption_label: 'h4-def left-4 top-[9px]',
              nav: 'flex items-center gap-[40px]',
              nav_button:
                'h-[18px] w-[10px] bg-transparent p-0 hover:opacity-70 top-[11px]',
              nav_button_previous: '',
              nav_button_next: '',
              table: 'w-full border-collapse',
              head_row: 'flex justify-between items-center px-4 h-5',
              head_cell:
                'w-8 h-[18px] text-center flex justify-center items-center text-[rgba(60,60,67,0.30)] n1-light',
              row: 'flex justify-between items-center ',
              cell: 'w-[100%] h-[44px] flex items-center justify-center',
              day: 'h-[30px] h4-def hover:bg-[#DCBEC2] flex flex-1 items-center justify-center cursor-pointer',
              day_today:
                'h-[44px] text-[#8B2635] border border-[#8B2635] rounded-full',
              day_outside: 'text-[#D9D9D9]',
              day_disabled: 'text-[#D9D9D9] opacity-50 cursor-not-allowed',
              day_hidden: 'invisible',
            }}
            components={{
              IconLeft: () => (
                <svg
                  width="10"
                  height="18"
                  viewBox="0 0 10 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.79021 0.203368C9.85671 0.267669 9.90947 0.344057 9.94547 0.428156C9.98147 0.512255 10 0.602412 10 0.693464C10 0.784516 9.98147 0.874673 9.94547 0.958772C9.90947 1.04287 9.85671 1.11926 9.79021 1.18356L1.72512 9.00018L9.79021 16.8168C9.9243 16.9468 9.99963 17.1231 9.99963 17.3069C9.99963 17.4907 9.9243 17.667 9.79021 17.797C9.65612 17.927 9.47425 18 9.28462 18C9.09499 18 8.91313 17.927 8.77904 17.797L0.209794 9.49028C0.143292 9.42598 0.0905301 9.34959 0.0545301 9.26549C0.0185301 9.18139 0 9.09123 0 9.00018C0 8.90913 0.0185301 8.81897 0.0545301 8.73487C0.0905301 8.65077 0.143292 8.57439 0.209794 8.51009L8.77904 0.203368C8.84537 0.138903 8.92417 0.0877574 9.01093 0.0528602C9.09768 0.0179631 9.19069 0 9.28462 0C9.37855 0 9.47156 0.0179631 9.55831 0.0528602C9.64507 0.0877574 9.72387 0.138903 9.79021 0.203368Z"
                    fill="#2D2D2D"
                  />
                </svg>
              ),
              IconRight: () => (
                <svg
                  width="10"
                  height="18"
                  viewBox="0 0 10 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.209794 0.203368C0.143292 0.267669 0.0905304 0.344057 0.0545311 0.428156C0.0185308 0.512255 0 0.602412 0 0.693464C0 0.784516 0.0185308 0.874673 0.0545311 0.958772C0.0905304 1.04287 0.143292 1.11926 0.209794 1.18356L8.27488 9.00018L0.209794 16.8168C0.0757046 16.9468 0.000374794 17.1231 0.000374794 17.3069C0.000374794 17.4907 0.0757046 17.667 0.209794 17.797C0.343884 17.927 0.525748 18 0.71538 18C0.905011 18 1.08687 17.927 1.22096 17.797L9.79021 9.49028C9.85671 9.42598 9.90947 9.34959 9.94547 9.26549C9.98147 9.18139 10 9.09123 10 9.00018C10 8.90913 9.98147 8.81897 9.94547 8.73487C9.90947 8.65077 9.85671 8.57439 9.79021 8.51009L1.22096 0.203368C1.15463 0.138903 1.07583 0.0877574 0.989072 0.0528602C0.902315 0.0179631 0.809309 0 0.71538 0C0.62145 0 0.528444 0.0179631 0.441688 0.0528602C0.354931 0.0877574 0.276128 0.138903 0.209794 0.203368Z"
                    fill="#2D2D2D"
                  />
                </svg>
              ),
              Day: ({ date, ...props }) => {
                const baseClassName = '';
                const periodClassName = getDayClassName(date);

                return (
                  <button
                    {...props}
                    className={`${baseClassName} ${periodClassName}`}
                    onClick={() => handleDayClick(date)}
                  >
                    {date.getDate()}
                  </button>
                );
              },
            }}
          />
        </div>
        {isDesktop && (
          <>
            <div className="w-[1px] bg-[#E3E3E3]" />
            <div className="flex-1 flex flex-col gap-[8px]">
              <div className="h4-def">События за выбранный период</div>
              <div className="n1-def">{getEventTitle()}</div>
              <div className="flex-1 text-[12px] text-[#2D2D2D] overflow-hidden relative">
                <p className="p-def whitespace-pre-line">
                  {renderEventContent()}
                </p>
              </div>
            </div>
          </>
        )}
        {!isDesktop && (
          <Drawer
            open={selectedPeriod != null}
            onClose={() => setSelectedPeriod(null)}
          >
            <DrawerContent>
              <div className="flex-1 flex flex-col gap-[8px] p-[20px]">
                <div className="h3-def self-center">
                  События за выбранный период
                </div>
                <div className="n1-def">{getEventTitle()}</div>
                <div className="flex-1 text-[12px] text-[#2D2D2D] overflow-hidden relative">
                  <p className="p-def whitespace-pre-line">
                    {renderEventContent()}
                  </p>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </Block>
  );
}
