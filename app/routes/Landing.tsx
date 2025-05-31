import { useNavigate } from 'react-router';
import DesktopWidth from '~/blocks/DesktopWidth';
import FrequentSearch from '~/blocks/FrequentSearch';
import LoginPromo from '~/blocks/Login-promo';
import Offers from '~/blocks/Offers';
import SearchBanner from '~/blocks/SearchBanner';
import SlideScroller from '~/blocks/SlideScroller';
import Tips from '~/blocks/Tips';
import { TOfferType, type TSearchResult } from '~/lib/property';
import { useDesktop } from '~/hooks/useDesktop';
import CardFetchScroller from '~/blocks/CardFetchScroller';
import { ErrorToast, Post } from '~/lib/api';
import type { Route } from './+types/Landing';
import { toast } from 'sonner';

export async function clientLoader(): Promise<{
  rent: TSearchResult;
  sell: TSearchResult;
}> {
  console.log('hi');
  const rent = await Post<TSearchResult>('api/Property/get_properties_search', {
    pageNumber: 1,
    pageSize: 10,
    offerType: TOfferType.Rent,
  });

  if (!rent || rent.success == false) {
    ErrorToast('Ошибка при загрузке объявлений');
  }

  const sell = await Post<TSearchResult>('api/Property/get_properties_search', {
    pageNumber: 1,
    pageSize: 10,
    offerType: TOfferType.Sell,
  });

  if (!sell || sell.success == false) {
    ErrorToast('Ошибка при загрузке объявлений');
  }
  return { rent: rent, sell: sell };
}

export default function LandingPage({ loaderData }: Route.ComponentProps) {
  const isDesktop = useDesktop();
  const navigate = useNavigate();

  const { rent, sell } = loaderData as {
    rent: TSearchResult;
    sell: TSearchResult;
  };
  return (
    <div className="w-[100%]">
      <SlideScroller />
      <DesktopWidth isDesktop={isDesktop}>
        <CardFetchScroller
          label="Аренда"
          link={{ label: 'Все', href: '/search' }}
          loaded={rent}
        />
        <CardFetchScroller
          label="Продажа"
          link={{ label: 'Все', href: '/search' }}
          loaded={sell}
        />
      </DesktopWidth>
      <SearchBanner />
      <DesktopWidth isDesktop={isDesktop}>
        <div
          className={
            isDesktop
              ? 'grid grid-cols-[3fr_2fr] gap-[20px]'
              : 'flex flex-col gap-[20px]'
          }
        >
          <div className="flex flex-col gap-[20px] w-[100%]">
            <Offers />
            <Tips />
          </div>

          <div className="flex flex-col gap-[20px] w-[100%]">
            <LoginPromo />
            <FrequentSearch />
          </div>
        </div>
      </DesktopWidth>
    </div>
  );
}
