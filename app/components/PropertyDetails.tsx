import { useState } from 'react';
import Block from './Block';
import PropertyInfoLine from './PropertyInfoLine';
import type { TProperty } from '~/lib/property';
import ArrowDown from '~/media/icons/icon-arrow-down.svg';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';

interface PropertyDetailsProps {
  property: TProperty;
  isDesktop: boolean;
}

export default function PropertyDetails({
  property,
  isDesktop,
}: PropertyDetailsProps) {
  const [showFull, setShowFull] = useState(false);

  const attibutes = property.property.propertyAttributes;
  return (
    <>
      {!isDesktop && (
        <Drawer open={showFull} onClose={() => setShowFull(false)}>
          <DrawerContent>
            <div className="flex flex-col  gap-[40px] p-[20px]">
              <div className="h3-def self-center">О недвижимости</div>
              {attibutes.map((detail, index) => (
                <PropertyInfoLine
                  key={index}
                  label={detail.name}
                  value={detail.value}
                />
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      )}
      <Block label="О квартире" isDesktop={isDesktop}>
        <div className="flex flex-wrap gap-[40px]">
          {(showFull && isDesktop ? attibutes : attibutes.slice(0, 6)).map(
            (detail, index) => (
              <div className="flex-[1_0_300px]">
                <PropertyInfoLine
                  key={index}
                  label={detail.name}
                  value={detail.value}
                />
              </div>
            )
          )}
        </div>

        <div className="flex items-center justify-center gap-[5px] cursor-pointer mt-[15px]">
          <span
            className="text-[12px] text-[#2D2D2D]"
            onClick={() => {
              setShowFull(!showFull);
            }}
          >
            {showFull ? 'Скрыть' : 'Показать полностью'}
          </span>
          <img src={ArrowDown} alt="expand" className="w-[19px] h-[16px]" />
        </div>
      </Block>
    </>
  );
}
