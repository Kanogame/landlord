import { motion } from 'motion/react';

interface MapSwitherProps {
  showMap: boolean;
  onChange: (showMap: boolean) => void;
}

export default function MapSwither({ showMap, onChange }: MapSwitherProps) {
  return (
    <div className="w-[105px] h-[30px] relative">
      <div
        className={`w-[105px] h-[30px] absolute top-0 left-0 rounded-[15px] transition-colors ${
          showMap ? 'bg-[#F3E7E7]' : 'bg-white'
        }`}
      />

      {!showMap && (
        <img
          className="w-[132px] h-[57px] absolute -left-[10px] -top-[14px] object-cover"
          src="https://placehold.co/132x57"
          alt="Map preview"
        />
      )}

      <motion.div
        className="absolute top-[2px] w-[26px] h-[26px]"
        animate={{
          x: showMap ? 77 : 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="13"
            cy="13"
            r="13"
            fill={showMap ? '#8B2635' : '#707070'}
          />
        </svg>
      </motion.div>

      <button
        className="absolute top-0 text-[#2D2D2D] text-[12px] font-normal cursor-pointer bg-transparent border-none w-full h-full"
        onClick={() => onChange(!showMap)}
      >
        <span className={showMap ? 'ml-[4px]' : 'ml-[36px]'}>
          {showMap ? 'Объявления' : 'На карте'}
        </span>
      </button>
    </div>
  );
}
