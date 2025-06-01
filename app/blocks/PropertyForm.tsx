import Block from '~/components/Block';
import TypeSwitcher from '~/components/TypeSwitcher';
import ComboBox from '~/components/ComboBox';
import NumberInput from '~/components/NumberInput';
import ButtonEmpty from '~/components/ButtonEmpty';
import {
  type TProperty,
  type TRentProperty,
  TOfferType,
  TPropertyType,
  TRentPeriod,
} from '~/lib/property';
import ButtonAccent from '~/components/ButtonAccent';
import { Input } from '~/components/ui/input';
import AddressInput from '~/components/AddressInput';
import { useState } from 'react';
import type { DaDataAddress, DaDataSuggestion } from 'react-dadata';
import { address, label } from 'motion/react-client';
import Toggle from '~/components/Toggle';
import MoneyInput from '~/components/MoneyInput';

const propertyTypeOptions = [
  { value: TPropertyType.Flat, label: 'Квартира' },
  { value: TPropertyType.Detached, label: 'Дом' },
  { value: TPropertyType.Commercial, label: 'Коммерческая' },
];

const propertyPeriodOptions = [
  { value: TRentPeriod.Day, label: 'День' },
  { value: TRentPeriod.Week, label: 'Неделя' },
  { value: TRentPeriod.Month, label: 'Месяц' },
];

interface PropertyFormProps {
  property: TProperty;
  onPropertyChange: (updates: Partial<TProperty>) => void;
  onSave: () => void;
  onDelete: () => void;
  isDesktop: boolean;
}

export default function PropertyForm({
  property,
  onPropertyChange,
  onSave,
  onDelete,
  isDesktop,
}: PropertyFormProps) {
  const handleFieldChange = (field: string, value: any) => {
    console.log(value);
    onPropertyChange({
      property: {
        ...property.property,
        [field]: value,
      },
    });
  };

  const [value, setValue] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >();

  const inputClassname = 'w-70';

  return (
    <Block isDesktop={isDesktop}>
      <div className="flex justify-between items-center gap-[50px]">
        <span className="h5-def">Название</span>
        <Input
          value={property.property.name}
          onChange={value => handleFieldChange('name', value.target.value)}
          placeholder="Введите название"
          className={inputClassname}
        />
      </div>

      <TypeSwitcher
        value={property.type}
        onChange={value => onPropertyChange({ type: value })}
      />

      <div className="flex justify-between items-center gap-[50px]">
        <span className="h5-def">Цена</span>
        <MoneyInput
          value={property.property.price}
          onChange={value => handleFieldChange('price', value)}
          className={inputClassname}
          placeholder="100 000"
        />
      </div>

      {property.type == TOfferType.Rent && (
        <>
          <div className="flex justify-between items-center gap-[50px]">
            <span className="h5-def">Период</span>

            <ComboBox
              options={propertyPeriodOptions}
              value={(property.property as TRentProperty).period}
              onChange={value =>
                handleFieldChange('period', value as TPropertyType)
              }
              placeholder="Выберите промежуток сдачи"
              className={inputClassname}
            />
          </div>

          <div className="flex justify-between items-center gap-[50px]">
            <span className="h5-def">ЖКХ включено?</span>

            <Toggle
              checked={(property.property as TRentProperty).services}
              onChange={checked => handleFieldChange('services', checked)}
            />
          </div>
        </>
      )}

      <div className="flex justify-between items-center gap-[50px]">
        <span className="h5-def">Тип невижимости</span>
        <ComboBox
          options={propertyTypeOptions}
          value={property.property.propertyTypeId}
          onChange={value =>
            handleFieldChange('propertyTypeId', value as TPropertyType)
          }
          placeholder="Выберите тип"
          className={inputClassname}
        />
      </div>

      <div className="flex justify-between items-center gap-[50px]">
        <span className="h5-def">Площадь</span>
        <NumberInput
          value={property.property.area}
          onChange={value => handleFieldChange('area', value)}
          className={inputClassname}
          placeholder="30"
          min={1}
          max={300}
          step={1}
        />
      </div>

      <div className="flex justify-between items-center gap-[50px]">
        <span className="h5-def">Этаж</span>
        <NumberInput
          value={property.property.address.floor}
          onChange={value =>
            onPropertyChange({
              property: {
                ...property.property,
                address: {
                  ...property.property.address,
                  floor: value ?? 1,
                },
              },
            })
          }
          placeholder="3"
          className={inputClassname}
          min={1}
          max={100}
          step={1}
        />
      </div>

      <div className="flex justify-between items-center gap-[50px]">
        <span className="h5-def">Адрес</span>
        <AddressInput
          value={value}
          onChange={setValue}
          className={inputClassname}
        />
      </div>

      <div className="flex justify-between items-center gap-[50px]">
        <span className="h5-def">Комнат</span>
        <NumberInput
          value={property.property.rooms}
          onChange={value => handleFieldChange('rooms', value)}
          className={inputClassname}
          placeholder="30"
          min={1}
          max={10}
          step={1}
        />
      </div>

      <div className="flex justify-between items-center gap-[50px]">
        <span className="h5-def">Есть парковка?</span>

        <Toggle
          checked={property.property.parking}
          onChange={checked => handleFieldChange('parking', checked)}
        />
      </div>

      <div className="flex gap-[10px] mt-[10px]">
        <ButtonEmpty
          label="Удалить"
          onClick={onDelete}
          width="50%"
          height="30px"
        />
        <ButtonAccent
          label="Сохранить"
          onClick={onSave}
          width="50%"
          height="30px"
        />
      </div>
    </Block>
  );
}
