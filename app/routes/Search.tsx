import { useMediaQuery } from 'react-responsive';
import DesktopWidth from '~/blocks/DesktopWidth';
import SearchList from '~/blocks/SearchList';
import { Post } from '~/lib/api';
import {
  TPropertyType,
  TRentPeriod,
  type TGenericProperty,
  type TProperty,
} from '~/lib/property';
import type { Route } from '../+types/root';
import { useDesktop } from '~/hooks/useDesktop';

const some = Array(10).fill({
  type: TPropertyType.Rent,
  property: {
    id: 3,
    ownerId: 789,
    name: '3х комнатная квартира',
    address: 'Санкт-Петербург, ул. Невского, д. 20, кв. 5',
    desc: 'Уютная квартира с ремонтом под ключ в районе с развитой инфраструктурой. Рядом парк и детский сад. ',
    area: 30,
    images: [],
    raiting: 3.8,
    cost: {
      amount: '30000',
      currency: 125,
      currencySymbol: 'P',
    },
    period: TRentPeriod.Week,
  },
  owner: {
    id: 82,
    name: {
      name: 'Иван',
      surname: 'Иванов',
      patronym: 'Иванович',
    },
  },
});

export async function clientLoader({ param }) {
  console.log('here');
  const resp = await Post<TProperty[]>('api/Property/get_properties_search', {
    pageNumber: 1,
    pageSize: 10,
    offerType: 0,
  });
  return resp;
}

export default function SeachPage({ loaderData }: Route.ComponentProps) {
  const isDesktop = useDesktop();

  console.log(loaderData);

  return (
    <DesktopWidth isDesktop={isDesktop}>
      <div className="flex gap-[20px] w-[100%]">
        <div className="flex-[2_1]"></div>
        <div className="flex-[10_1]">
          <SearchList propertyList={loaderData} />
        </div>
      </div>
    </DesktopWidth>
  );
}
