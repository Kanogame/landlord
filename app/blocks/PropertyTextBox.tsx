import Block from '~/components/Block';
import ButtonAccent from '~/components/ButtonAccent';
import TextArea from '~/components/TextArea';
import { type TProperty, FormatArea } from '~/lib/property';

interface PropertyPreviewProps {
  value: string;
  onChange: (value: string) => void;
  isDesktop: boolean;
}

export default function PropertyPreview({
  value,
  onChange,
  isDesktop,
}: PropertyPreviewProps) {
  return (
    <Block label="О квартире" isDesktop={isDesktop}>
      <TextArea
        maxLength={5000}
        value={value}
        onChange={onChange}
        className="w-[100%] h-[100%]"
      />
    </Block>
  );
}
