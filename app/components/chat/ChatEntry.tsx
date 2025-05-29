import ButtonIconDropdown from '../ButtonIconDropdown';
import iconMore from '~/media/icons/icon-more.svg';
import iconWarn from '~/media/icons/icon-warn.svg';
import iconBan from '~/media/icons/icon-ban.svg';
import DropdownElement from '../DropdownElement';
import Profile from './Profile';
import type { Chat } from '~/lib/chat';
import { archiveChat } from '~/lib/chatApi';
import { formatLastMessageTime, truncateMessage } from '~/lib/chatUtils';

interface ChatEntryProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

export default function ChatEntry({
  chat,
  isSelected,
  onClick,
}: ChatEntryProps) {
  const handleReport = () => {
    // TODO: Implement report functionality
    console.log('Report chat:', chat.id);
  };

  const dropdownOptions = [
    {
      label: 'Пожаловаться',
      icon: iconWarn,
      onClick: handleReport,
    },
    {
      label: chat.isArchived ? 'Разархивировать' : 'Архивировать',
      icon: iconBan,
      onClick: () => {},
    },
  ];

  return (
    <div
      className={`flex justify-between items-center p-2 border-b border-neutral-200 cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-blue-50 border-blue-200' : ''
      } ${chat.isArchived ? 'opacity-60' : ''}`}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0">
        <Profile
          isBig={false}
          name={chat.otherUserName}
          avatar={`https://placehold.co/36x36`} // Using placeholder for now
          subtitle={chat.propertyAddress}
        />
      </div>

      <div className="ml-2" onClick={e => e.stopPropagation()}>
        <ButtonIconDropdown icon={iconMore}>
          {dropdownOptions.map((el, index) => (
            <DropdownElement
              key={index}
              label={el.label}
              icon={el.icon}
              onClick={el.onClick}
            />
          ))}
        </ButtonIconDropdown>
      </div>
    </div>
  );
}
