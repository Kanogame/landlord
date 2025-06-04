import React, { useState } from 'react';
import Block from '../../components/Block';
import PropertyInfoLine from '../../components/PropertyInfoLine';
import {
  TOfferType,
  TPropertyType,
  TRentPeriod,
  type TProperty,
  type TRentProperty,
} from '~/lib/property';
import ArrowDown from '~/media/icons/icon-arrow-down.svg';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '../../components/ui/drawer';

interface PropertyDetailsProps {
  property: TProperty;
  isDesktop: boolean;
  children?: React.ReactNode;
}

const propertyTypeOptions = [
  { value: TPropertyType.Flat, label: 'Квартира' },
  { value: TPropertyType.Detached, label: 'Дом' },
  { value: TPropertyType.Commercial, label: 'Коммерческая' },
];

export default function PropertyDetails({
  property,
  isDesktop,
  children,
}: PropertyDetailsProps) {
  const [showFull, setShowFull] = useState(false);

  const attibutes = [
    {
      name: 'Площадь',
      value: property.property.area + ' м²',
    },
    {
      name: 'Тип недвижимости',
      value: propertyTypeOptions[property.property.propertyTypeId].label,
    },
    {
      name: 'Этаж',
      value: '' + property.property.address.floor,
    },
    {
      name: 'Комнат',
      value: '' + property.property.rooms,
    },
    {
      name: 'Парковка',
      value: property.property.parking ? 'Да' : 'Нет',
    },
    ...property.property.propertyAttributes,
  ];
  if (property.type == TOfferType.Rent) {
    attibutes.push({
      name: 'ЖКХ включено',
      value: (property.property as TRentProperty).services ? 'Да' : 'Нет',
    });
  }
  return (
    <>
      {!isDesktop && (
        <Drawer open={showFull} onClose={() => setShowFull(false)}>
          <DrawerContent>
            <div className="flex flex-col gap-[40px] p-[20px] overflow-auto">
              <div className="h3-def self-center">О недвижимости</div>
              {attibutes.map((detail, index) => (
                <PropertyInfoLine
                  key={index}
                  label={detail.name}
                  value={detail.value}
                />
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      )}
      <Block label="О квартире" isDesktop={isDesktop}>
        <div className="flex flex-wrap gap-[40px]">
          {(showFull && isDesktop ? attibutes : attibutes.slice(0, 6)).map(
            (detail, index) => (
              <div className="flex-[1_0_300px]">
                <PropertyInfoLine
                  key={index}
                  label={detail.name}
                  value={detail.value}
                />
              </div>
            )
          )}
        </div>

        {property.property.propertyAttributes.length > 2 && (
          <div className="flex items-center justify-center gap-[5px] cursor-pointer mt-[15px]">
            <span
              className="p-def"
              onClick={() => {
                setShowFull(!showFull);
              }}
            >
              {showFull ? 'Скрыть' : 'Показать полностью'}
            </span>
            <img src={ArrowDown} alt="expand" className="w-[19px] h-[16px]" />
          </div>
        )}
        {children}
      </Block>
    </>
  );
}
