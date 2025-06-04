import { useState } from 'react';
import Modal from './Modal';
import { Input } from './ui/input';
import ButtonAccent from './ButtonAccent';
import ButtonEmpty from './ButtonEmpty';
import ComboBox from './ComboBox';
import { ErrorToast } from '~/lib/api';
import { TCalendarState, calendarStateOptions } from '~/lib/calendar';

interface NewPeriodData {
  startDate: Date | undefined;
  endDate: Date | undefined;
  state: TCalendarState;
  name: string;
  description: string;
}

const initialPeriodData: NewPeriodData = {
  startDate: undefined,
  endDate: undefined,
  state: TCalendarState.Available,
  name: '',
  description: '',
};

interface CreatePeriodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (periodData: NewPeriodData) => Promise<boolean>;
  isDesktop: boolean;
}

export default function CreatePeriodModal({
  open,
  onOpenChange,
  onSave,
  isDesktop,
}: CreatePeriodModalProps) {
  const [newPeriodData, setNewPeriodData] =
    useState<NewPeriodData>(initialPeriodData);

  const handleClose = () => {
    onOpenChange(false);
    setNewPeriodData(initialPeriodData);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : undefined;
    setNewPeriodData(prev => ({
      ...prev,
      startDate: date,
      // Reset end date if it's before the new start date
      endDate:
        prev.endDate && date && prev.endDate < date ? undefined : prev.endDate,
    }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : undefined;

    if (date && newPeriodData.startDate && date < newPeriodData.startDate) {
      ErrorToast('Дата окончания должна быть позже даты начала');
      return;
    }

    setNewPeriodData(prev => ({ ...prev, endDate: date }));
  };

  const handleSave = async () => {
    const success = await onSave(newPeriodData);
    if (success) {
      handleClose();
    }
  };

  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const getMinEndDate = () => {
    if (!newPeriodData.startDate) return '';
    return formatDateForInput(newPeriodData.startDate);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Создать период"
      isDesktop={isDesktop}
      trigger={<div />}
    >
      <div className="flex flex-col gap-[15px]">
        <div className="flex justify-between items-center gap-[50px]">
          <label className="h5-def">Дата начала</label>
          <Input
            type="date"
            className="w-70"
            value={formatDateForInput(newPeriodData.startDate)}
            onChange={handleStartDateChange}
          />
        </div>

        <div className="flex justify-between items-center gap-[50px]">
          <label className="h5-def">Дата окончания</label>
          <Input
            type="date"
            className="w-70"
            value={formatDateForInput(newPeriodData.endDate)}
            onChange={handleEndDateChange}
            min={getMinEndDate()}
          />
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
          <ComboBox
            className="w-70"
            options={calendarStateOptions}
            value={newPeriodData.state}
            onChange={value =>
              setNewPeriodData(prev => ({ ...prev, state: value }))
            }
            placeholder="Выберите статус"
          />
        </div>

        <div className="flex gap-[10px] flex-1">
          <ButtonEmpty label="Отмена" onClick={handleClose} width="100%" />
          <ButtonAccent label="Сохранить" onClick={handleSave} width="100%" />
        </div>
      </div>
    </Modal>
  );
}
