import { Outlet } from "react-router";
import MainHeader from "~/blocks/mainHeader";
import SearchHeader from "~/blocks/seachHeader";
import SlideScroller from "~/blocks/slideScroller";
import Block from "~/components/Block";
import type { Route } from "../+types/root";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "~/blocks/MobileHeader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Domio" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Page() {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className="bg-[#F8F8F8]">
      {isDesktop ? <MainHeader /> : <MobileHeader />}
      {isDesktop && <SearchHeader />}
      <Outlet />
    </div>
  );
}
