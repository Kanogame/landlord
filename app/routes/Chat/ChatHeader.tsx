import { useNavigate } from 'react-router';
import ButtonEmpty from '../../components/ButtonEmpty';
import ButtonIconDropdown from '../../components/ButtonIconDropdown';
import iconMore from '~/media/icons/icon-more.svg';
import iconWarn from '~/media/icons/icon-warn.svg';
import iconBan from '~/media/icons/icon-ban.svg';
import DropdownElement from '../../components/DropdownElement';
import Profile from '../../components/chat/Profile';
import type { Chat } from '~/lib/chat';
import { useDesktop } from '~/hooks/useDesktop';
import ButtonIcon from '../../components/ButtonIcon';
import iconArrowLeft from '~/media/icons/icon-arrow-left.svg';

interface ChatHeaderProps {
  chat: Chat;
  onBack: () => void;
  onArchive: () => void;
}

export default function ChatHeader({
  chat,
  onBack,
  onArchive,
}: ChatHeaderProps) {
  const navigate = useNavigate();
  const isDesktop = useDesktop();

  const dropdownOptions = [
    {
      label: chat.isArchived ? 'Разархивировать' : 'Архивировать',
      icon: iconBan,
      onClick: onArchive,
    },
  ];

  return (
    <div className="flex items-center justify-between border-b pb-[10px] border-[#E3E3E3]">
      <div className="flex min-w-0 gap-2">
        <img src={iconArrowLeft} onClick={onBack} />
        <Profile
          isBig={false}
          name={chat.otherUserName}
          avatar={`https://placehold.co/36x36`} // Using placeholder for now
          subtitle={chat.propertyAddress}
          onClick={() => navigate(`/user/${chat.otherUserId}`)}
        />
      </div>

      <div className="flex items-center gap-2">
        {isDesktop && (
          <ButtonEmpty
            label="Открыть страницу объявления"
            width="240px"
            height="28px"
            onClick={() => navigate(`/property/${chat.propertyId}`)}
          />
        )}
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
