import ButtonEmpty from '~/components/ButtonEmpty';
import DropDownLabel from '~/components/DropdownLabel';
import MapSwither from '~/components/MapSwither';
import IconFilter from '~/media/icons/icon-filter.svg';
import type { TSortOption } from '~/hooks/useSearchFilters';

interface SearchSortHeaderProps {
  sorting: TSortOption;
  onSortingChange: (sorting: TSortOption) => void;
  showMap: boolean;
  onMapToggle: (showMap: boolean) => void;
  onMonitorRequest: () => void;
}

const sortOptions = [
  { value: 'recent' as TSortOption, label: 'Недавнее' },
  { value: 'price' as TSortOption, label: 'По цене' },
  { value: 'area' as TSortOption, label: 'По площади' },
];

export default function SearchSortHeader({
  sorting,
  onSortingChange,
  showMap,
  onMapToggle,
  onMonitorRequest,
}: SearchSortHeaderProps) {
  const handleSortChange = (selectedLabel: string) => {
    const option = sortOptions.find(opt => opt.label === selectedLabel);
    if (option) {
      onSortingChange(option.value);
    }
  };

  return (
    <div className="flex justify-between items-center py-[15px]">
      <div className="flex gap-[5px] items-center">
        <img src={IconFilter} alt="Filter" />
        <DropDownLabel
          label="Фильтры"
          values={sortOptions.map(opt => opt.label)}
          onChosen={handleSortChange}
        />
      </div>
      <div className="flex gap-[20px] items-center">
        <MapSwither showMap={showMap} onChange={onMapToggle} />
        <ButtonEmpty
          label="Мониторить этот запрос"
          width="200px"
          onClick={onMonitorRequest}
        />
      </div>
    </div>
  );
}
