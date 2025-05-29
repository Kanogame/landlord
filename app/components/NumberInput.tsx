import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Input } from '~/components/ui/input';

interface NumberInputProps {
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
  const [displayValue, setDisplayValue] = useState(
    value?.toLocaleString() || ''
  );
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

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
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max]
  );

  const getValue = useCallback(
    (percentage: number) => min + (percentage / 100) * (max - min),
    [min, max]
  );

  const handleSliderMouseDown = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      setIsDragging(true);

      const handleMouseMove = (e: MouseEvent) => {
        if (!inputRef.current) return;

        const rect = inputRef.current.getBoundingClientRect();
        const percentage = Math.max(
          0,
          Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
        );
        const newValue = Math.round(getValue(percentage) / step) * step;

        setDisplayValue(newValue.toLocaleString());
        onChange(newValue);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [getValue, onChange, step]
  );

  const currentPercentage = value ? getPercentage(value) : 0;

  return (
    <div className={`relative ${className}`} ref={inputRef}>
      <div className="relative">
        <div className="absolute inset-0 rounded-md pointer-events-none ">
          {/* Base border */}
          <div className="absolute inset-0 border border-gray-300 rounded-md" />

          {value && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-red-600 rounded-full"
              style={{ width: `${currentPercentage}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${currentPercentage}%` }}
              transition={{ duration: 0.2 }}
            />
          )}

          {value && (
            <motion.div
              className={`absolute z-[100] bottom-0 w-2 h-2 bg-red-600 rounded-full transform -translate-x-1/2 translate-y-1/2 cursor-grab ${
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
        </div>

        <Input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`h-8 text-xs pr-8 bg-transparent border-none focus:ring-0 focus:border-none ${
            value ? 'border-red-600' : ''
          }`}
          style={{
            boxShadow: 'none',
            outline: 'none',
          }}
        />

        {/* Clear button */}
        {value && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            onClick={handleClear}
          ></motion.button>
        )}
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-3 cursor-pointer"
        onMouseDown={handleSliderMouseDown}
      />
    </div>
  );
}
