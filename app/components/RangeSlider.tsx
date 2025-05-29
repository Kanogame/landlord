import { useRef, useCallback } from 'react';
import { motion } from 'motion/react';

interface RangeSliderProps {
  min: number;
  max: number;
  fromValue: number;
  toValue: number;
  onFromChange: (value: number) => void;
  onToChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export default function RangeSlider({
  min,
  max,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  formatValue = value => value.toString(),
}: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const getPercentage = useCallback(
    (value: number) => ((value - min) / (max - min)) * 100,
    [min, max]
  );

  const getValue = useCallback(
    (percentage: number) => min + (percentage / 100) * (max - min),
    [min, max]
  );

  const handleMouseDown = useCallback(
    (isFrom: boolean) => (event: React.MouseEvent) => {
      event.preventDefault();

      const handleMouseMove = (e: MouseEvent) => {
        if (!trackRef.current) return;

        const rect = trackRef.current.getBoundingClientRect();
        const percentage = Math.max(
          0,
          Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
        );
        const newValue = Math.round(getValue(percentage));

        if (isFrom) {
          onFromChange(Math.min(newValue, toValue));
        } else {
          onToChange(Math.max(newValue, fromValue));
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [fromValue, toValue, getValue, onFromChange, onToChange]
  );

  const fromPercentage = getPercentage(fromValue);
  const toPercentage = getPercentage(toValue);

  return (
    <div className="px-1 py-4">
      <div
        ref={trackRef}
        className="relative h-1 bg-gray-200 rounded-full cursor-pointer"
      >
        {/* Active range */}
        <motion.div
          className="absolute h-full bg-red-600 rounded-full"
          style={{
            left: `${fromPercentage}%`,
            width: `${toPercentage - fromPercentage}%`,
          }}
          layout
        />

        {/* From handle */}
        <motion.div
          className="absolute w-4 h-4 bg-red-600 rounded-full cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 top-1/2 shadow-md"
          style={{ left: `${fromPercentage}%` }}
          onMouseDown={handleMouseDown(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />

        {/* To handle */}
        <motion.div
          className="absolute w-4 h-4 bg-red-600 rounded-full cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 top-1/2 shadow-md"
          style={{ left: `${toPercentage}%` }}
          onMouseDown={handleMouseDown(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* Value indicators */}
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>{formatValue(fromValue)}</span>
        <span>{formatValue(toValue)}</span>
      </div>
    </div>
  );
}
