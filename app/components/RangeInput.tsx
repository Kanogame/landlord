import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RangeSlider from '~/components/RangeSlider';
import NumberInput from '~/components/NumberInput';
import { set } from 'date-fns';

interface PriceRangeInputProps {
  label: string;
  fromValue?: number;
  toValue?: number;
  fromName: string;
  toName: string;
  step?: number;
  max?: number;
  min?: number;
  onFromChange: (value?: number) => void;
  onToChange: (value?: number) => void;
  isDesktop: boolean;
}

export default function RangeInput({
  label,
  fromValue,
  fromName,
  toValue,
  toName,
  max,
  min,
  step,
  onFromChange,
  onToChange,
  isDesktop,
}: PriceRangeInputProps) {
  const minVal = min ?? 0;
  const maxVal = max ?? 10000000;
  const [actualFromValue, setActualFromValue] = useState(fromValue);
  const [actualToValue, setActualToValue] = useState(toValue);

  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <span className="h4-def">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="h5-def">{fromName}</span>
        <NumberInput
          value={actualFromValue}
          onChange={from => {
            if (actualToValue && from && from > actualToValue) {
              setActualToValue(from);
            }
            setActualFromValue(from);
          }}
          placeholder={minVal.toLocaleString()}
          className="flex-1"
          min={minVal}
          max={maxVal}
          step={step ?? 10000}
        />
        <span className="h5-def">{toName}</span>
        <NumberInput
          value={actualToValue}
          onChange={setActualToValue}
          placeholder={maxVal.toLocaleString()}
          className="flex-1"
          min={minVal}
          max={maxVal}
          step={step ?? 10000}
        />
      </div>
    </motion.div>
  );
}
