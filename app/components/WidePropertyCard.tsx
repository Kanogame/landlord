import FormatPrice, {
  FormatArea,
  InitiateChat,
  TOfferType,
  type TProperty,
  type TRentProperty,
  type TSellProperty,
} from '../lib/property';
import ImageScroller from './ImageScroller';
import { Stars } from './stars';
import ButtonIcon from './ButtonIcon';
import iconBookmark from '~/media/icons/icon-bookmark.svg';
import IconMore from '~/media/icons/icon-more.svg';

import ButtonAccent from './ButtonAccent';
import ButtonIconDropdown from './ButtonIconDropdown';
import { FormatMoney } from '~/lib/money';
import { GetOwnerString } from '~/lib/user';
import iconCalendar from '~/media/icons/icon-calendar.svg';
import iconShare from '~/media/icons/icon-share.svg';
import iconPosition from '~/media/icons/icon-position.svg';
import ArrowLink from './Link';
import { widePropertyCardDropdownOptions } from './common/propertyCard';
import DropdownElement from './DropdownElement';
import { useNavigate } from 'react-router';

export default function WidePropertyCard(props: { property: TProperty }) {
  const type = props.property.type;
  const prop: TRentProperty | TSellProperty = props.property.property;
  const navigate = useNavigate();

  async function startChat() {
    const { success, chatId } = await InitiateChat(props.property, '');
    if (success) {
      navigate(`/chat/${chatId}`);
    }
  }

  return (
    <div
      className="bg-white block-shadow rounded-[15px] p-[10px] h-[170px] flex gap-[5px] cursor-pointer min-w-[0]"
      onClick={() => navigate('/property/' + prop.id)}
    >
      <div className="flex-[0_0_170px] rounded-[5px]">
        <ImageScroller images={prop.imageLinks} />
      </div>

      <div className="min-w-[0]  flex flex-col flex-[1_0] gap-[5px]">
        <div className="n1-def overflow-hidden text-ellipsis text-nowrap">
          {prop.name}
        </div>

        <div className="p-light flex-[1_0] overflow-hidden text-ellipsis text-nowrap ">
          {prop.address.displayAddress}
        </div>

        {type === TOfferType.Rent && (
          <div className="flex">
            <Stars rating={(prop as TRentProperty).raiting} />
          </div>
        )}
        <div className="min-w-[0] p-light overflow-hidden text-ellipsis text-nowrap">
          {prop.desc}
        </div>

        <div className="flex p-def">{prop.username}, хозяин</div>
        <ArrowLink
          link={{
            label: 'Профиль',
            href: prop.profileLink,
          }}
          big={false}
        />
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex flex-col items-end">
          <div className="n1-def">{FormatPrice(props.property)}</div>
          <div className="p-def">
            {(+prop.price.amount / prop.area).toFixed(1) + ' ₽/м²'}
          </div>
          <div className="p-def">{FormatArea(prop.area)}</div>
        </div>
        <div className="flex flex-col gap-[5px]">
          <ButtonAccent
            label="Написать"
            width="100%"
            onClick={e => {
              e.stopPropagation();
              startChat();
            }}
          />
          <div className="flex gap-[5px]">
            <ButtonIcon icon={iconBookmark} />
            <ButtonIcon icon={iconCalendar} />
            <ButtonIcon icon={iconShare} />
            <ButtonIcon icon={iconPosition} />
            <ButtonIconDropdown icon={IconMore}>
              {widePropertyCardDropdownOptions.map(el => {
                return <DropdownElement label={el.label} icon={el.icon} />;
              })}
            </ButtonIconDropdown>
          </div>
        </div>
      </div>
    </div>
  );
}
