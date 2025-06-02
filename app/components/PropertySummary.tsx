import { useState } from 'react';
import Block from './Block';
import ButtonAccent from './ButtonAccent';
import ButtonIcon from './ButtonIcon';
import PropertyInfoLine from './PropertyInfoLine';
import FormatPrice, {
  InitiateChat,
  TOfferType,
  TPropertyType,
} from '~/lib/property';
import type { TProperty } from '~/lib/property';
import iconBookmark from '~/media/icons/icon-bookmark.svg';
import iconCalendar from '~/media/icons/icon-calendar.svg';
import iconPosition from '~/media/icons/icon-position.svg';
import iconMore from '~/media/icons/icon-more.svg';
import Profile from './chat/Profile';
import ButtonIconText from './ButtonIconText';
import { useDesktop } from '~/hooks/useDesktop';
import { Input } from './ui/input';
import { useNavigate } from 'react-router';
import { ErrorToast } from '~/lib/api';

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
            name={property.property.username}
            avatar="/app/media/images/placeholder.png"
            subtitle="4 объявления, 7 лет на сайте"
          />

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
        </div>

        <div className="flex gap-[6px]">
          <ButtonIconText icon={iconBookmark} label="Сохранить" width="100%" />
          <ButtonIconText icon={iconCalendar} label="Календарь" width="100%" />
          <ButtonIconText icon={iconPosition} label="На карте" width="100%" />
          <ButtonIconText icon={iconMore} label="Больше" width="100%" />
        </div>
      </div>
    </Block>
  );
}
