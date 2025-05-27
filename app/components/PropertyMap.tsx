import Block from './Block';
import type { TAddress } from '~/lib/property';

interface PropertyMapProps {
  address: TAddress;
}

export default function PropertyMap({ address }: PropertyMapProps) {
  return (
    <Block label="На карте" isDesktop={true}>
      <div className="flex flex-col gap-[15px]">
        <img
          src="/app/media/images/map-placeholder.png"
          alt="Map"
          className="w-[740px] h-[298px] rounded-[10px] object-cover"
        />
        <div className="text-[12px] text-[#707070]">
          {address.displayAddress}
        </div>
        <div className="flex items-center gap-[5px] cursor-pointer">
          <span className="text-[12px] text-[#2D2D2D]">Показать полностью</span>
          <img
            src="/app/media/icons/icon-chevron-down.svg"
            alt="expand"
            className="w-[19px] h-[16px]"
          />
        </div>
      </div>
    </Block>
  );
}
