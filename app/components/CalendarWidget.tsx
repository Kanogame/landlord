import { useState } from 'react';

export default function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState('Май 2025');

  const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

  const calendarDays = [
    [29, 30, 31, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
  ];

  return (
    <div className="w-[370px] bg-white flex flex-col">
      {/* Header */}
      <div className="h-[44px] flex items-center justify-between px-[16px] relative">
        <div className="text-[20px] text-black">{currentMonth}</div>
        <div className="flex gap-[46px]">
          <img
            src="/app/media/icons/icon-chevron-left.svg"
            alt="prev"
            className="w-[10px] h-[18px] cursor-pointer"
          />
          <img
            src="/app/media/icons/icon-chevron-right.svg"
            alt="next"
            className="w-[10px] h-[18px] cursor-pointer"
          />
        </div>
      </div>

      {/* Week days header */}
      <div className="flex justify-between px-[16px] h-[20px] items-center">
        {weekDays.map(day => (
          <div
            key={day}
            className="w-[32px] text-center text-[15px] font-bold text-[rgba(60,60,67,0.3)]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex flex-col">
        {calendarDays.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="flex justify-between px-[16px] relative"
          >
            {/* Booking highlight backgrounds */}
            {weekIndex === 1 && (
              <div className="absolute left-[65px] top-[8px] w-[305px] h-[28px] bg-[#8B2635] opacity-30 rounded-l-[10px]" />
            )}
            {weekIndex === 2 && (
              <div className="absolute left-0 top-[8px] w-[370px] h-[28px] bg-[#8B2635] opacity-30" />
            )}
            {weekIndex === 3 && (
              <div className="absolute left-0 top-[8px] w-[158px] h-[28px] bg-[#8B2635] opacity-30 rounded-r-[10px]" />
            )}

            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="w-[44px] h-[44px] flex items-center justify-center relative"
              >
                {/* Special day indicators */}
                {weekIndex === 1 && dayIndex === 6 && (
                  <div className="absolute inset-[5px] border border-[#8B2635] rounded-full" />
                )}
                {weekIndex === 3 && dayIndex === 4 && (
                  <div className="absolute inset-0 bg-[#8B2635] opacity-12 rounded-full" />
                )}

                <span
                  className={`text-[20px] ${
                    (weekIndex === 0 && dayIndex < 3) ||
                    (weekIndex >= 4 && dayIndex > 4)
                      ? 'text-[#D9D9D9]'
                      : weekIndex === 1 && dayIndex === 6
                      ? 'text-[#8B2635]'
                      : weekIndex === 3 && dayIndex === 4
                      ? 'text-[#8B2635] text-[24px]'
                      : 'text-[#2D2D2D]'
                  }`}
                >
                  {day}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
