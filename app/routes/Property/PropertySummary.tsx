import { useState } from 'react';
import Block from '../../components/Block';
import ButtonAccent from '../../components/ButtonAccent';
import ButtonIcon from '../../components/ButtonIcon';
import PropertyInfoLine from '../../components/PropertyInfoLine';
import FormatPrice, {
  InitiateChat,
  TOfferType,
  TPropertyType,
} from '~/lib/property';
import type { TProperty } from '~/lib/property';
import iconBookmark from '~/media/icons/icon-bookmark.svg';
import iconBookmarkChecked from '~/media/icons/icon-bookmark-checked.svg';
import iconCalendar from '~/media/icons/icon-calendar.svg';
import iconPosition from '~/media/icons/icon-position.svg';
import iconMore from '~/media/icons/icon-more.svg';
import Profile from '../../components/chat/Profile';
import ButtonIconText from './ButtonIconText';
import { useDesktop } from '~/hooks/useDesktop';
import { Input } from '../../components/ui/input';
import { useNavigate } from 'react-router';
import { ErrorToast } from '~/lib/api';
import { addBookmark, removeBookmark } from '~/lib/bookmarkApi';
import AutoButtonDropdown from '~/components/AutoButtonDropdown';
import { widePropertyCardDropdownOptions } from '~/components/common/propertyCard';
import DropdownElement from '~/components/DropdownElement';

interface PropertyOwnerContactProps {
  property: TProperty;
}

const propertyTypeOptions = [
  { value: TPropertyType.Flat, label: 'Квартира' },
  { value: TPropertyType.Detached, label: 'Дом' },
  { value: TPropertyType.Commercial, label: 'Коммерческая' },
];

export default function PropertySummary({
  property,
}: PropertyOwnerContactProps) {
  const isDesktop = useDesktop();
  const [message, setMessage] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(
    property.property.isBookmarked
  );
  const navigate = useNavigate();
  const attibutes = [
    {
      name: 'Тип недвижимости',
      value: propertyTypeOptions[property.property.propertyTypeId].label,
    },
    {
      name: 'Площадь',
      value: property.property.area + ' м²',
    },
    {
      name: 'Этаж',
      value: '' + property.property.address.floor,
    },
    {
      name: 'Комнат',
      value: '' + property.property.rooms,
    },
  ];
  const quickMessages = [
    'Торг уместен?',
    'Еще актуально?',
    'Когда могу посмотреть?',
  ];

  async function startChat(e: any) {
    e.stopPropagation();
    const { success, chatId } = await InitiateChat(property, message);
    if (success) {
      navigate(`/chat/${chatId}`);
    } else {
      ErrorToast('Не удалось отправить сообщение');
    }
  }

  async function bookmark(e: any) {
    e.stopPropagation();
    let response;
    if (isBookmarked) {
      response = await removeBookmark(property.property.id);
    } else {
      response = await addBookmark(property.property.id);
    }

    if (response.success) {
      setIsBookmarked(!isBookmarked);
    } else {
      ErrorToast('Не удалось добавить в закладки');
    }
  }

  return (
    <Block label="" isDesktop={isDesktop}>
      <div className="flex flex-col gap-[15px]">
        <div className="flex justify-between">
          <span className="n1-def">{property.property.name}</span>
          <span className="p-def">
            {property.type == TOfferType.Rent ? 'Аренда' : 'Продажа'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="h2-def">{FormatPrice(property)}</span>
        </div>

        <div className="flex flex-col gap-[15px] overflow-hidden">
          {attibutes.slice(0, 4).map((info, index) => (
            <PropertyInfoLine
              key={index}
              label={info.name}
              value={info.value}
            />
          ))}
        </div>

        <div className="flex flex-col gap-[11px]">
          <Profile
            isBig
            onClick={() => navigate(property.property.profileLink)}
            name={property.property.username}
            avatar="/app/media/images/placeholder.png"
            subtitle="4 объявления, 7 лет на сайте"
          />

          {property.property.chatExists === null ||
          property.property.chatExists === false ? (
            <>
              <div className="flex gap-[10px]">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Начните печатать"
                    className="w-[100%] p-def"
                  />
                </div>
                <ButtonAccent
                  label="Написать"
                  width="99px"
                  height="36px"
                  onClick={startChat}
                />
              </div>

              <div className="flex flex-wrap gap-[10px] justify-center">
                {quickMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(msg)}
                    className="text-[12px] text-[#707070] hover:text-[#2D2D2D] cursor-pointer"
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <ButtonAccent
              label="Перейти в чат"
              width="100%"
              height="36px"
              onClick={startChat}
            />
          )}
        </div>

        <div className="flex gap-[6px]">
          <ButtonIconText
            icon={isBookmarked ? iconBookmarkChecked : iconBookmark}
            onClick={bookmark}
            label="Сохранить"
            width="100%"
          />
          <ButtonIconText
            icon={iconCalendar}
            label="Календарь"
            width="100%"
            onClick={e => {
              e.stopPropagation();
              navigate(`#propertyCalendar`);
            }}
          />
          <ButtonIconText
            icon={iconPosition}
            label="На карте"
            width="100%"
            onClick={e => {
              e.stopPropagation();
              navigate(`#propertyMap`);
            }}
          />
          <AutoButtonDropdown
            buttonClassName="w-[100%]"
            button={
              <ButtonIconText icon={iconMore} label="Больше" width="100%" />
            }
          >
            {widePropertyCardDropdownOptions.map(el => {
              return <DropdownElement label={el.label} icon={el.icon} />;
            })}
          </AutoButtonDropdown>
        </div>
      </div>
    </Block>
  );
}
