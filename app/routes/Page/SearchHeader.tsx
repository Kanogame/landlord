import { useNavigate, useSearchParams } from 'react-router';
import BigSearch from './BigSearch';
import ButtonArrow from '~/components/ButtonArrow';
import {
  TSortOption,
  useSearchFilters,
  type TSearchFilters,
} from '~/hooks/useSearchFilters';

export default function SearchHeader() {
  const navigate = useNavigate();
  const { filters, updateFilters, resetFilters } = useSearchFilters({
    pageNumber: 1,
    pageSize: 10,
    sortBy: TSortOption.CreatedDesc,
  });

  const handleFilterChange = (updates: Partial<TSearchFilters>) => {
    updateFilters(updates);
  };

  const handleNavigate = () => {
    const searchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        key !== 'attributes'
      ) {
        searchParams.set(key, value.toString());
      }

      if (key === 'attributes') {
        for (const attribute of value) {
          searchParams.set(`attr_${attribute.name}`, attribute.value);
        }
      }
    });

    resetFilters();

    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white flex justify-center items-center border-b-[1px] border-b-[#EFEFEF] py-[10px]">
      <div className="flex flex-[0_1_1400px] gap-[20px] justify-center items-center px-[50px]">
        <BigSearch
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleNavigate}
        />
        <ButtonArrow
          label="Больше фильтров"
          width="190px"
          height="40px"
          radius={8}
          onClick={() => navigate('/search')}
        />
      </div>
    </div>
  );
}
