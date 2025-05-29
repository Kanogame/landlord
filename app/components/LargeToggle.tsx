import { motion } from 'motion/react';

interface LargeToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export default function LargeToggle({
  checked,
  onChange,
  label,
  description,
}: LargeToggleProps) {
  return (
    <motion.button
      className={`w-full p-4 rounded-lg border-2 transition-all ${
        checked
          ? 'border-red-600 bg-red-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
      onClick={() => onChange(!checked)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <div className="text-left">
          <div
            className={`font-medium ${
              checked ? 'text-red-900' : 'text-gray-900'
            }`}
          >
            {label}
          </div>
          {description && (
            <div
              className={`text-sm ${
                checked ? 'text-red-600' : 'text-gray-500'
              }`}
            >
              {description}
            </div>
          )}
        </div>

        <div
          className={`w-12 h-7 rounded-full p-1 transition-colors ${
            checked ? 'bg-red-600' : 'bg-gray-300'
          }`}
        >
          <motion.div
            className="w-5 h-5 bg-white rounded-full shadow-sm"
            animate={{
              x: checked ? 20 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          />
        </div>
      </div>
    </motion.button>
  );
}
