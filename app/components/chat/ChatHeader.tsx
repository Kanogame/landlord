import { useNavigate } from 'react-router';
import ButtonEmpty from '../ButtonEmpty';
import ButtonIconDropdown from '../ButtonIconDropdown';
import iconMore from '~/media/icons/icon-more.svg';
import iconWarn from '~/media/icons/icon-warn.svg';
import iconBan from '~/media/icons/icon-ban.svg';
import DropdownElement from '../DropdownElement';
import Profile from './Profile';
import type { Chat } from '~/lib/chat';
import { archiveChat } from '~/lib/chatApi';

interface ChatHeaderProps {
  chat: Chat;
  onChatUpdate?: () => void;
}

export default function ChatHeader({ chat, onChatUpdate }: ChatHeaderProps) {
  const navigate = useNavigate();

  const handleArchive = async () => {
    try {
      //await archiveChat({ chatId: chat.id, isArchived: !chat.isArchived });
      onChatUpdate?.();
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
    <div className="flex items-center justify-between border-b pb-[10px] border-[#E3E3E3]">
      <Profile
        isBig={false}
        name={chat.otherUserName}
        avatar={`https://placehold.co/36x36`} // Using placeholder for now
        subtitle={chat.propertyAddress}
      />

      <div className="flex items-center gap-2">
        <ButtonEmpty
          label="Открыть страницу объявления"
          width="240px"
          height="28px"
          onClick={() => navigate(`/property/${chat.propertyId}`)}
        />
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