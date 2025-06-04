import TypeSwitcher from '~/components/TypeSwitcher';
import ComboBox from '~/components/ComboBox';
import { TPropertyType } from '~/lib/property';
import { type TSearchFilters } from '~/hooks/useSearchFilters';
import NumberInput from '~/components/NumberInput';
import RangeInput from '~/components/RangeInput';
import ButtonEmpty from '~/components/ButtonEmpty';
import AddressInput from '~/components/AddressInput';
import { useState } from 'react';
import type { DaDataAddress, DaDataSuggestion } from 'react-dadata';
import Toggle from '~/components/Toggle';

const propertyTypeOptions = [
  { value: TPropertyType.Flat, label: 'Квартира' },
  { value: TPropertyType.Detached, label: 'Дом' },
  { value: TPropertyType.Commercial, label: 'Коммерческая' },
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
  const [city, setCity] = useState<DaDataSuggestion<DaDataAddress> | undefined>(
    {
      value: filters.city ?? '',
      unrestricted_value: filters.city ?? '',
      data: {
        city: filters.city ?? '',
      },
    }
  );
  const [region, setRegion] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >({
    value: filters.region ?? '',
    unrestricted_value: filters.region ?? '',
    data: {
      region: filters.region ?? '',
    },
  });
  const [street, setStreet] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >({
    value: filters.street ?? '',
    unrestricted_value: filters.street ?? '',
    data: {
      street: filters.street ?? '',
    },
  });

  return (
    <div className="flex flex-col gap-[12px] w-[100%]">
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

      <div className="flex justify-between items-center">
        <span className="h5-def">ЖКХ включено?</span>
        <Toggle
          checked={filters.service ?? false}
          onChange={value => onFilterChange({ service: value })}
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="h5-def">Парковка</span>
        <Toggle
          checked={filters.parking ?? false}
          onChange={value => onFilterChange({ parking: value })}
        />
      </div>

      <ButtonEmpty
        label="Сбросить все фильтры"
        onClick={onResetFilters}
        width="100%"
        height="40px"
      />
    </div>
  );
}
