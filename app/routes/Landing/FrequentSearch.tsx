import { useNavigate } from 'react-router';
import Block from '~/components/Block';
import ButtonArrow from '~/components/ButtonArrow';
import SearchElement from '~/components/SearchElement';
import { useDesktop } from '~/hooks/useDesktop';
import {
  searchFiltersToString,
  type TSearchFilters,
} from '~/hooks/useSearchFilters';
import { TOfferType, TPropertyType } from '~/lib/property';

const frequentSearchFilters: Array<{ filters: TSearchFilters; link: string }> =
  [
    {
      filters: {
        pageNumber: 1,
        pageSize: 10,
        offerType: TOfferType.Rent,
        propertyType: TPropertyType.Flat,
        city: 'Томск',
        roomsFrom: 3,
        priceTo: 100000,
        attributes: [],
      },
      link: '/search?offerType=0&propertyType=0&city=Томск&roomsFrom=3&priceTo=100000',
    },
    {
      filters: {
        pageNumber: 1,
        pageSize: 10,
        offerType: TOfferType.Rent,
        propertyType: TPropertyType.Flat,
        city: 'Новосибирск',
        roomsFrom: 2,
        priceTo: 80000,
        attributes: [],
      },
      link: '/search?offerType=0&propertyType=0&city=Новосибирск%20район&roomsFrom=2&priceTo=80000',
    },
    {
      filters: {
        pageNumber: 1,
        pageSize: 10,
        offerType: TOfferType.Rent,
        propertyType: TPropertyType.Flat,
        city: 'Москва',
        roomsFrom: 1,
        priceTo: 60000,
        attributes: [],
      },
      link: '/search?offerType=0&propertyType=0&city=Москва&roomsFrom=1&priceTo=60000',
    },
    {
      filters: {
        pageNumber: 1,
        pageSize: 10,
        offerType: TOfferType.Rent,
        propertyType: TPropertyType.Flat,
        city: 'Колпашево',
        roomsFrom: 3,
        priceTo: 100000,
        attributes: [],
      },
      link: '/search?offerType=0&propertyType=0&city=Колпашево&roomsFrom=3&priceTo=100000',
    },
    {
      filters: {
        pageNumber: 1,
        pageSize: 10,
        offerType: TOfferType.Rent,
        propertyType: TPropertyType.Detached,
        city: 'Барнаул',
        roomsFrom: 2,
        priceTo: 120000,
        attributes: [],
      },
      link: '/search?offerType=0&propertyType=1&city=Барнаул&roomsFrom=2&priceTo=120000',
    },
    {
      filters: {
        pageNumber: 1,
        pageSize: 10,
        offerType: TOfferType.Rent,
        propertyType: TPropertyType.Detached,
        city: 'Новосибирск',
        roomsFrom: 4,
        priceTo: 150000,
        attributes: [],
      },
      link: '/search?offerType=0&propertyType=1&city=Новосибирск&roomsFrom=4&priceTo=150000',
    },
  ];

export default function FrequentSearch() {
  const navigate = useNavigate();
  const isDesktop = useDesktop();

  const frequentSearches = frequentSearchFilters.map(({ filters, link }) => ({
    label: searchFiltersToString(filters),
    link,
  }));

  return (
    <Block label="Часто ищут" isDesktop={isDesktop}>
      <div className="flex flex-1 flex-col gap-[10px]">
        {frequentSearches.map((el, ind) => {
          return (
            <SearchElement
              key={`${el.label}-${ind}`}
              label={el.label}
              link={el.link}
              isDesktop={isDesktop}
              onClick={() => navigate(el.link)}
            />
          );
        })}
      </div>
      <div className="flex justify-center items-center">
        <ButtonArrow
          label="Перейти к поиску"
          width="220px"
          height="50px"
          onClick={() => {
            navigate('/search');
          }}
        />
      </div>
    </Block>
  );
}
