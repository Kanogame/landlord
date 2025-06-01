import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '~/components/ui/input';
import { type TMoney } from '~/lib/money';

export interface MoneyInputProps {
  value?: TMoney;
  onChange: (value?: TMoney) => void;
  placeholder?: string;
  className?: string;
  currency?: number;
  currencySymbol?: string;
}

export default function MoneyInput({
  value,
  onChange,
  placeholder,
  className = '',
  currency = 125, // Default to rubles
  currencySymbol = '₽',
}: MoneyInputProps) {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (value?.amount) {
      const numericValue = parseFloat(value.amount);
      setDisplayValue(formatDisplayValue(numericValue));
    } else {
      setDisplayValue('');
    }
  }, [value]);

  const formatDisplayValue = (num: number): string => {
    const integerPart = Math.floor(num);
    const decimalPart = num % 1;

    // Format integer part with spaces
    const formattedInteger = integerPart
      .toString()
      .split('')
      .reverse()
      .map((digit, index) => {
        return digit + (index > 0 && index % 3 === 0 ? ' ' : '');
      })
      .reverse()
      .join('');

    // Add decimal part if it exists
    if (decimalPart > 0) {
      const decimalString = decimalPart.toFixed(2).substring(2);
      return `${formattedInteger},${decimalString}`;
    }

    return formattedInteger;
  };

  const parseInputValue = (input: string): number | undefined => {
    // Remove all spaces and replace comma with dot
    const cleanInput = input.replace(/\s/g, '').replace(',', '.');

    // Check if it's a valid number
    if (cleanInput === '' || isNaN(Number(cleanInput))) {
      return undefined;
    }

    return parseFloat(cleanInput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow only digits, spaces, and one comma/dot
    const sanitizedValue = inputValue.replace(/[^\d\s,]/g, '');

    // Prevent multiple commas
    const commaCount = (sanitizedValue.match(/,/g) || []).length;
    if (commaCount > 1) return;

    // Parse the numeric value
    const numericValue = parseInputValue(sanitizedValue);

    if (numericValue !== undefined) {
      const moneyValue: TMoney = {
        amount: numericValue.toString(),
        currency,
        currencySymbol,
      };
      setDisplayValue(formatDisplayValue(numericValue));
      onChange(moneyValue);
    } else if (sanitizedValue === '') {
      setDisplayValue('');
      onChange(undefined);
    } else {
      // For partial input (like "1,"), just update display without triggering onChange
      setDisplayValue(sanitizedValue);
    }
  };

  const handleClear = () => {
    setDisplayValue('');
    onChange(undefined);
  };

  const hasValue = displayValue !== '';

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
        />

        {hasValue && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
            onClick={handleClear}
          >
            ×
          </motion.button>
        )}

        {/* Currency symbol */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none z-5">
          {currencySymbol}
        </div>
      </div>
    </div>
  );
}
