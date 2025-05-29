import NumberInput from '~/components/NumberInput';

interface AreaInputProps {
  value?: number;
  onChange: (value?: number) => void;
}

export default function AreaInput({ value, onChange }: AreaInputProps) {
  return (
    <NumberInput
      value={value}
      onChange={onChange}
      placeholder="Площадь"
      className="w-40"
      min={10}
      max={1000}
      step={5}
    />
  );
}
