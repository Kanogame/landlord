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
  onChatUpdate: () => void;
}

export default function ChatEntry({
  chat,
  isSelected,
  onClick,
  onChatUpdate,
}: ChatEntryProps) {
  const handleArchive = async () => {
    try {
      //await archiveChat({ chatId: chat.id, isArchived: !chat.isArchived });
      onChatUpdate();
    } catch (error) {
      console.error('Error archiving chat:', error);
    }
  };

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
      onClick: handleArchive,
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
        
        {chat.lastMessage && (
          <div className="ml-12 mt-1">
            <div className={`text-sm truncate ${
              chat.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-600'
            }`}>
              {truncateMessage(chat.lastMessage.content, 40)}
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-400">
                {formatLastMessageTime(chat.lastMessage.sentDate)}
              </span>
              {chat.unreadCount > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="ml-2" onClick={(e) => e.stopPropagation()}>
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