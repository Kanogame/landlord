import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Input } from '~/components/ui/input';
import ChevronDownIcon from '~/media/icons/icon-arrow-down.svg';
import IconSearch from '~/media/icons/icon-search.svg';

interface Option {
  value: any;
  label: string;
}

interface ComboBoxProps {
  options: Option[];
  value?: any;
  onChange: (value: any) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
  emptyMessage?: string;
}

export default function ComboBox({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  searchPlaceholder = 'Поиск...',
  className = '',
  emptyMessage = 'Ничего не найдено',
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedOption = options.find(option => option.value === value);

  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;

    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  const handleSelect = (optionValue: any) => {
    onChange(optionValue);
    setOpen(false);
    setSearchQuery('');
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSearchQuery('');
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          className={`flex items-center justify-between border-input h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none h5-def ${className}`}
        >
          <span className={selectedOption ? 'h5-def' : 'h5-light'}>
            {selectedOption?.label || placeholder}
          </span>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <img src={ChevronDownIcon} alt="Arrow Down" className="w-3 h-3" />
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
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <img
                  src={IconSearch}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 "
                />
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="h-7 pl-7 text-xs border-gray-200 focus:border-red-300 focus:ring-red-200"
                  autoFocus
                />
              </div>
            </div>

            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  {filteredOptions.map((option, index) => (
                    <motion.button
                      key={option.value}
                      className={`w-full text-left px-3 py-2 h5-def hover:bg-gray-50 transition-colors ${
                        option.value === value ? 'bg-[#F3E7E7]' : ''
                      }`}
                      onClick={() => handleSelect(option.value)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15, delay: index * 0.02 }}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                    >
                      <span className="block truncate">{option.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="px-3 py-6 text-center text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {emptyMessage}
                </motion.div>
              )}
            </div>

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
