import Block from "~/components/Block";
import TextCard from "~/components/TextCard";

const tips = [
  {
    header: "Налоги",
    desc: "Советы по налоговой оптимизации сделок.",
    link: "/tips/nalogi",
  },
  {
    header: "Ремонт",
    desc: "Как повысить комфорт в съёмном жилье.",
    link: "/tips/remont",
  },
  {
    header: "Расчет",
    desc: "Как анализировать затраты и выгоды по каждой сделке.",
    link: "/tips/raschet",
  },
  {
    header: "Юридическая проверка",
    desc: "Где найти агента для безопасной сделки.",
    link: "/tips/yuridicheskaya-proverka",
  },
];

export default function Tips() {
  return (
    <Block label="Советы" link="Все">
      <div className="grid grid-cols-2 h-[100%] gap-[10px]">
        {tips.map((el, ind) => {
          return (
            <TextCard
              key={ind}
              header={el.header}
              desc={el.desc}
              link={el.link}
            />
          );
        })}
      </div>
    </Block>
  );
}
