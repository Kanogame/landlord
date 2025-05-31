import Block from '~/components/Block';
import Button from '~/components/Button';
import { TProperty, FormatArea } from '~/lib/property';

interface PropertyPreviewProps {
  property: TProperty;
  isDesktop: boolean;
}

export default function PropertyPreview({
  property,
  isDesktop,
}: PropertyPreviewProps) {
  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Editing property details');
  };

  return (
    <Block label="О квартире" isDesktop={isDesktop}>
      <div
        className="w-[780px] p-[20px] bg-white rounded-[20px] flex flex-col gap-[15px]"
        style={{
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        <h2 className="text-[#2D2D2D] text-[24px] font-normal font-['Fira_Sans']">
          О квартире
        </h2>

        <div className="h-[218px] relative overflow-hidden">
          {/* Left Column */}
          <div className="w-[340px] absolute left-0 top-0">
            <PropertyInfoLine
              label="Площадь"
              value={FormatArea(property.property.area)}
              top={0}
            />
            <PropertyInfoLine
              label="Этаж"
              value={`${property.property.floor} из ${property.property.totalFloors}`}
              top={34}
            />
            <PropertyInfoLine
              label="Адрес"
              value={property.property.address || 'Не указан'}
              top={68}
            />
          </div>

          {/* Right Column */}
          <div className="w-[340px] absolute left-[399px] top-0">
            <PropertyInfoLine label="Тип" value="Квартира" top={0} />
            <PropertyInfoLine
              label="Комнаты"
              value={`${property.property.rooms}`}
              top={34}
            />
            <PropertyInfoLine
              label="Цена"
              value={`${property.property.price} ₽`}
              top={68}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <span className="text-black text-[14px] font-normal font-['Fira_Sans']">
            И еще 8 параметров
          </span>
        </div>

        <div className="flex justify-end">
          <Button
            label="Редактировать"
            onClick={handleEdit}
            width="120px"
            height="30px"
          />
        </div>
      </div>
    </Block>
  );
}

interface PropertyInfoLineProps {
  label: string;
  value: string;
  top: number;
}

function PropertyInfoLine({ label, value, top }: PropertyInfoLineProps) {
  return (
    <div
      className="w-[340px] absolute flex justify-center items-center gap-[5px]"
      style={{ top }}
    >
      <span className="text-black text-[14px] font-normal font-['Fira_Sans']">
        {label}
      </span>
      <div className="flex-1 h-[8px] border-b border-black" />
      <span className="text-[#2D2D2D] text-[14px] font-normal font-['Fira_Sans'] text-right">
        {value}
      </span>
    </div>
  );
}
