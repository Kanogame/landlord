import { useState } from 'react';
import ButtonEmpty from '~/components/ButtonEmpty';
import DropDownLabel from '~/components/DropdownLabel';
import MapSwither from '~/components/MapSwither';
import IconFilter from '~/media/icons/icon-filter.svg';
import { TSortOption } from '~/hooks/useSearchFilters';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import AutoButtonDropdown from '~/components/AutoButtonDropdown';
import DropdownElement from '~/components/DropdownElement';
import { useDesktop } from '~/hooks/useDesktop';

interface SearchSortHeaderProps {
  sorting: TSortOption;
  onSortingChange: (sorting: TSortOption) => void;
  showMap: boolean;
  onMapToggle?: (showMap: boolean) => void;
  onButtonClick?: () => void;
  buttonText?: string;
}

const sortOptions = [
  { value: TSortOption.CreatedAsc, label: 'Недавнее', baseType: 'created' },
  { value: TSortOption.PriceAsc, label: 'По цене', baseType: 'price' },
  { value: TSortOption.AreaAsc, label: 'По площади', baseType: 'area' },
];

export default function SearchSortHeader({
  sorting,
  onSortingChange,
  showMap,
  onMapToggle,
  onButtonClick,
  buttonText,
}: SearchSortHeaderProps) {
  const isDesktop = useDesktop();

  const isDescending = () => {
    return (
      sorting === TSortOption.CreatedDesc ||
      sorting === TSortOption.PriceDesc ||
      sorting === TSortOption.AreaDesc
    );
  };

  const handleSortChange = (selectedLabel: string) => {
    const option = sortOptions.find(opt => opt.label === selectedLabel);
    if (option) {
      // Keep current asc/desc state when changing sort type
      const newSorting = isDescending()
        ? getDescendingOption(option.value)
        : option.value;
      onSortingChange(newSorting);
    }
  };

  const handleFilterIconClick = () => {
    // Toggle between asc and desc for current sort type
    const newSorting = isDescending()
      ? getAscendingOption(sorting)
      : getDescendingOption(sorting);
    onSortingChange(newSorting);
  };

  const getDescendingOption = (ascOption: TSortOption): TSortOption => {
    switch (ascOption) {
      case TSortOption.CreatedAsc:
        return TSortOption.CreatedDesc;
      case TSortOption.PriceAsc:
        return TSortOption.PriceDesc;
      case TSortOption.AreaAsc:
        return TSortOption.AreaDesc;
      default:
        return ascOption;
    }
  };

  const getAscendingOption = (descOption: TSortOption): TSortOption => {
    switch (descOption) {
      case TSortOption.CreatedDesc:
        return TSortOption.CreatedAsc;
      case TSortOption.PriceDesc:
        return TSortOption.PriceAsc;
      case TSortOption.AreaDesc:
        return TSortOption.AreaAsc;
      default:
        return descOption;
    }
  };

  return (
    <div className="flex justify-between items-center py-[15px] px-[20px]">
      <div
        className={
          isDesktop
            ? 'flex gap-[5px] items-center'
            : 'flex flex-row-reverse justify-between flex-1'
        }
      >
        <img
          src={IconFilter}
          alt="Filter"
          className={`${isDescending() ? 'rotate-180' : ''}`}
          onClick={handleFilterIconClick}
        />
        <AutoButtonDropdown
          button={
            <div className="flex gap-[10px]">
              <div className="n1-def">Фильтры</div>
            </div>
          }
        >
          {sortOptions.map(opt => (
            <DropdownElement
              key={opt.value}
              label={opt.label}
              onClick={() => handleSortChange(opt.label)}
            />
          ))}
        </AutoButtonDropdown>
      </div>
      {isDesktop && (
        <div className="flex gap-[20px] items-center">
          {onMapToggle && (
            <MapSwither showMap={showMap} onChange={onMapToggle} />
          )}
          {onButtonClick && (
            <ButtonEmpty
              label={buttonText}
              width="200px"
              onClick={onButtonClick}
            />
          )}
        </div>
      )}
    </div>
  );
}
