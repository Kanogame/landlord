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
  label,
}: ToggleProps) {
  const isLarge = size === 'large';
  const width = isLarge ? 'w-14' : 'w-14';
  const height = isLarge ? 'h-8' : 'h-8';
  const circleSize = isLarge ? 'w-6 h-6' : 'w-6 h-6';

  return (
    <div className="flex items-center gap-3">
      <button
        className={`${width} ${height} rounded-full p-1 transition-colors ${
          checked ? 'bg-red-100' : 'bg-gray-200'
        }`}
        onClick={() => onChange(!checked)}
      >
        <motion.div
          className={`${circleSize} rounded-full shadow-sm ${
            checked ? 'bg-red-600' : 'bg-gray-500'
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

      {label && (
        <span
          className={`font-medium ${
            checked ? 'text-red-600' : 'text-gray-700'
          }`}
        >
          {label}
        </span>
      )}
    </div>
  );
}
