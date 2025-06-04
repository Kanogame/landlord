import { useDesktop } from '~/hooks/useDesktop';
import Block from '../../components/Block';
import { Stars } from '../../components/Stars';

interface PropertyDescriptionProps {
  description: string;
  rating?: number;
}

export default function PropertyDescription({
  description,
  rating,
}: PropertyDescriptionProps) {
  const isDesktop = useDesktop();
  return (
    <Block label="" isDesktop={isDesktop}>
      <div
        className={
          'flex items-center gap-[10px] ' + (isDesktop ? 'h3-def' : 'h4-def')
        }
      >
        Описание
        {rating && <Stars rating={rating} />}
      </div>

      <div className="flex flex-col gap-[15px]">
        <div className="text-[14px] text-[#2D2D2D] leading-relaxed">
          {description}
        </div>
      </div>
    </Block>
  );
}
