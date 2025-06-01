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
import AddressInput from '~/components/AddressInput';
import { useState } from 'react';
import type { DaDataAddress, DaDataSuggestion } from 'react-dadata';

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
  const [city, setCity] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >();
  const [region, setRegion] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >();
  const [street, setStreet] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >();

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
          <span className="h5-def">Регион</span>
          <AddressInput
            value={region}
            onChange={value => {
              setRegion(value);
              onFilterChange({
                region: value?.data.region_with_type ?? '',
              });
            }}
            hint="Введите название"
            filterFromBound="region"
            filterToBound="region"
            className="w-40"
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="h5-def">Город</span>
          <AddressInput
            value={city}
            onChange={value => {
              setCity(value);
              onFilterChange({
                city: value?.data.city ?? '',
              });
            }}
            hint="Введите название"
            filterLocations={[{ region_fias_id: region?.data.region_fias_id }]}
            filterFromBound="city"
            filterToBound="city"
            className="w-40"
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="h5-def">Улица</span>
          <AddressInput
            value={street}
            onChange={value => {
              setStreet(value);
              onFilterChange({
                street: value?.data.street ?? '',
              });
            }}
            hint="Введите название"
            filterLocations={[{ city_fias_id: city?.data.city_fias_id }]}
            filterFromBound="street"
            filterToBound="street"
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
          <span className="h5-def">Площадь от (м²)</span>
          <NumberInput
            value={filters.areaFrom}
            onChange={value => onFilterChange({ areaFrom: value })}
            placeholder="40"
            className="w-40"
            min={10}
            max={1000}
            step={5}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="h5-def">Комнат от</span>
          <NumberInput
            value={filters.roomsFrom}
            onChange={value => onFilterChange({ roomsFrom: value })}
            placeholder="2"
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
