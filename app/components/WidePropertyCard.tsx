import FormatPrice, {
  FormatArea,
  InitiateChat,
  TOfferType,
  type TProperty,
  type TRentProperty,
  type TSellProperty,
} from '../lib/property';
import ImageScroller from './ImageScroller';
import { Stars } from './Stars';
import ButtonIcon from './ButtonIcon';
import iconBookmark from '~/media/icons/icon-bookmark.svg';
import iconBookmarkChecked from '~/media/icons/icon-bookmark-checked.svg';
import IconMore from '~/media/icons/icon-more.svg';
import ButtonAccent from './ButtonAccent';
import ButtonIconDropdown from './ButtonIconDropdown';
import iconCalendar from '~/media/icons/icon-calendar.svg';
import iconShare from '~/media/icons/icon-share.svg';
import iconPosition from '~/media/icons/icon-position.svg';
import iconPencil from '~/media/icons/icon-pencil.svg';
import ArrowLink from './Link';
import {
  widePropertyCardDropdownOptions,
  widePropertyCardOwnerDropdownOptions,
} from './common/propertyCard';
import DropdownElement from './DropdownElement';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { addBookmark, removeBookmark } from '~/lib/bookmarkApi';
import { toast } from 'sonner';
import PropertyStatusBadge from '../routes/Own/PropertyStatusBadge';
import ButtonEmpty from './ButtonEmpty';
import { ErrorToast } from '~/lib/api';

export default function WidePropertyCard(props: { property: TProperty }) {
  const type = props.property.type;
  const prop: TRentProperty | TSellProperty = props.property.property;
  const [isBookmarked, setIsBookmarked] = useState(prop.isBookmarked);
  const navigate = useNavigate();

  async function startChat() {
    const { success, chatId } = await InitiateChat(props.property, '');
    if (success) {
      navigate(`/chat/${chatId}`);
    }
  }

  async function bookmark(e: any) {
    e.stopPropagation();
    let response;
    if (isBookmarked) {
      response = await removeBookmark(prop.id);
    } else {
      response = await addBookmark(prop.id);
    }

    if (response.success) {
      setIsBookmarked(!isBookmarked);
    } else {
      ErrorToast('Не удалось добавить в закладки');
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

        {type === TOfferType.Rent && props.property.status === undefined && (
          <div className="flex">
            <Stars rating={(prop as TRentProperty).rating} />
          </div>
        )}
        {props.property.status !== undefined && (
          <PropertyStatusBadge status={props.property.status} />
        )}
        <div className={`min-w-[0] p-light ${type === TOfferType.Rent || props.property.status !== undefined ? "line-clamp-1" : "line-clamp-2"}`}>
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
            {(+(prop.price.amount.slice(0, -3)) / prop.area).toFixed(1) + ' ₽/м²'}
          </div>
          <div className="p-def">{FormatArea(prop.area)}</div>
        </div>

        {props.property.status !== undefined ? (
          <div className="flex gap-[5px]">
            <ButtonEmpty
              label="Открыть страницу"
              width="100%"
              onClick={e => {
                e.stopPropagation();
                navigate(`/property/${prop.id}`);
              }}
            />
            <ButtonIcon
              icon={iconPencil}
              onClick={e => {
                e.stopPropagation();
                navigate(`/editor/${prop.id}`);
              }}
            />
            <ButtonIconDropdown icon={IconMore}>
              {widePropertyCardOwnerDropdownOptions.map(el => {
                return <DropdownElement label={el.label} icon={el.icon} />;
              })}
            </ButtonIconDropdown>
          </div>
        ) : (
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
              <ButtonIcon
                icon={isBookmarked ? iconBookmarkChecked : iconBookmark}
                onClick={bookmark}
              />
              <ButtonIcon
                icon={iconCalendar}
                onClick={e => {
                  e.stopPropagation();
                  navigate(`/property/${prop.id}#propertyCalendar`);
                }}
              />
              <ButtonIcon
                icon={iconShare}
                onClick={e => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(
                    `${window.location.origin}/property/${prop.id}`
                  );
                  toast('Скопировано в буфер обмена');
                }}
              />
              <ButtonIcon
                icon={iconPosition}
                onClick={e => {
                  e.stopPropagation();
                  navigate(`/property/${prop.id}#propertyMap`);
                }}
              />
              <ButtonIconDropdown icon={IconMore}>
                {widePropertyCardDropdownOptions.map(el => {
                  return <DropdownElement label={el.label} icon={el.icon} />;
                })}
              </ButtonIconDropdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
