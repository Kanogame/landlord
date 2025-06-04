import { useMediaQuery } from 'react-responsive';
import { href } from 'react-router';
import Block from '~/components/Block';
import ScrollBlock from '~/components/ScrollBlock';
import TextCard from '~/components/TextCard';
import { useDesktop } from '~/hooks/useDesktop';

const tips = [
  {
    header: 'Налоги',
    desc: 'Советы по налоговой оптимизации сделок.',
    link: '/tips/nalogi',
  },
  {
    header: 'Ремонт',
    desc: 'Как повысить комфорт в съёмном жилье.',
    link: '/tips/remont',
  },
  {
    header: 'Расчет',
    desc: 'Как анализировать затраты и выгоды по каждой сделке.',
    link: '/tips/raschet',
  },
  {
    header: 'Юридическая проверка',
    desc: 'Где найти агента для безопасной сделки.',
    link: '/tips/yuridicheskaya-proverka',
  },
];

export default function Tips() {
  const isDesktop = useDesktop();

  return (
    <>
      {isDesktop ? (
        <Block label="Советы" link={{ label: 'Все', href: '/tips' }} isDesktop>
          <div className="grid grid-cols-2 h-[100%] gap-[10px]">
            {tips.map((el, ind) => {
              return (
                <TextCard
                  key={el.header}
                  header={el.header}
                  desc={el.desc}
                  link={el.link}
                />
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
          {tips.map((el, ind) => {
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
