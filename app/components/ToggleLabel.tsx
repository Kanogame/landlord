import Toggle from './Toggle';

interface ToggleLabelProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'small' | 'large';
  label?: string;
}

export default function ToggleLabel({
  checked,
  onChange,
  size = 'small',
  label,
}: ToggleLabelProps) {
  return (
    <div className="flex items-center justify-between">
      {label && <span className="h5-def">{label}</span>}
      <Toggle checked={checked} onChange={onChange} size={size} />
    </div>
  );
}
