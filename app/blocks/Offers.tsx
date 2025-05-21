import Block from "~/components/Block";
import TextCard from "~/components/TextCard";

const offers = [
  {
    header: "Ипотека",
    desc: "Выгодные кредитные условия для покупки вашей мечты.",
    link: "/offers/ipoteka",
  },
  {
    header: "Кредит",
    desc: "Гибкие программы для приобретения недвижимости.",
    link: "/offers/kredit",
  },
  {
    header: "Рассрочка",
    desc: "Удобная рассрочка платежей без лишних переплат и сложностей.",
    link: "/offers/rassrochka",
  },
  {
    header: "Инвестиции",
    desc: "Инвестиционные варианты для финансовой стабильности.",
    link: "/offers/investitsii",
  },
  {
    header: "Бонусы",
    desc: "Подбор специальных предложений и скидок.",
    link: "/offers/bonusy",
  },
];

export default function Offers() {
  return (
    <Block label="Предложения" link="Все">
      <div className="grid grid-cols-3 h-[100%] gap-[10px]">
        {offers.map((el, ind) => {
          return ind == 2 ? (
            <div className="row-span-2">
              <TextCard
                key={ind}
                header={el.header}
                desc={el.desc}
                link={el.link}
              />
            </div>
          ) : (
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
