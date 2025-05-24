import { label } from 'motion/react-client';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import DesktopWidth from '~/blocks/DesktopWidth';
import FrequentSearch from '~/blocks/FrequentSearch';
import LoginPromo from '~/blocks/Login-promo';
import Offers from '~/blocks/Offers';
import SearchBanner from '~/blocks/SearchBanner';
import SlideScroller from '~/blocks/SlideScroller';
import Tips from '~/blocks/Tips';
import { TPropertyType, TRentPeriod } from '~/lib/property';
import PropertyCard from '~/components/PropertyCard';
import ScrollBlock from '~/components/ScrollBlock';
import SearchElement from '~/components/SearchElement';
import TextCard from '~/components/TextCard';
import { useMediaQuery } from 'react-responsive';

export default function LandingPage() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
  const navigate = useNavigate();
  return (
    <div>
      <SlideScroller />
      <DesktopWidth isDesktop={isDesktop}>
        <ScrollBlock
          label="Аренда"
          isDesktop={isDesktop}
          link={{ label: 'Все', href: '/search' }}
        >
          {Array(10)
            .fill(1)
            .map((_, ind) => {
              return (
                <PropertyCard
                  key={ind}
                  property={{
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
                  }}
                />
              );
            })}
        </ScrollBlock>
        <ScrollBlock
          label="Продажа"
          isDesktop={isDesktop}
          link={{ label: 'Все', href: '/search' }}
        >
          {Array(10)
            .fill(1)
            .map((_, ind) => {
              return (
                <PropertyCard
                  key={ind}
                  property={{
                    type: TPropertyType.Sell,
                    property: {
                      id: 4,
                      ownerId: 321,
                      name: 'Коттедж в Сочи',
                      address:
                        'Краснодарский край, г. Сочи, ул. Морская, д. 15',
                      area: 200,
                      images: [],
                      cost: {
                        amount: '200000000',
                        currency: 125,
                        currencySymbol: 'P',
                      },
                    },
                  }}
                />
              );
            })}
        </ScrollBlock>
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
