import { useNavigate } from 'react-router';
import ButtonEmpty from '../../components/ButtonEmpty';
import ButtonIconDropdown from '../../components/ButtonIconDropdown';
import iconMore from '~/media/icons/icon-more.svg';
import iconBan from '~/media/icons/icon-ban.svg';
import DropdownElement from '../../components/DropdownElement';
import Profile from '../../components/chat/Profile';
import type { Chat } from '~/lib/chat';
import { useDesktop } from '~/hooks/useDesktop';
import iconArrowLeft from '~/media/icons/icon-arrow-left.svg';
import { generateInviteLink } from '~/lib/property';

interface ChatHeaderProps {
  chat: Chat;
  onBack: () => void;
  onArchive: () => void;
  isOwner?: boolean; // Add this prop to determine if current user is the property owner
}

export default function ChatHeader({
  chat,
  onBack,
  onArchive,
  isOwner = false,
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

  const handleInviteLink = () => {
    const inviteLink = generateInviteLink(chat.propertyId);
    navigate(inviteLink);
  };

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
        {isDesktop && !isOwner && (
          <ButtonEmpty
            label="Открыть страницу объявления"
            width="240px"
            height="28px"
            onClick={() => navigate(`/property/${chat.propertyId}`)}
          />
        )}
        {isDesktop && isOwner && (
          <ButtonEmpty
            label="Скопировать ссылку для приглашения на аренду"
            width="280px"
            height="28px"
            onClick={handleInviteLink}
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
