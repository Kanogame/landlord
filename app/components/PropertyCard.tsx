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
import iconPencil from '~/media/icons/icon-pencil.svg';
import ButtonAccent from './ButtonAccent';
import ButtonIconDropdown from './ButtonIconDropdown';
import { FormatMoney } from '~/lib/money';
import DropdownElement from './DropdownElement';
import {
  propertyCardDropdownOptions,
  propertyCardOwnerDropdownOptions,
} from './common/propertyCard';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { addBookmark, removeBookmark } from '~/lib/bookmarkApi';
import PropertyStatusBadge from '../routes/Own/PropertyStatusBadge';
import ButtonEmpty from './ButtonEmpty';
import iconCalendar from '~/media/icons/icon-calendar.svg';
import iconShare from '~/media/icons/icon-share.svg';
import iconPosition from '~/media/icons/icon-position.svg';
import iconWarn from '~/media/icons/icon-warn.svg';
import iconBan from '~/media/icons/icon-ban.svg';
import { toast } from 'sonner';

interface PropertyCardProps {
  property: TProperty;
  className?: string;
}

export default function PropertyCard({
  property,
  className,
}: PropertyCardProps) {
  const prop: TRentProperty | TSellProperty = property.property;
  const [isBookmarked, setIsBookmarked] = useState(prop.isBookmarked);
  const navigate = useNavigate();

  async function startChat(e: any) {
    e.stopPropagation();
    const { success, chatId } = await InitiateChat(property, '');
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
      console.error('Bookmark operation failed:', response.message);
    }
  }

  return (
    <div
      className={`w-[200px] h-[300px] shrink-0 border-[1px] bg-white border-[#E3E3E3] rounded-[10px] p-[5px] flex flex-col items gap-[5px] cursor-pointer ${className}`}
      onClick={() => navigate('/property/' + prop.id)}
    >
      <div className="flex-[1_1_100px] rounded-[5px]">
        <ImageScroller images={prop.imageLinks} />
      </div>
      <div>
        <div className="n1-def overflow-hidden text-ellipsis text-nowrap">
          {prop.name}
        </div>
        <div className="p-light overflow-hidden text-ellipsis text-nowrap">
          {prop.address.displayAddress}
        </div>
      </div>

      {property.status !== undefined && (
        <PropertyStatusBadge status={property.status} />
      )}
      {property.type === TOfferType.Rent && (
        <>
          {property.status === undefined && (
            <div className="flex">
              <Stars rating={(prop as TRentProperty).rating} />
            </div>
          )}
          <div className="flex justify-between">
            <div className="n2-def">{FormatPrice(property)}</div>
            <div className="p-def">{FormatArea(prop.area)}</div>
          </div>
        </>
      )}

      {property.type === TOfferType.Sell && (
        <>
          <div className="flex justify-between">
            <div className="n2-def">{FormatMoney(prop.price)}</div>
            <div className="p-def">{FormatArea(prop.area)}</div>
          </div>
        </>
      )}

      {property.status !== undefined ? (
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
            {propertyCardOwnerDropdownOptions.map(el => {
              return <DropdownElement label={el.label} icon={el.icon} />;
            })}
          </ButtonIconDropdown>
        </div>
      ) : (
        <div className="flex gap-[5px]">
          <ButtonAccent label="Написать" width="100%" onClick={startChat} />
          <ButtonIcon
            icon={isBookmarked ? iconBookmarkChecked : iconBookmark}
            onClick={bookmark}
          />
          <ButtonIconDropdown icon={IconMore}>
            <DropdownElement
              label="Календарь"
              icon={iconCalendar}
              onClick={e => {
                e.stopPropagation();
                navigate(`/property/${prop.id}#propertyCalendar`);
              }}
            />
            <DropdownElement
              label="Поделиться"
              icon={iconShare}
              onClick={e => {
                e.stopPropagation();
                navigator.clipboard.writeText(
                  `${window.location.origin}/property/${prop.id}`
                );
                toast('Скопировано в буфер обмена');
              }}
            />
            <DropdownElement
              label="На карте"
              icon={iconPosition}
              onClick={e => {
                e.stopPropagation();
                navigate(`/property/${prop.id}#propertyMap`);
              }}
            />
            <DropdownElement label="Пожаловаться" icon={iconWarn} />
            <DropdownElement label="Скрыть" icon={iconBan} />
          </ButtonIconDropdown>
        </div>
      )}
    </div>
  );
}
