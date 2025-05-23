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
import { TPropertyType, TRentPeriod } from '~/utils/property';
import PropertyCard from '~/components/PropertyCard';
import ScrollBlock from '~/components/ScrollBlock';
import SearchElement from '~/components/SearchElement';
import TextCard from '~/components/TextCard';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <SlideScroller />
      <DesktopWidth>
        <ScrollBlock label="Аренда" link={{ label: 'Все', href: '/search' }}>
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
                      area: 30,
                      images: [],
                      raiting: 3.8,
                      cost: '20 000',
                      period: TRentPeriod.Week,
                    },
                  }}
                />
              );
            })}
        </ScrollBlock>
        <ScrollBlock label="Продажа" link={{ label: 'Все', href: '/search' }}>
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
                      images: [
                        'https://example.com/image6.jpg',
                        'https://example.com/image7.jpg',
                      ],
                      cost: '25000000 руб.',
                    },
                  }}
                />
              );
            })}
        </ScrollBlock>
      </DesktopWidth>
      <SearchBanner />
      <DesktopWidth>
        <div className="grid grid-cols-[3fr_2fr] gap-[30px]">
          <div className="flex flex-col gap-[30px] w-[100%]">
            <Offers />
            <Tips />
          </div>

          <div className="flex flex-col gap-[30px] w-[100%]">
            <LoginPromo />
            <FrequentSearch />
          </div>
        </div>
      </DesktopWidth>
    </div>
  );
}
