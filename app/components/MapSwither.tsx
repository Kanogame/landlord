import { motion } from 'motion/react';

interface MapSwitherProps {
  showMap: boolean;
  onChange: (showMap: boolean) => void;
}

export default function MapSwither({ showMap, onChange }: MapSwitherProps) {
  return (
    <div
      className={`w-[120px] h-[30px] relative rounded-full transition-colors ${
        showMap ? 'bg-[#F3E7E7]' : 'bg-white'
      }`}
    >
      {!showMap && (
        <img
          className="w-[120px] h-[30px] absolute left-[0] top-[0] bg-cover rounded-full"
          src="/app/media/images/map-placeholder.png"
          alt="Map preview"
        />
      )}

      <motion.div
        className="absolute top-[2px] w-[26px] h-[26px]"
        animate={{
          x: showMap ? 92 : 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 40,
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
        className="absolute top-0 p-def cursor-pointer bg-transparent border-none w-full h-full"
        onClick={() => onChange(!showMap)}
      >
        <span className={showMap ? 'ml-[14px] ' : 'ml-[40px]'}>
          {showMap ? 'Объявления' : 'На карте'}
        </span>
      </button>
    </div>
  );
}
