import { useNavigate } from 'react-router';
import ButtonEmpty from '../ButtonEmpty';
import ButtonIconDropdown from '../ButtonIconDropdown';
import type { ChatData } from './chatData.ts';
import iconMore from '~/media/icons/icon-more.svg';
import iconWarn from '~/media/icons/icon-warn.svg';
import iconBan from '~/media/icons/icon-ban.svg';
import DropdownElement from '../DropdownElement';
import Profile from './Profile';

interface ChatHeaderProps {
  chat: ChatData;
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

export default function ChatHeader({ chat }: ChatHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between border-b pb-[10px] border-[#E3E3E3]">
      <Profile
        isBig={false}
        name={chat.name}
        avatar={chat.avatar}
        subtitle={chat.adTitle}
      />

      <div className="flex items-center gap-2">
        <ButtonEmpty
          label="Открыть страницу объявления"
          width="240px"
          height="28px"
          onClick={() => navigate('property')}
        />
        <ButtonIconDropdown icon={iconMore}>
          {dropdownOptions.map(el => {
            return <DropdownElement label={el.label} icon={el.icon} />;
          })}
        </ButtonIconDropdown>
      </div>
    </div>
  );
}
