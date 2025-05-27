import { useMediaQuery } from 'react-responsive';
import DesktopWidth from '~/blocks/DesktopWidth';
import SearchList from '~/blocks/SearchList';
import { Post } from '~/lib/api';
import {
  TOfferType,
  TRentPeriod,
  type TGenericProperty,
  type TProperty,
  type TSearchResult,
} from '~/lib/property';
import type { Route } from '../+types/root';
import { useDesktop } from '~/hooks/useDesktop';

export async function clientLoader({ param }): Promise<TSearchResult> {
  const resp = await Post<TSearchResult>('api/Property/get_properties_search', {
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
          <SearchList propertyList={(loaderData as TSearchResult).properties} />
        </div>
      </div>
    </DesktopWidth>
  );
}
