import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import DesktopWidth from "~/blocks/DesktopWidth";
import FrequentSearch from "~/blocks/FrequentSearch";
import LoginPromo from "~/blocks/Login-promo";
import Offers from "~/blocks/Offers";
import SearchBanner from "~/blocks/SearchBanner";
import SlideScroller from "~/blocks/SlideScroller";
import Tips from "~/blocks/Tips";
import Block from "~/components/Block";
import ButtonAccent from "~/components/ButtonAccent";
import ButtonArrow from "~/components/ButtonArrow";
import PropertyCard from "~/components/PropertyCard";
import RegButtons from "~/components/RegButtons";
import ScrollBlock from "~/components/ScrollBlock";
import SearchElement from "~/components/SearchElement";
import TextCard from "~/components/TextCard";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <SlideScroller />
      <DesktopWidth>
        <ScrollBlock label="Аренда" link="Все">
          {Array(10)
            .fill(1)
            .map((el) => {
              return <PropertyCard key={el} />;
            })}
        </ScrollBlock>
        <ScrollBlock label="Продажа" link="Все">
          {Array(10)
            .fill(1)
            .map((_, ind) => {
              return <PropertyCard key={ind} />;
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
