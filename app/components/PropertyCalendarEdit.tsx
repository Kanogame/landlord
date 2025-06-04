import { useState } from 'react';
import { useDesktop } from '~/hooks/useDesktop';
import { usePropertyCalendar } from '~/hooks/usePropertyCalendar';
import Block from './Block';
import ButtonAccent from './ButtonAccent';
import ButtonIcon from './ButtonIcon';
import CreatePeriodModal from './CreatePeriodModal';
import { Calendar } from '~/components/ui/calendar';
import { Drawer, DrawerContent } from './ui/drawer';
import iconTrash from '~/media/icons/icon-trash.svg';
import type { TCalendarResponse } from '~/lib/calendar';

interface PropertyCalendarEditProps {
  propertyId: number;
  initialCalendarData: TCalendarResponse;
  onCalendarUpdate?: (calendarData: TCalendarResponse) => void;
}

export default function PropertyCalendarEdit({
  propertyId,
  initialCalendarData,
  onCalendarUpdate,
}: PropertyCalendarEditProps) {
  const isDesktop = useDesktop();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const {
    selectedPeriod,
    setSelectedPeriod,
    handleMonthChange,
    handleDayClick,
    handleDeletePeriod,
    handleSavePeriod,
    getDayClassName,
  } = usePropertyCalendar(propertyId, initialCalendarData, onCalendarUpdate);

  const formatDateRange = (period: any) => {
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
                  onClick={() => setIsCreateModalOpen(true)}
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
                    onClick={() => setIsCreateModalOpen(true)}
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

      <CreatePeriodModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSave={handleSavePeriod}
        isDesktop={isDesktop}
      />
    </Block>
  );
}
