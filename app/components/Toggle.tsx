import { motion } from 'motion/react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'small' | 'large';
  label?: string;
}

export default function Toggle({
  checked,
  onChange,
  size = 'small',
}: ToggleProps) {
  const isLarge = size === 'large';
  const width = isLarge ? 'w-14' : 'w-14';
  const height = isLarge ? 'h-8' : 'h-8';
  const circleSize = isLarge ? 'w-6 h-6' : 'w-6 h-6';

  return (
    <div className="flex items-center gap-3">
      <button
        className={`${width} ${height} rounded-full p-1 transition-colors ${
          checked ? 'bg-[#F3E7E7]' : 'bg-[#F8F8F8]'
        }`}
        onClick={() => onChange(!checked)}
      >
        <motion.div
          className={`${circleSize} rounded-full shadow-sm ${
            checked ? 'bg-[#8B2635]' : 'bg-[#707070]'
          }`}
          animate={{
            x: checked ? (isLarge ? 24 : 24) : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>
    </div>
  );
}
