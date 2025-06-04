import { useMediaQuery } from 'react-responsive';
import Block from '~/components/Block';
import ScrollBlock from '~/components/ScrollBlock';
import TextCard from '~/components/TextCard';
import { useDesktop } from '~/hooks/useDesktop';

const offers = [
  {
    header: 'Ипотека',
    desc: 'Выгодные кредитные условия для покупки вашей мечты.',
    link: '/offers',
  },
  {
    header: 'Кредит',
    desc: 'Гибкие программы для приобретения недвижимости.',
    link: '/offers',
  },
  {
    header: 'Рассрочка',
    desc: 'Удобная рассрочка платежей без лишних переплат и сложностей.',
    link: '/offers',
  },
  {
    header: 'Инвестиции',
    desc: 'Инвестиционные варианты для финансовой стабильности.',
    link: '/offers',
  },
  {
    header: 'Бонусы',
    desc: 'Подбор специальных предложений и скидок.',
    link: '/offers',
  },
];

export default function Offers() {
  const isDesktop = useDesktop();

  return (
    <>
      {isDesktop ? (
        <Block
          label="Предложения"
          link={{ label: 'Все', href: '/tips' }}
          isDesktop
        >
          <div className="grid grid-cols-3 h-[100%] gap-[10px]">
            {offers.map((el, ind) => {
              return (
                <div className={ind === 2 ? 'row-span-2' : ''} key={el.header}>
                  <TextCard header={el.header} desc={el.desc} link={el.link} />
                </div>
              );
            })}
          </div>
        </Block>
      ) : (
        <ScrollBlock
          label="Предложения"
          link={{ label: 'Все', href: '/tips' }}
          isDesktop={isDesktop}
        >
          {offers.map((el, ind) => {
            return (
              <div className="w-[288px] shrink-0" key={el.header}>
                <TextCard header={el.header} desc={el.desc} link={el.link} />
              </div>
            );
          })}
        </ScrollBlock>
      )}
    </>
  );
}
