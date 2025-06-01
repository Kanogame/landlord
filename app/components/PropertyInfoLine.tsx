interface PropertyInfoLineProps {
  label: string;
  value: string;
  className?: String;
}

export default function PropertyInfoLine({
  label,
  value,
  className,
}: PropertyInfoLineProps) {
  function parseValue(value: string) {
    if (value == 'true') {
      return 'Да';
    }
    if (value == 'false') {
      return 'Нет';
    }
    return value;
  }

  return (
    <div className={`flex items-center gap-[5px] ${className}`}>
      <span className="h5-def">{label}</span>
      <div className="flex-1 h-[8px] border-b-[2px] border-[#2D2D2D] border-dotted" />
      <span className="h5-def">{parseValue(value)}</span>
    </div>
  );
}
