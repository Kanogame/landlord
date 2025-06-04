import iconCalendar from '~/media/icons/icon-calendar.svg';
import iconShare from '~/media/icons/icon-share.svg';
import iconPosition from '~/media/icons/icon-position.svg';
import iconWarn from '~/media/icons/icon-warn.svg';
import iconBan from '~/media/icons/icon-ban.svg';

export const propertyCardDropdownOptions = [
  {
    label: 'Календарь',
    icon: iconCalendar,
  },
  {
    label: 'Поделиться',
    icon: iconShare,
  },
  {
    label: 'На карте',
    icon: iconPosition,
  },
  {
    label: 'Пожаловаться',
    icon: iconWarn,
  },
  {
    label: 'Скрыть',
    icon: iconBan,
  },
];

export const widePropertyCardDropdownOptions = [
  {
    label: 'Пожаловаться',
    icon: iconWarn,
  },
  {
    label: 'Скрыть',
    icon: iconBan,
  },
];

export const widePropertyCardOwnerDropdownOptions = [
  {
    label: 'Удалить',
    icon: iconBan,
  },
];

export const propertyCardOwnerDropdownOptions = [
  {
    label: 'Удалить',
    icon: iconBan,
  },
];
