import { motion } from 'motion/react';
import Block from '~/components/Block';
import TypeSwitcher from '~/components/TypeSwitcher';
import ComboBox from '~/components/ComboBox';
import PriceRangeInput from '~/components/PriceRangeInput';
import FloorRangeInput from '~/components/FloorRangeInput';
import AreaInput from '~/components/AreaInput';
import Toggle from '~/components/Toggle';
import { TPropertyType } from '~/lib/property';
import {
  useSearchFilters,
  type SearchFiltersAPI,
} from '~/hooks/useSearchFilters';

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
  onFiltersChange?: (filters: SearchFiltersAPI) => void;
}

export default function SearchFilters({
  isDesktop,
  onFiltersChange,
}: SearchFiltersProps) {
  const { filters, updateFilters, resetFilters, toAPIFormat } =
    useSearchFilters();

  const handleFilterChange = (updates: Parameters<typeof updateFilters>[0]) => {
    updateFilters(updates);
    // Convert to API format and notify parent
    const apiFilters = toAPIFormat();
    onFiltersChange?.(apiFilters);
  };

  return (
    <Block label="Фильтры" isDesktop={isDesktop}>
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, staggerChildren: 0.1 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TypeSwitcher
            value={filters.offerType}
            onChange={value => handleFilterChange({ offerType: value })}
          />
        </motion.div>

        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className="text-sm font-medium text-gray-700">Тип</span>
          <ComboBox
            options={propertyTypeOptions}
            value={filters.propertyType}
            onChange={value => handleFilterChange({ propertyType: value })}
            placeholder="Выберите тип"
            className="w-40"
          />
        </motion.div>

        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <span className="text-sm font-medium text-gray-700">Город</span>
          <ComboBox
            options={cityOptions}
            value={filters.city}
            onChange={value => handleFilterChange({ city: value })}
            placeholder="Выберите город"
            className="w-40"
          />
        </motion.div>

        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <span className="text-sm font-medium text-gray-700">Район</span>
          <ComboBox
            options={districtOptions}
            value={filters.district}
            onChange={value => handleFilterChange({ district: value })}
            placeholder="Выберите район"
            className="w-40"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <PriceRangeInput
            fromValue={filters.priceFrom}
            toValue={filters.priceTo}
            onFromChange={value => handleFilterChange({ priceFrom: value })}
            onToChange={value => handleFilterChange({ priceTo: value })}
            isDesktop={isDesktop}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <FloorRangeInput
            fromValue={filters.floorFrom}
            toValue={filters.floorTo}
            onFromChange={value => handleFilterChange({ floorFrom: value })}
            onToChange={value => handleFilterChange({ floorTo: value })}
            isDesktop={isDesktop}
          />
        </motion.div>

        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <span className="text-sm font-medium text-gray-700">
            Площадь (м²)
          </span>
          <AreaInput
            value={filters.area}
            onChange={value => handleFilterChange({ area: value })}
          />
        </motion.div>

        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <span className="text-sm font-medium text-gray-700">Комнат</span>
          <ComboBox
            options={roomOptions}
            value={filters.rooms}
            onChange={value => handleFilterChange({ rooms: value })}
            placeholder="Количество"
            className="w-40"
          />
        </motion.div>

        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <span className="text-sm font-medium text-gray-700">Ремонт</span>
          <ComboBox
            options={renovationOptions}
            value={filters.renovation}
            onChange={value => handleFilterChange({ renovation: value })}
            placeholder="Тип ремонта"
            className="w-40"
          />
        </motion.div>

        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          <span className="text-sm font-medium text-gray-700">Лифт</span>
          <Toggle
            checked={filters.hasElevator}
            onChange={checked => handleFilterChange({ hasElevator: checked })}
          />
        </motion.div>

        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 1.0 }}
        >
          <span className="text-sm font-medium text-gray-700">Парковка</span>
          <Toggle
            checked={filters.hasParking}
            onChange={checked => handleFilterChange({ hasParking: checked })}
          />
        </motion.div>

        <motion.div
          className="pt-4 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.1 }}
        >
          <button
            onClick={resetFilters}
            className="w-full text-center text-red-600 text-sm font-medium hover:text-red-700 transition-colors"
          >
            Сбросить все фильтры
          </button>
        </motion.div>
      </motion.div>
    </Block>
  );
}
