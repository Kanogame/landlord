import { useState, useRef, useEffect } from 'react';
import { Input } from '~/components/ui/input';

interface PhoneInputProps {
  required?: boolean;
  className?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function PhoneInput({
  required,
  className,
  placeholder = '(999) 999-99-99',
  name = 'phone',
  value: controlledValue,
  onChange,
}: PhoneInputProps) {
  const [value, setValue] = useState(controlledValue || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPositionRef = useRef<number>(0);

  // Format phone number: 1234567890 -> (123) 456-78-90
  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, '');
    const limitedDigits = digits.slice(0, 10);

    if (limitedDigits.length === 0) return '';
    if (limitedDigits.length <= 3) return `(${limitedDigits}`;
    if (limitedDigits.length <= 6) {
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
    }
    if (limitedDigits.length <= 8) {
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(
        3,
        6
      )}-${limitedDigits.slice(6)}`;
    }
    return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(
      3,
      6
    )}-${limitedDigits.slice(6, 8)}-${limitedDigits.slice(8)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cursorPos = e.target.selectionStart || 0;

    const formatted = formatPhoneNumber(inputValue);

    setValue(formatted);

    // Call external onChange with raw digits
    const rawDigits = formatted.replace(/\D/g, '');
    onChange?.(rawDigits);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const cursorPos = e.currentTarget.selectionStart || 0;

    if (e.key === 'Backspace' && cursorPos > 0) {
      const charBeforeCursor = value[cursorPos - 1];

      // If deleting a formatting character, skip over it
      if (charBeforeCursor && !/\d/.test(charBeforeCursor)) {
        e.preventDefault();

        // Find the previous digit to delete
        let newCursorPos = cursorPos - 1;
        while (newCursorPos > 0 && !/\d/.test(value[newCursorPos - 1])) {
          newCursorPos--;
        }

        if (newCursorPos > 0) {
          const newValue =
            value.slice(0, newCursorPos - 1) + value.slice(cursorPos);
          const formatted = formatPhoneNumber(newValue);
          setValue(formatted);

          const rawDigits = formatted.replace(/\D/g, '');
          onChange?.(rawDigits);
        }
      }
    }
  };

  // Handle controlled value changes
  useEffect(() => {
    if (controlledValue !== undefined) {
      const formatted = formatPhoneNumber(controlledValue);
      setValue(formatted);
    }
  }, [controlledValue]);

  return (
    <Input
      ref={inputRef}
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={className}
      required={required}
    />
  );
}
