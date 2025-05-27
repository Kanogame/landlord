import ButtonIconDropdown from '../ButtonIconDropdown';
import type { ChatData } from './chatData.ts';
import iconMore from '~/media/icons/icon-more.svg';
import iconWarn from '~/media/icons/icon-warn.svg';
import iconBan from '~/media/icons/icon-ban.svg';
import DropdownElement from '../DropdownElement';
import Profile from './Profile';

interface ChatEntryProps {
  chat: ChatData;
  isSelected: boolean;
  onClick: () => void;
}

const dropdownOptions = [
  {
    label: 'Пожаловаться',
    icon: iconWarn,
  },
  {
    label: 'Скрыть',
    icon: iconBan,
  },
];

export default function ChatEntry({
  chat,
  isSelected,
  onClick,
}: ChatEntryProps) {
  return (
    <div
      className={`flex justify-between items-center p-2 border-b border-neutral-200 cursor-pointer hover:bg-gray-50 ${
        isSelected ? 'bg-blue-50' : ''
      }`}
      onClick={onClick}
    >
      <Profile
        isBig={false}
        name={chat.name}
        avatar={chat.avatar}
        subtitle={chat.adTitle}
      />

      <ButtonIconDropdown icon={iconMore}>
        {dropdownOptions.map(el => {
          return <DropdownElement label={el.label} icon={el.icon} />;
        })}
      </ButtonIconDropdown>
    </div>
  );
}
