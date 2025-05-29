import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import ChevronDownIcon from '~/media/icons/icon-arrow-down.svg';

interface Option {
  value: any;
  label: string;
}

interface ComboBoxProps {
  options: Option[];
  value?: any;
  onChange: (value: any) => void;
  placeholder?: string;
  className?: string;
}

export default function ComboBox({
  options,
  value,
  onChange,
  placeholder = 'Выберите...',
  className = '',
}: ComboBoxProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
            <img src={ChevronDownIcon} className="w-4 h-4" />
          </motion.div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1" align="end">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {options.map(option => (
              <button
                key={option.value}
                className="w-full text-left px-2 py-1.5 text-xs hover:bg-gray-100 rounded transition-colors"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}
