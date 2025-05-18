import MainHeader from "~/blocks/mainHeader";
import SearchHeader from "~/blocks/seachHeader";
import SlideScroller from "~/blocks/slideScroller";

export function Page() {
  return (
    <div>
      <MainHeader />
      <SearchHeader />
      <SlideScroller />
    </div>
  );
}
