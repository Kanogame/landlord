import { useState, useMemo } from 'react';
import { useDesktop } from '~/hooks/useDesktop';
import Block from './Block';
import ButtonAccent from './ButtonAccent';
import ButtonEmpty from './ButtonEmpty';
import ButtonIcon from './ButtonIcon';
import Modal from './Modal';
import { Calendar } from '~/components/ui/calendar';
import { Input } from './ui/input';
import NumberInput from './NumberInput';
import {
  getCalendarPeriods,
  createCalendarPeriod,
  deleteCalendarPeriod,
} from '~/lib/calendarApi';
import { ErrorToast } from '~/lib/api';
import type { TCalendarResponse, TCalendarPeriod } from '~/lib/calendar';
import type { CreateCalendarPeriodRequest } from '~/lib/calendarApi';
import { Drawer, DrawerContent } from './ui/drawer';
import iconTrash from '~/media/icons/icon-trash.svg';
import iconPencil from '~/media/icons/icon-pencil.svg';

interface PropertyCalendarEditProps {
  propertyId: number;
  initialCalendarData: TCalendarResponse;
  onCalendarUpdate?: (calendarData: TCalendarResponse) => void;
}

interface NewPeriodData {
  startDate: Date | undefined;
  endDate: Date | undefined;
  state: number;
  name: string;
  description: string;
  attachedUserId?: number;
}

const initialPeriodData: NewPeriodData = {
  startDate: undefined,
  endDate: undefined,
  state: 1,
  name: '',
  description: '',
  attachedUserId: undefined,
};

