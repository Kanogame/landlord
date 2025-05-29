import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RangeSlider from '~/components/RangeSlider';
import NumberInput from '~/components/NumberInput';

interface FloorRangeInputProps {
  fromValue?: number;
  toValue?: number;
  onFromChange: (value?: number) => void;
  onToChange: (value?: number) => void;
  isDesktop: boolean;
}

export default function FloorRangeInput({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  isDesktop,
}: FloorRangeInputProps) {
  const [showSlider, setShowSlider] = useState(false);
  const minFloor = 1;
  const maxFloor = 50;

  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium text-gray-900">Этаж</span>
        {!isDesktop && (
          <motion.button
            className="text-xs text-red-600 underline"
            onClick={() => setShowSlider(!showSlider)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showSlider ? 'Скрыть' : 'Слайдер'}
          </motion.button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-600 min-w-[20px]">От</span>
        <NumberInput
          value={fromValue}
          onChange={onFromChange}
          placeholder="4"
          className="flex-1"
          min={minFloor}
          max={maxFloor}
          step={1}
        />
        <span className="text-xs text-gray-600 min-w-[20px]">До</span>
        <NumberInput
          value={toValue}
          onChange={onToChange}
          placeholder="10"
          className="flex-1"
          min={minFloor}
          max={maxFloor}
          step={1}
        />
      </div>
    </motion.div>
  );
}
