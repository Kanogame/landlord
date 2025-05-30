import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import iconDown from './dropdown/lcon-down.svg';

interface DropdownProps {
  values: string[];
  onChosen: (choose: string) => void;
  width?: number;
  offsetY?: number;
  placeholder?: string;
  selectedValue?: string;
}

export default function Dropdown({
  values,
  onChosen,
  width,
  offsetY,
  placeholder = 'Выберите опцию',
  selectedValue,
}: DropdownProps) {
  const [open, setOpen] = useState<boolean>(false);

  const displayValue = selectedValue || placeholder;
  const widthStyle = width ? `${width}px` : 'auto';

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-[#2D2D2D] bg-white border border-[#EFEFEF] rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#8B2635] focus:ring-opacity-20 transition-colors"
          style={{ width: widthStyle }}
        >
          <span className="truncate">{displayValue}</span>
          <img
            src={iconDown}
            alt="dropdown arrow"
            className={`w-4 h-4 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-[var(--radix-dropdown-menu-trigger-width)] bg-white border border-[#EFEFEF] rounded-lg shadow-lg p-1"
        align="start"
        sideOffset={4}
        style={{
          marginRight: offsetY ? `${offsetY}px` : undefined,
          width: width ? `${width}px` : undefined,
        }}
      >
        {values.map((value, index) => (
          <DropdownMenuItem
            key={index}
            className="px-3 py-2 text-sm text-[#2D2D2D] cursor-pointer hover:bg-[#F8F8F8] focus:bg-[#F3E7E7] rounded-md transition-colors"
            onClick={() => {
              onChosen(value);
              setOpen(false);
            }}
          >
            {value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
