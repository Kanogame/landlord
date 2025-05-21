import SlideScroller from "~/blocks/slideScroller";
import Block from "~/components/Block";
import PropertyCard from "~/components/PropertyCard";
import ScrollBlock from "~/components/ScrollBlock";

export default function LandingPage() {
  return (
    <div>
      <SlideScroller />
      <div className=" flex justify-center items-center w-[100%] py-[5px]">
        <div className="flex flex-col min-w-0 flex-[0_1_1600px] gap-[20px] py-[20px] px-[50px]">
          <ScrollBlock label="Аренда" link="somewhere">
            {Array(10)
              .fill(1)
              .map((el) => {
                return <PropertyCard key={el} />;
              })}
          </ScrollBlock>
          <ScrollBlock label="Продажа" link="somewhere">
            {Array(10)
              .fill(1)
              .map((el) => {
                return <PropertyCard key={el} />;
              })}
          </ScrollBlock>
        </div>
      </div>
    </div>
  );
}
