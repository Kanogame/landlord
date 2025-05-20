import logo from "./common/logo.svg";
import iconBookmark from "../media/icons/icon-bookmark.svg";
import iconBurger from "../media/icons/icon-burger.svg";
import iconLogin from "../media/icons/icon-login.svg";
import iconSearch from "../media/icons/icon-search.svg";
import type { ReactNode } from "react";
import SimpleIconButton from "~/components/SimpleIconButton";

export default function MobileHeader(props: any) {
  return (
    <div className="bg-white flex justify-between items-center border-b-[1px] border-b-[#EFEFEF] p-[5px]">
      <div className="flex items-center">
        <SimpleIconButton img={iconBurger} />
        <div>
          <img src={logo} alt="logo" className="block w-full" />
        </div>
      </div>
      <div className="flex items-center">
        <SimpleIconButton img={iconSearch} />
        <SimpleIconButton img={iconBookmark} />
        <SimpleIconButton img={iconLogin} />
      </div>
    </div>
  );
}
