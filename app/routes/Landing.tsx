import { useNavigate } from 'react-router';
import DesktopWidth from '~/components/DesktopWidth';
import FrequentSearch from '~/routes/Landing/FrequentSearch';
import LoginPromo from '~/routes/Landing/Login-promo';
import Offers from '~/routes/Landing/Offers';
import SearchBanner from '~/routes/Landing/SearchBanner';
import SlideScroller from '~/routes/Landing/SlideScroller';
import Tips from '~/routes/Landing/Tips';
import { TOfferType, type TSearchResult } from '~/lib/property';
import { useDesktop } from '~/hooks/useDesktop';
import CardScroller from '~/components/CardScroller';
import { ErrorToast, Post } from '~/lib/api';
import type { Route } from './+types/Landing';
import Block from '~/components/Block';
import { Input } from '~/components/ui/input';
import ButtonIcon from '~/components/ButtonIcon';
import iconSearch from '~/media/icons/icon-search.svg';
import TypeSwitcher from '~/components/TypeSwitcher';
import { useState } from 'react';
import SearchElement from '~/components/SearchElement';
import { useAuth } from '~/hooks/useAuth';

export async function clientLoader(): Promise<{
  rent: TSearchResult;
  sell: TSearchResult;
}> {
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
  const [type, setType] = useState(0);
  const { isAuthenticated } = useAuth();
  const isDesktop = useDesktop();

  const { rent, sell } = loaderData as {
    rent: TSearchResult;
    sell: TSearchResult;
  };
  return (
    <div className="w-[100%]">
      {isDesktop && <SlideScroller />}
      <DesktopWidth isDesktop={isDesktop}>
        {!isDesktop && (
          <Block label="Поиск" isDesktop={isDesktop}>
            <TypeSwitcher value={type} onChange={setType} />
            <SearchElement
              isDesktop={isDesktop}
              label="Нажмите чтобы перейти в поиск"
              link={`/search?offerType=${type}`}
            />
          </Block>
        )}
        <CardScroller
          label="Аренда"
          link={{ label: 'Все', href: '/search?offerType=0' }}
          loaded={rent}
        />
        <CardScroller
          label="Продажа"
          link={{ label: 'Все', href: '/search?offerType=1' }}
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
            {!isAuthenticated && <LoginPromo />}
            <FrequentSearch />
          </div>
        </div>
      </DesktopWidth>
    </div>
  );
}
