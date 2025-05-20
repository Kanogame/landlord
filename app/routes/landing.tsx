import SlideScroller from "~/blocks/slideScroller";
import Block from "~/components/Block";

export default function LandingPage() {
  return (
    <div>
      <SlideScroller />
      <div className="bg-white flex justify-center items-center border-b-[1px] border-b-[#EFEFEF] py-[5px]">
        <div className="flex flex-col flex-[0_1_1600px] px-[50px]">
          <Block label="Аренда" link="somewhere">
            <div className="p-def bg-amber-500">something</div>
          </Block>
        </div>
      </div>
    </div>
  );
}
