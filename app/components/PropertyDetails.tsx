import Block from './Block';
import PropertyInfoLine from './PropertyInfoLine';
import type { TProperty } from '~/lib/property';
import ArrowDown from '~/media/icons/icon-arrow-down.svg';

interface PropertyDetailsProps {
  property: TProperty;
  isDesktop: boolean;
}

export default function PropertyDetails({
  property,
  isDesktop,
}: PropertyDetailsProps) {
  const details = [
    { label: 'Площадь', value: `${property.property.area} м²` },
    { label: 'Залог', value: '100 000 Р' },
    { label: 'Оплата ЖКХ', value: 'Включено' },
    { label: 'Срок аренды', value: 'от 3 месяца' },
    { label: 'Условия проживания', value: 'Без животных' },
    { label: 'Можно снять', value: 'через 3 недели' },
  ];

  return (
    <Block label="О квартире" isDesktop={isDesktop}>
      <div className="grid grid-cols-2 gap-x-[59px] gap-y-[34px]">
        {details.map((detail, index) => (
          <PropertyInfoLine
            key={index}
            label={detail.label}
            value={detail.value}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-[5px] cursor-pointer mt-[15px]">
        <span className="text-[12px] text-[#2D2D2D]">Показать полностью</span>
        <img src={ArrowDown} alt="expand" className="w-[19px] h-[16px]" />
      </div>
    </Block>
  );
}
