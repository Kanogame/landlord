import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Input } from '~/components/ui/input';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

interface Option {
  value: any;
  label: string;
}

interface AsyncComboBoxProps {
  options: Option[];
  value?: any;
  onChange: (value: any) => void;
  onSearch?: (query: string) => Promise<Option[]> | Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  minSearchLength?: number;
}

export default function AsyncComboBox({
  options: initialOptions,
  value,
  onChange,
  onSearch,
  placeholder = 'Выберите...',
  searchPlaceholder = 'Поиск...',
  className = '',
  emptyMessage = 'Ничего не найдено',
  loadingMessage = 'Поиск...',
  minSearchLength = 1,
}: AsyncComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Option[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const selectedOption =
    initialOptions.find(option => option.value === value) ||
    searchResults.find(option => option.value === value);

  // Debounced search effect
  useEffect(() => {
    if (!onSearch || searchQuery.length < minSearchLength) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timeoutId = setTimeout(async () => {
      try {
        const results = await onSearch(searchQuery);
        setSearchResults(Array.isArray(results) ? results : []);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, onSearch, minSearchLength]);

  // Filter local options if no async search is provided
  const filteredOptions = useMemo(() => {
    if (onSearch) {
      return searchQuery.length >= minSearchLength
        ? searchResults
        : initialOptions;
    }

    if (!searchQuery.trim()) return initialOptions;

    return initialOptions.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [initialOptions, searchQuery, searchResults, onSearch, minSearchLength]);

  const handleSelect = (optionValue: any) => {
    onChange(optionValue);
    setOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSearchQuery('');
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const showLoading = isSearching && searchQuery.length >= minSearchLength;
  const showEmpty =
    !isSearching &&
    filteredOptions.length === 0 &&
    searchQuery.length >= minSearchLength;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          className={`flex items-center justify-between h-8 px-3 bg-white border border-gray-300 rounded text-xs hover:border-gray-400 transition-colors ${className}`}
        >
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption?.label || placeholder}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon className="w-4 h-4 text-gray-600" />
          </motion.div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0" align="end">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col"
          >
            {/* Search input */}
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="h-7 pl-7 text-xs border-gray-200 focus:border-red-300 focus:ring-red-200"
                  autoFocus
                />
                {showLoading && (
                  <motion.div
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div className="w-3 h-3 border border-gray-300 border-t-red-600 rounded-full" />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Options list */}
            <div className="max-h-48 overflow-y-auto">
              {showLoading ? (
                <motion.div
                  className="px-3 py-6 text-center text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {loadingMessage}
                </motion.div>
              ) : showEmpty ? (
                <motion.div
                  className="px-3 py-6 text-center text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {emptyMessage}
                </motion.div>
              ) : filteredOptions.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  {filteredOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      className={`relative w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${
                        option.value === value
                          ? 'bg-red-50 text-red-700'
                          : 'text-gray-700'
                      }`}
                      onClick={() => handleSelect(option.value)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15, delay: index * 0.02 }}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                    >
                      <span className="block truncate pr-4">
                        {option.label}
                      </span>
                      {option.value === value && (
                        <motion.div
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              ) : null}
            </div>

            {/* Clear selection option */}
            {selectedOption && (
              <motion.div
                className="border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <button
                  className="w-full text-left px-3 py-2 text-xs text-gray-500 hover:bg-gray-50 transition-colors"
                  onClick={() => handleSelect(undefined)}
                >
                  Очистить выбор
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}
