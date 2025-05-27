interface PropertyInfoLineProps {
  label: string;
  value: string;
}

export default function PropertyInfoLine({
  label,
  value,
}: PropertyInfoLineProps) {
  return (
    <div className="flex items-center gap-[5px]">
      <span className="p-def">{label}</span>
      <div className="flex-1 h-[8px] border-b-[2px] border-[#2D2D2D] border-dotted" />
      <span className="p-def">{value}</span>
    </div>
  );
}
