import { useState } from 'react';
import { useDesktop } from '~/hooks/useDesktop';
import Block from './Block';
import ButtonAccent from './ButtonAccent';
import { Calendar } from '~/components/ui/calendar';
import type { DateRange } from 'react-day-picker';

export default function PropertyCalendar() {
  const isDesktop = useDesktop();
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    from: new Date(2025, 4, 6), // May 6, 2025
    to: new Date(2025, 4, 21), // May 21, 2025
  });

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return '';
    if (!range.to) return range.from.toLocaleDateString('ru-RU');
    return `${range.from.toLocaleDateString(
      'ru-RU'
    )} - ${range.to.toLocaleDateString('ru-RU')}`;
  };

  // Custom range selection handler to fix dragging behavior
  const handleRangeSelect = (range: DateRange | undefined) => {
    if (!range) {
      setSelectedRange(undefined);
      return;
    }

    // If only 'from' is set, this is the start of a new selection
    if (range.from && !range.to) {
      setSelectedRange({ from: range.from, to: undefined });
      return;
    }

    // If both 'from' and 'to' are set, complete the range
    if (range.from && range.to) {
      // Ensure 'from' is always before 'to'
      const from = range.from <= range.to ? range.from : range.to;
      const to = range.from <= range.to ? range.to : range.from;
      setSelectedRange({ from, to });
      return;
    }

    setSelectedRange(range);
  };

  return (
    <Block label="Календарь" isDesktop={isDesktop}>
      <div className="flex gap-[12px] h-[328px]">
        <div className="flex-shrink-0" style={{ width: 370 }}>
          <Calendar
            mode="range"
            selected={selectedRange}
            onSelect={handleRangeSelect}
            numberOfMonths={1}
            className="w-[370px] bg-white flex flex-col"
            classNames={{
              months: 'flex flex-col',
              month: 'space-y-0',
              caption:
                'flex justify-center pt-[6px] relative items-center h-[44px]',
              caption_label: 'h4-def absolute left-4 top-[9px]',
              nav: 'space-x-1 flex items-center',
              nav_button:
                'h-[18px] w-[10px] bg-transparent p-0 hover:opacity-70 absolute top-[11px]',
              nav_button_previous: 'left-[298px]',
              nav_button_next: 'left-[344px]',
              table: 'w-full border-collapse',
              head_row: 'flex justify-between items-center px-4 h-5',
              head_cell:
                'w-8 h-[18px] text-center flex justify-center items-center text-[rgba(60,60,67,0.30)] n1-light',
              row: 'flex justify-between items-start px-4 relative',
              cell: 'w-[44px] h-[44px] text-center p-0 relative',
              day: 'h-[44px] w-[44px] p-0 h4-def hover:bg-gray-100 transition-colors flex items-center justify-center',
              day_selected:
                'text-[#8B2635] text-[24px] bg-[rgba(139,38,53,0.12)] rounded-full',
              day_range_start:
                'text-[#2D2D2D] text-[20px] bg-[#DCBEC2] relative z-10',
              day_range_end:
                'text-[#2D2D2D] text-[20px] bg-[#DCBEC2] relative z-10',
              day_range_middle:
                'text-[#2D2D2D] text-[20px] bg-[#DCBEC2] relative z-10',
              day_today: 'text-[#8B2635] border border-[#8B2635] rounded-full',
              day_outside: 'text-[#D9D9D9]',
              day_disabled: 'text-[#D9D9D9] opacity-50 cursor-not-allowed',
              day_hidden: 'invisible',
            }}
            components={{
              IconLeft: () => (
                <svg
                  width="10"
                  height="18"
                  viewBox="0 0 10 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.79021 0.203368C9.85671 0.267669 9.90947 0.344057 9.94547 0.428156C9.98147 0.512255 10 0.602412 10 0.693464C10 0.784516 9.98147 0.874673 9.94547 0.958772C9.90947 1.04287 9.85671 1.11926 9.79021 1.18356L1.72512 9.00018L9.79021 16.8168C9.9243 16.9468 9.99963 17.1231 9.99963 17.3069C9.99963 17.4907 9.9243 17.667 9.79021 17.797C9.65612 17.927 9.47425 18 9.28462 18C9.09499 18 8.91313 17.927 8.77904 17.797L0.209794 9.49028C0.143292 9.42598 0.0905301 9.34959 0.0545301 9.26549C0.0185301 9.18139 0 9.09123 0 9.00018C0 8.90913 0.0185301 8.81897 0.0545301 8.73487C0.0905301 8.65077 0.143292 8.57439 0.209794 8.51009L8.77904 0.203368C8.84537 0.138903 8.92417 0.0877574 9.01093 0.0528602C9.09768 0.0179631 9.19069 0 9.28462 0C9.37855 0 9.47156 0.0179631 9.55831 0.0528602C9.64507 0.0877574 9.72387 0.138903 9.79021 0.203368Z"
                    fill="#2D2D2D"
                  />
                </svg>
              ),
              IconRight: () => (
                <svg
                  width="10"
                  height="18"
                  viewBox="0 0 10 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.209794 0.203368C0.143292 0.267669 0.0905304 0.344057 0.0545311 0.428156C0.0185308 0.512255 0 0.602412 0 0.693464C0 0.784516 0.0185308 0.874673 0.0545311 0.958772C0.0905304 1.04287 0.143292 1.11926 0.209794 1.18356L8.27488 9.00018L0.209794 16.8168C0.0757046 16.9468 0.000374794 17.1231 0.000374794 17.3069C0.000374794 17.4907 0.0757046 17.667 0.209794 17.797C0.343884 17.927 0.525748 18 0.71538 18C0.905011 18 1.08687 17.927 1.22096 17.797L9.79021 9.49028C9.85671 9.42598 9.90947 9.34959 9.94547 9.26549C9.98147 9.18139 10 9.09123 10 9.00018C10 8.90913 9.98147 8.81897 9.94547 8.73487C9.90947 8.65077 9.85671 8.57439 9.79021 8.51009L1.22096 0.203368C1.15463 0.138903 1.07583 0.0877574 0.989072 0.0528602C0.902315 0.0179631 0.809309 0 0.71538 0C0.62145 0 0.528444 0.0179631 0.441688 0.0528602C0.354931 0.0877574 0.276128 0.138903 0.209794 0.203368Z"
                    fill="#2D2D2D"
                  />
                </svg>
              ),
            }}
          />
        </div>
        <div className="w-[1px] bg-[#E3E3E3]" />
        <div className="flex-1 flex flex-col">
          <div className="text-[20px] text-black mb-[20px]">
            События за выбранный период
          </div>
          <div className="text-[15px] font-bold text-black mb-[15px]">
            {selectedRange?.from && selectedRange?.to
              ? `Ремонт ${formatDateRange(selectedRange)}`
              : 'Выберите период'}
          </div>
          <div className="flex-1 text-[12px] text-[#2D2D2D] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#D9D9D9] to-transparent opacity-50" />
            <p>
              {selectedRange?.from && selectedRange?.to
                ? `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Quisque rhoncus accumsan aliquam accumsan eleifend vehicula eget
                finibus ut ex turp...`
                : 'Выберите период на календаре, чтобы увидеть события'}
            </p>
          </div>
          <ButtonAccent
            label="Увидеть полный календарь"
            width="200px"
            height="30px"
          />
        </div>
      </div>
    </Block>
  );
}
