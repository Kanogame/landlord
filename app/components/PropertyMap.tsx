import { useDesktop } from '~/hooks/useDesktop';
import Block from './Block';
import type { TAddress } from '~/lib/property';

interface PropertyMapProps {
  address: TAddress;
}

export default function PropertyMap({ address }: PropertyMapProps) {
  const isDesktop = useDesktop();

  return (
    <Block label="" isDesktop={isDesktop}>
      <div
        className={
          'flex items-center gap-[10px] ' + (isDesktop ? 'h3-def' : 'h4-def')
        }
      >
        Описание
        <div className="p-light">{address.displayAddress}</div>
      </div>

      <div className="flex flex-col gap-[15px]">
        <img
          src="/app/media/images/map-placeholder.png"
          alt="Map"
          className="w-[100%] h-[100%] rounded-[10px] object-cover"
        />
      </div>
    </Block>
  );
}
