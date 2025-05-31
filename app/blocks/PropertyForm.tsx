import Block from '~/components/Block';
import TypeSwitcher from '~/components/TypeSwitcher';
import ComboBox from '~/components/ComboBox';
import NumberInput from '~/components/NumberInput';
import TextInput from '~/components/TextInput';
import Button from '~/components/Button';
import ButtonEmpty from '~/components/ButtonEmpty';
import { TProperty, TOfferType, TPropertyType } from '~/lib/property';

const propertyTypeOptions = [
  { value: TPropertyType.Flat, label: 'Квартира' },
  { value: TPropertyType.Detached, label: 'Дом' },
  { value: TPropertyType.Commercial, label: 'Коммерческая' },
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
    onPropertyChange({
      property: {
        ...property.property,
        [field]: value,
      },
    });
  };

  return (
    <Block isDesktop={isDesktop}>
      <div
        className="w-[380px] p-[20px] bg-white rounded-[20px] flex flex-col gap-[10px]"
        style={{
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Title Field */}
        <div className="flex justify-between items-center gap-[50px]">
          <span className="text-[#2D2D2D] text-[14px] font-normal font-['Fira_Sans']">
            Название
          </span>
          <TextInput
            value={property.property.title}
            onChange={value => handleFieldChange('title', value)}
            placeholder="Шаблон"
            className="flex-1 h-[30px]"
          />
        </div>

        {/* Type Switcher */}
        <TypeSwitcher
          value={property.type}
          onChange={value => onPropertyChange({ type: value })}
        />

        {/* Property Type */}
        <div className="flex justify-between items-center gap-[50px]">
          <span className="text-[#2D2D2D] text-[14px] font-normal font-['Fira_Sans']">
            Тип
          </span>
          <ComboBox
            options={propertyTypeOptions}
            value={property.property.propertyType}
            onChange={value => handleFieldChange('propertyType', value)}
            placeholder="Шаблон"
            className="flex-1 h-[30px]"
          />
        </div>

        {/* Area */}
        <div className="flex justify-between items-center gap-[50px]">
          <span className="text-[#2D2D2D] text-[14px] font-normal font-['Fira_Sans']">
            Площадь
          </span>
          <NumberInput
            value={property.property.area}
            onChange={value => handleFieldChange('area', value)}
            placeholder="42"
            className="flex-1 h-[30px]"
            min={1}
            max={1000}
          />
        </div>

        {/* Floor */}
        <div className="flex justify-between items-center gap-[50px]">
          <span className="text-[#2D2D2D] text-[14px] font-normal font-['Fira_Sans']">
            Этаж
          </span>
          <NumberInput
            value={property.property.floor}
            onChange={value => handleFieldChange('floor', value)}
            placeholder="42"
            className="flex-1 h-[30px]"
            min={1}
            max={100}
          />
        </div>

        {/* Total Floors */}
        <div className="flex justify-between items-center gap-[50px]">
          <span className="text-[#2D2D2D] text-[14px] font-normal font-['Fira_Sans']">
            Этажность
          </span>
          <NumberInput
            value={property.property.totalFloors}
            onChange={value => handleFieldChange('totalFloors', value)}
            placeholder="42"
            className="flex-1 h-[30px]"
            min={1}
            max={100}
          />
        </div>

        {/* Address */}
        <div className="flex justify-between items-center gap-[50px]">
          <span className="text-[#2D2D2D] text-[14px] font-normal font-['Fira_Sans']">
            Адрес
          </span>
          <TextInput
            value={property.property.address}
            onChange={value => handleFieldChange('address', value)}
            placeholder="Шаблон"
            className="flex-1 h-[30px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[10px] mt-[10px]">
          <ButtonEmpty
            label="Удалить"
            onClick={onDelete}
            width="50%"
            height="30px"
          />
          <Button
            label="Сохранить"
            onClick={onSave}
            width="50%"
            height="30px"
          />
        </div>
      </div>
    </Block>
  );
}
