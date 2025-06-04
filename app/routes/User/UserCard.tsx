import Avatar from '~/components/chat/Avatar';
import ButtonAccent from '~/components/ButtonAccent';
import Block from '~/components/Block';
import { useDesktop } from '~/hooks/useDesktop';
import IconMore from '~/media/icons/icon-more.svg';
import iconCalendar from '~/media/icons/icon-calendar.svg';
import iconShare from '~/media/icons/icon-share.svg';
import ButtonIcon from '~/components/ButtonIcon';
import { toast } from 'sonner';
import { widePropertyCardDropdownOptions } from '~/components/common/propertyCard';
import DropdownElement from '~/components/DropdownElement';
import ButtonIconDropdown from '~/components/ButtonIconDropdown';

export interface UserData {
  fullName: string;
  activePropertiesCount: number;
  rentedSoldRentEndingCount: number;
  experience: string;
  avatar?: string;
}

interface UserCardProps {
  user: UserData;
  userId: number;
}

export default function UserCard({ user, userId }: UserCardProps) {
  const isDesktop = useDesktop();
  return (
    <Block isDesktop={isDesktop}>
      <div
        className={
          isDesktop
            ? 'flex-1 flex gap-5 relative'
            : 'flex flex-col items-center gap-5'
        }
      >
        <Avatar
          avatar={user.avatar || 'https://placehold.co/120x120'}
          size={120}
        />

        <div className="flex-1 flex flex-col">
          <h2 className={isDesktop ? 'h2-def' : 'h3-def'}>{user.fullName}</h2>

          <div className={isDesktop ? 'h5-light' : 'h5-light text-center'}>
            На сайте: {user.experience}
            <br />
            Успешных сделок: {user.rentedSoldRentEndingCount}
            <br />
            Открыто объявлений: {user.activePropertiesCount}
          </div>
        </div>
        <div
          className={
            isDesktop
              ? 'flex gap-[5px] absolute bottom-0 right-0'
              : 'flex gap-[5px]'
          }
        >
          <ButtonIcon
            icon={iconShare}
            onClick={e => {
              e.stopPropagation();
              navigator.clipboard.writeText(`/user/${userId}`);
              toast('Скопировано в буфер обмена');
            }}
          />
          <ButtonIconDropdown icon={IconMore}>
            {widePropertyCardDropdownOptions.map(el => {
              return <DropdownElement label={el.label} icon={el.icon} />;
            })}
          </ButtonIconDropdown>
        </div>
      </div>
    </Block>
  );
}
