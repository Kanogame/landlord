import Block from '~/components/Block';
import TypeSwitcher from '~/components/TypeSwitcher';
import ComboBox from '~/components/ComboBox';
import PriceRangeInput from '~/components/RangeInput';
import FloorRangeInput from '~/components/FloorRangeInput';
import { TPropertyType } from '~/lib/property';
import {
  useSearchFilters,
  type TSearchFilters,
} from '~/hooks/useSearchFilters';
import ToggleLabel from '~/components/ToggleLabel';
import NumberInput from '~/components/NumberInput';
import RangeInput from '~/components/RangeInput';
import ButtonEmpty from '~/components/ButtonEmpty';

const propertyTypeOptions = [
  { value: TPropertyType.Flat, label: 'Квартира' },
  { value: TPropertyType.Detached, label: 'Дом' },
  { value: TPropertyType.Commercial, label: 'Коммерческая' },
];

const cityOptions = [
  { value: 'moscow', label: 'Москва' },
  { value: 'spb', label: 'Санкт-Петербург' },
  { value: 'kazan', label: 'Казань' },
];

const districtOptions = [
  { value: 'center', label: 'Центральный' },
  { value: 'north', label: 'Северный' },
  { value: 'south', label: 'Южный' },
];

const roomOptions = [
  { value: 1, label: '1 комната' },
  { value: 2, label: '2 комнаты' },
  { value: 3, label: '3 комнаты' },
  { value: 4, label: '4+ комнат' },
];

const renovationOptions = [
  { value: 'euro', label: 'Евроремонт' },
  { value: 'cosmetic', label: 'Косметический' },
  { value: 'designer', label: 'Дизайнерский' },
  { value: 'none', label: 'Без ремонта' },
];

interface SearchFiltersProps {
  isDesktop: boolean;
  filters: TSearchFilters;
  onFilterChange: (updates: Partial<TSearchFilters>) => void;
  onResetFilters: () => void;
}

export default function SearchFilters({
  isDesktop,
  filters,
  onFilterChange,
  onResetFilters,
}: SearchFiltersProps) {
  return (
    <Block label="Фильтры" isDesktop={isDesktop}>
      <div className="flex flex-col gap-4">
        <TypeSwitcher
          value={filters.offerType}
          onChange={value => onFilterChange({ offerType: value })}
        />

        <div className="flex justify-between items-center">
          <span className="h5-def">Тип</span>
          <ComboBox
            options={propertyTypeOptions}
            value={filters.propertyType}
            onChange={value => onFilterChange({ propertyType: value })}
            placeholder="Выберите тип"
            className="w-40"
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="h5-def">Город</span>
          <ComboBox
            options={cityOptions}
            value={filters.city}
            onChange={value => onFilterChange({ city: value })}
            placeholder="Выберите город"
            className="w-40"
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="h5-def">Район</span>
          <ComboBox
            options={districtOptions}
            value={filters.district}
            onChange={value => onFilterChange({ district: value })}
            placeholder="Выберите район"
            className="w-40"
          />
        </div>

        <RangeInput
          label="Цена"
          fromValue={filters.priceFrom}
          toValue={filters.priceTo}
          fromName="От"
          toName="До"
          min={10000}
          max={4000000}
          onFromChange={value => onFilterChange({ priceFrom: value })}
          onToChange={value => onFilterChange({ priceTo: value })}
          isDesktop={isDesktop}
        />
        <RangeInput
          label="Этаж"
          fromValue={filters.floorFrom}
          toValue={filters.floorTo}
          fromName="От"
          toName="До"
          min={1}
          max={100}
          step={1}
          onFromChange={value => onFilterChange({ floorFrom: value })}
          onToChange={value => onFilterChange({ floorTo: value })}
          isDesktop={isDesktop}
        />

        <div className="flex justify-between items-center">
          <span className="h5-def">Площадь (м²)</span>
          <NumberInput
            value={filters.area}
            onChange={value => onFilterChange({ area: value })}
            placeholder="Площадь"
            className="w-40"
            min={10}
            max={1000}
            step={5}
          />
        </div>

        <ButtonEmpty
          label="Сбросить все фильтры"
          onClick={onResetFilters}
          width="100%"
          height="40px"
        />
      </div>
    </Block>
  );
}
