import { useState } from 'react';
import AddressInput from '~/components/AddressInput';
import AutoButtonDropdown from '~/components/AutoButtonDropdown';
import DropdownElement from '~/components/DropdownElement';
import type { DaDataAddress, DaDataSuggestion } from 'react-dadata';
import type { TSearchFilters } from '~/hooks/useSearchFilters';
import RangeInput from '~/components/RangeInput';
import { TOfferType, TPropertyType } from '~/lib/property';
import iconArrowDown from '~/media/icons/icon-arrow-down.svg';

export interface SearchSection {
  label: string;
  values: string[];
}

interface SearchFiltersProps {
  filters: TSearchFilters;
  onFilterChange: (updates: Partial<TSearchFilters>) => void;
  onSearch: () => void;
}

export default function BigSearch({
  filters,
  onFilterChange,
  onSearch,
}: SearchFiltersProps) {
  const [city, setCity] = useState<
    DaDataSuggestion<DaDataAddress> | undefined
  >();

  const getOfferType = () => {
    if (filters.offerType == TOfferType.Rent) {
      return 'Аренда';
    }
    if (filters.offerType == TOfferType.Sell) {
      return 'Продажа';
    }
    return 'Тип услуги';
  };

  const getPrice = () => {
    if (filters.priceFrom && filters.priceTo) {
      return `от ${filters.priceFrom} до ${filters.priceTo}`;
    }
    if (filters.priceFrom) {
      return `от ${filters.priceFrom}`;
    }
    if (filters.priceTo) {
      return `до ${filters.priceTo}`;
    }
    return 'Цена';
  };

  const getPropertyType = () => {
    if (filters.propertyType === TPropertyType.Flat) {
      return 'Квартира';
    }
    if (filters.propertyType === TPropertyType.Detached) {
      return 'Дом';
    }
    if (filters.propertyType === TPropertyType.Commercial) {
      return 'Коммерческая';
    }
    return 'Тип недвижимости';
  };

  return (
    <div className="flex flex-[1_0_600px] bg-[#8b2635] px-[2px] py-[2px] rounded-[8px]">
      <div className="flex flex-1 bg-white rounded-[6px]">
        <AutoButtonDropdown
          buttonClassName="flex-1 px-[10px] border-r-[1px] border-[#EFEFEF] "
          button={
            <div className="w-[100%] flex justify-between">
              <div className={'h5-def'}>{getOfferType()}</div>
              <img src={iconArrowDown} />
            </div>
          }
        >
          <DropdownElement
            label="Аренда"
            onClick={() => onFilterChange({ offerType: TOfferType.Rent })}
          />
          <DropdownElement
            label="Покупка"
            onClick={() => onFilterChange({ offerType: TOfferType.Sell })}
          />
        </AutoButtonDropdown>
        <div className="flex-1 flex px-[10px] border-r-[1px] border-[#EFEFEF]">
          <AddressInput
            isSimple={true}
            value={city}
            onChange={value => {
              setCity(value);
              onFilterChange({
                city: value?.data.city ?? '',
              });
            }}
            hint="Город"
            filterFromBound="city"
            filterToBound="city"
            className="w-40 flex-1"
          />
        </div>

        <AutoButtonDropdown
          buttonClassName="flex-1 px-[10px] border-r-[1px] border-[#EFEFEF]"
          button={
            <div className="w-[100%] flex justify-between">
              <div className="h5-def ">{getPrice()}</div>
              <img src={iconArrowDown} />
            </div>
          }
          className="w-100"
        >
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
            isDesktop={true}
          />
        </AutoButtonDropdown>
        <AutoButtonDropdown
          buttonClassName="flex-1 px-[10px]"
          button={
            <div className="w-[100%] flex justify-between">
              <div className={'h5-def'}>{getPropertyType()}</div>
              <img src={iconArrowDown} />
            </div>
          }
        >
          <DropdownElement
            label="Квартира"
            onClick={() => onFilterChange({ propertyType: TPropertyType.Flat })}
          />
          <DropdownElement
            label="Дом"
            onClick={() =>
              onFilterChange({ propertyType: TPropertyType.Detached })
            }
          />
          <DropdownElement
            label="Коммерческая"
            onClick={() =>
              onFilterChange({ propertyType: TPropertyType.Commercial })
            }
          />
        </AutoButtonDropdown>
      </div>
      <div
        className="text-xs flex justify-center items-center text-white px-[45px] cursor-pointer"
        onClick={onSearch}
      >
        Найти
      </div>
    </div>
  );
}
