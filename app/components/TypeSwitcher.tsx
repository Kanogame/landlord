import { motion } from 'motion/react';
import { TOfferType } from '~/lib/property';

interface TypeSwitcherProps {
  value: TOfferType;
  onChange: (value: TOfferType) => void;
}

export default function TypeSwitcher({ value, onChange }: TypeSwitcherProps) {
  return (
    <div className="relative h-8 bg-white border border-gray-300 rounded-md overflow-hidden">
      <motion.div
        className="absolute top-0 h-full w-1/2 bg-white border border-[#8B2635] rounded-md z-10"
        animate={{
          x: value === TOfferType.Rent ? 0 : '100%',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 50 }}
      />
      <div className="relative z-20 flex h-full">
        <button
          className={`flex-1 text-xs font-medium transition-colors ${
            value === TOfferType.Rent ? 'text-black' : 'text-gray-600'
          }`}
          onClick={() => onChange(TOfferType.Rent)}
        >
          Аренда
        </button>
        <button
          className={`flex-1 text-xs font-medium transition-colors ${
            value === TOfferType.Sell ? 'text-black' : 'text-gray-600'
          }`}
          onClick={() => onChange(TOfferType.Sell)}
        >
          Продажа
        </button>
      </div>
    </div>
  );
}