export default function PropertyCalendarEdit({
  propertyId,
  initialCalendarData,
  onCalendarUpdate,
}: PropertyCalendarEditProps) {
  const isDesktop = useDesktop();
  const [calendarData, setCalendarData] =
    useState<TCalendarResponse>(initialCalendarData);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState<TCalendarPeriod | null>(
    null
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPeriodData, setNewPeriodData] =
    useState<NewPeriodData>(initialPeriodData);
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);

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

  // Handle create new period
  const handleCreatePeriod = () => {
    setNewPeriodData(initialPeriodData);
    setIsSelectingStartDate(true);
    setIsCreateModalOpen(true);
  };

  // Handle date selection in create modal
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (isSelectingStartDate) {
      setNewPeriodData(prev => ({
        ...prev,
        startDate: date,
        endDate: undefined,
      }));
      setIsSelectingStartDate(false);
    } else {
      if (newPeriodData.startDate && date >= newPeriodData.startDate) {
        setNewPeriodData(prev => ({ ...prev, endDate: date }));
      } else {
        ErrorToast('Дата окончания должна быть позже даты начала');
      }
    }
  };

  // Handle save new period
  const handleSavePeriod = async () => {
    if (
      !newPeriodData.startDate ||
      !newPeriodData.endDate ||
      !newPeriodData.name.trim()
    ) {
      ErrorToast('Заполните все обязательные поля');
      return;
    }

    try {
      const request: CreateCalendarPeriodRequest = {
        propertyId,
        startDate: newPeriodData.startDate.toISOString(),
        endDate: new Date(
          newPeriodData.endDate.getFullYear(),
          newPeriodData.endDate.getMonth(),
          newPeriodData.endDate.getDate(),
          23,
          59,
          59
        ).toISOString(),
        state: newPeriodData.state,
        name: newPeriodData.name,
        description: newPeriodData.description,
        attachedUserId: newPeriodData.attachedUserId,
      };

      const response = await createCalendarPeriod(request);

      if (response.success) {
        setIsCreateModalOpen(false);
        setNewPeriodData(initialPeriodData);
        await loadCalendarData(currentMonth);
      } else {
        ErrorToast(response.message || 'Ошибка при создании периода');
      }
    } catch (error) {
      ErrorToast('Ошибка при создании периода');
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
      return 'Выберите период на календаре для редактирования или создайте новый';
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
      return 'Управление периодами';
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
              <div className="h4-def">Управление периодами</div>
              <div className="n1-def">{getEventTitle()}</div>
              <div className="flex-1 text-[12px] text-[#2D2D2D] overflow-hidden relative">
                <p className="p-def whitespace-pre-line">
                  {renderEventContent()}
                </p>
              </div>
              <div className="flex gap-[10px] mt-[10px]">
                <ButtonAccent
                  label="Создать период"
                  onClick={handleCreatePeriod}
                  width="100%"
                />
                {selectedPeriod && (
                  <ButtonIcon
                    icon={iconTrash}
                    onClick={() => handleDeletePeriod(selectedPeriod.id)}
                  />
                )}
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
                <div className="h3-def self-center">Управление периодами</div>
                <div className="n1-def">{getEventTitle()}</div>
                <div className="flex-1 text-[12px] text-[#2D2D2D] overflow-hidden relative">
                  <p className="p-def whitespace-pre-line">
                    {renderEventContent()}
                  </p>
                </div>
                <div className="flex gap-[10px] mt-[10px]">
                  <ButtonAccent
                    label="Создать период"
                    onClick={handleCreatePeriod}
                    width="100%"
                  />
                  {selectedPeriod && (
                    <ButtonIcon
                      icon={iconTrash}
                      onClick={() => handleDeletePeriod(selectedPeriod.id)}
                    />
                  )}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>

      {/* Create Period Modal */}
      {/* Create Period Modal */}
      <Modal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        title="Создать период"
        isDesktop={isDesktop}
        trigger={<div />}
      >
        <div className="flex flex-col gap-[15px]">
          <div className="flex flex-col gap-[10px]">
            <label className="h5-def">
              {isSelectingStartDate
                ? 'Выберите дату начала'
                : 'Выберите дату окончания'}
            </label>
            <Calendar
              mode="single"
              selected={
                isSelectingStartDate
                  ? newPeriodData.startDate
                  : newPeriodData.endDate
              }
              onSelect={handleDateSelect}
              className="w-full"
              disabled={date => {
                if (isSelectingStartDate) return false;
                return (
                  !newPeriodData.startDate || date < newPeriodData.startDate
                );
              }}
            />
            {newPeriodData.startDate && newPeriodData.endDate && (
              <div className="text-sm text-gray-600">
                Период: {newPeriodData.startDate.toLocaleDateString('ru-RU')} -{' '}
                {newPeriodData.endDate.toLocaleDateString('ru-RU')}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center gap-[50px]">
            <label className="h5-def">Название</label>
            <Input
              className="w-70"
              value={newPeriodData.name}
              onChange={e =>
                setNewPeriodData(prev => ({ ...prev, name: e.target.value }))
              }
              placeholder="Название периода"
            />
          </div>

          <div className="flex justify-between items-center gap-[50px]">
            <label className="h5-def">Описание</label>
            <Input
              className="w-70"
              value={newPeriodData.description}
              onChange={e =>
                setNewPeriodData(prev => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Описание периода"
            />
          </div>

          <div className="flex justify-between items-center gap-[50px]">
            <label className="h5-def">Статус</label>
            <NumberInput
              className="w-70"
              value={newPeriodData.state}
              onChange={value =>
                setNewPeriodData(prev => ({ ...prev, state: value }))
              }
            />
          </div>

          <div className="flex justify-between items-center gap-[50px]">
            <label className="h5-def">ID пользователя</label>
            <NumberInput
              className="w-70"
              value={newPeriodData.attachedUserId || 0}
              onChange={value =>
                setNewPeriodData(prev => ({
                  ...prev,
                  attachedUserId: value === 0 ? undefined : value,
                }))
              }
            />
          </div>

          <div className="flex gap-[10px] flex-1">
            <ButtonEmpty
              label="Отмена"
              onClick={() => {
                setIsCreateModalOpen(false);
                setNewPeriodData(initialPeriodData);
                setIsSelectingStartDate(true);
              }}
              width="100%"
            />
            <ButtonAccent
              label="Сохранить"
              onClick={handleSavePeriod}
              width="100%"
            />
          </div>
        </div>
      </Modal>
    </Block>
  );
}
