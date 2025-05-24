import { useMediaQuery } from 'react-responsive';
import ButtonArrow from '~/components/ButtonArrow';
import banner from '~/media/images/banner2.png';

export default function SearchBanner() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  return (
    <div
      style={{
        background: `url(${banner})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className={
        'w-[100%] py-[30px] flex justify-between ' +
        (isDesktop ? 'px-[50px]' : 'flex-col px-[16px]')
      }
    >
      <div>
        <div className={isDesktop ? 'h3-def mb-[20px]' : 'h5-def mb-[20px]'}>
          Не можете найти?
        </div>
        <div className={isDesktop ? 'h1-def mb-[40px]' : 'h3-def mb-[40px]'}>
          Попробуйте поиск по фильтрам
        </div>
        {isDesktop && (
          <div className="h4-def w-[500px]">
            Вы сможете сузить круг поиска при помощи фильтров и увидеть объекты
            на карте
          </div>
        )}
      </div>
      <div className="flex flex-col justify-end">
        <ButtonArrow
          label="Попробовать"
          width={isDesktop ? '180px' : '100%'}
          height={isDesktop ? '60px' : '40px'}
          radius={isDesktop ? 12 : undefined}
        />
      </div>
    </div>
  );
}
