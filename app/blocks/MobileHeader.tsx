import logo from "./common/logo.svg";
import iconBookmark from "../media/icons/icon-bookmark.svg";
import iconBurger from "../media/icons/icon-burger.svg";
import iconLogin from "../media/icons/icon-login.svg";
import iconSearch from "../media/icons/icon-search.svg";
import iconExit from "../media/icons/icon-exit.svg";
import type { ReactNode } from "react";
import SimpleIconButton from "~/components/SimpleIconButton";

export default function MobileHeader(props: {
  onSidepageClicked: () => void;
  sidepageOpened: boolean;
}) {
  return (
    <div className="bg-white flex justify-between items-center border-b-[1px] border-b-[#EFEFEF] p-[5px]">
      <div className="flex items-center gap-[10px]">
        <SimpleIconButton
          img={props.sidepageOpened ? iconExit : iconBurger}
          onClick={props.onSidepageClicked}
        />
        <div>
          <img src={logo} alt="logo" className="block w-full" />
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <SimpleIconButton img={iconSearch} />
        <SimpleIconButton img={iconBookmark} />
        <SimpleIconButton img={iconLogin} />
      </div>
    </div>
  );
}
