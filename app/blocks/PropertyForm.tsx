import Block from '~/components/Block';
import TypeSwitcher from '~/components/TypeSwitcher';
import ComboBox from '~/components/ComboBox';
import NumberInput from '~/components/NumberInput';
import ButtonEmpty from '~/components/ButtonEmpty';
import { type TProperty, TOfferType, TPropertyType } from '~/lib/property';
import ButtonAccent from '~/components/ButtonAccent';
import { Input } from '~/components/ui/input';
import AddressInput from '~/components/AddressInput';

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

  const inputClassname = 'w-40';

  return (
    <Block isDesktop={isDesktop}>
      <div className="flex justify-between items-center gap-[50px]">
        <span className="h5-def">Название</span>
        <Input
          value={property.property.name}
          onChange={value => handleFieldChange('title', value)}
          placeholder="Введите название"
          className={inputClassname}
        />
      </div>

      <TypeSwitcher
        value={property.type}
        onChange={value => onPropertyChange({ type: value })}
      />

      <div className="flex justify-between items-center gap-[50px]">
        <span className="h5-def">Тип невижимости</span>
        <ComboBox
          options={propertyTypeOptions}
          value={property.property.PropertyTypeId}
          onChange={value => handleFieldChange('propertyType', value)}
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
          max={1000}
          step={1}
        />
      </div>

      <div className="flex justify-between items-center gap-[50px]">
        <span className="h5-def">Этаж</span>
        <NumberInput
          value={property.property.address.floor}
          onChange={value => (property.property.address.floor = value ?? 1)}
          placeholder="3"
          className={inputClassname}
          min={1}
          max={100}
          step={1}
        />
      </div>

      <div className="flex justify-between items-center gap-[50px]">
        <span className="h5-def">Адрес</span>
        <AddressInput />
        <Input
          value={property.property.address.city}
          onChange={value => handleFieldChange('address', value)}
          placeholder="Шаблон"
          className="flex-1 h-[30px]"
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
