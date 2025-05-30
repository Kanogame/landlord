import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '~/components/ui/input';

export interface NumberInputProps {
  value?: number;
  onChange: (value?: number) => void;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

export default function NumberInput({
  value,
  onChange,
  placeholder,
  className = '',
  min = 0,
  max = 10000000,
  step = 1000,
}: NumberInputProps) {
  const [displayValue, setDisplayValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayValue(value?.toLocaleString() || '');
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\D/g, '');
    const numericValue = inputValue ? parseInt(inputValue, 10) : undefined;

    setDisplayValue(
      inputValue ? parseInt(inputValue, 10).toLocaleString() : ''
    );
    onChange(numericValue);
  };

  const handleClear = () => {
    setDisplayValue('');
    onChange(undefined);
  };

  const getPercentage = useCallback(
    (val: number) => {
      return Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
    },
    [min, max]
  );

  const getValueFromPercentage = useCallback(
    (percentage: number) => {
      return min + (percentage / 100) * (max - min);
    },
    [min, max]
  );

  function handleSliderInteraction(clientX: number) {
    if (!inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100)
    );
    const newValue =
      Math.round(getValueFromPercentage(percentage) / step) * step;

    onChange(newValue);
  }

  function handleSliderMouseDown(event: React.MouseEvent) {
    event.preventDefault();
    setIsDragging(true);
    handleSliderInteraction(event.clientX);

    const handleMouseMove = (e: MouseEvent) =>
      handleSliderInteraction(e.clientX);
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  const currentPercentage = value ? getPercentage(value) : 0;

  return (
    <div className={`relative ${className}`} ref={inputRef}>
      <div className="relative">
        <div className="absolute inset-0 rounded-md pointer-events-none">
          <div className="absolute inset-0 border border-gray-300 rounded-md" />
          {value != 0 && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-[#8B2635] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${currentPercentage}%` }}
              transition={{ duration: 0.2 }}
            />
          )}
        </div>

        {value != 0 && (
          <motion.div
            className={`absolute bottom-0 w-2 h-2 bg-[#8B2635] rounded-[1px] transform -translate-x-1/2 translate-y-1/2 cursor-grab ${
              isDragging ? 'cursor-grabbing scale-125' : ''
            }`}
            style={{ left: `${currentPercentage}%` }}
            onMouseDown={handleSliderMouseDown}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}

        <Input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`h-8 text-xs pr-8 bg-transparent border-none focus:ring-0 focus:border-none ${
            value ? 'border-[#8B2635]' : ''
          }`}
          style={{ boxShadow: 'none', outline: 'none' }}
        />

        {value != 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            onClick={handleClear}
          >
            ×
          </motion.button>
        )}
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-3 cursor-pointer"
        onMouseDown={handleSliderMouseDown}
      />
    </div>
  );
}
