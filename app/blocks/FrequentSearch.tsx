import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router';
import Block from '~/components/Block';
import ButtonArrow from '~/components/ButtonArrow';
import SearchElement from '~/components/SearchElement';
import { useDesktop } from '~/hooks/useDesktop';

const frequentSearch = [
  {
    lable: '3-комн квартира, центр, до 100 000 Р',
    link: '/search/3-komn-kvartira-tsentr',
  },
  {
    lable: '2-комн квартира, спальный, до 80 000 Р',
    link: '/search/2-komn-kvartira-spalnyy',
  },
  {
    lable: 'Студия, центр, до 60 000 Р',
    link: '/search/studiya-tsentr',
  },
  {
    lable: '3-комн квартира, новостройка, до 100 000 Р',
    link: '/search/3-komn-kvartira-novostroyka',
  },
  {
    lable: '2-комн дом, в черте города, до 120 000 Р',
    link: '/search/2-komn-dom-v-cherte-goroda',
  },
  {
    lable: '4-комн дом, окраина, до 150 000 Р',
    link: '/search/4-komn-dom-okrayina',
  },
];

export default function FrequentSearch() {
  const navigate = useNavigate();
  const isDesktop = useDesktop();

  return (
    <Block label="Часто ищут" isDesktop={isDesktop}>
      <div className="flex flex-col gap-[10px]">
        {frequentSearch.map((el, ind) => {
          return (
            <SearchElement
              key={el.lable}
              label={el.lable}
              link={el.link}
              isDesktop={isDesktop}
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
