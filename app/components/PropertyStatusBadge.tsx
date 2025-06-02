import { TPropertyStatus } from '../lib/property';

interface PropertyStatusBadgeProps {
  status: TPropertyStatus;
  className?: string;
}

const statusConfig = {
  [TPropertyStatus.Draft]: {
    label: 'Черновик',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600',
    borderColor: 'border-gray-200',
  },
  [TPropertyStatus.Active]: {
    label: 'Активно',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
  },
  [TPropertyStatus.Rented]: {
    label: 'Сдано',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
  },
  [TPropertyStatus.RentEnding]: {
    label: 'Заканчивается',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
  },
  [TPropertyStatus.Sold]: {
    label: 'Продано',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
  },
  [TPropertyStatus.Hidden]: {
    label: 'Скрыто',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-500',
    borderColor: 'border-gray-200',
  },
  [TPropertyStatus.UnderMaintenance]: {
    label: 'На обслуживании',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
  },
};

export default function PropertyStatusBadge({
  status,
  className = '',
}: PropertyStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div>
      <span
        className={`
        inline-flex items-center px-[8px] py-[2px] rounded-full p-def border
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        ${className}
      `}
      >
        {config.label}
      </span>
    </div>
  );
}
