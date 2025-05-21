import type { ReactNode } from "react";

export default function DesktopWidth(props: { children: ReactNode }) {
  return (
    <div className=" flex justify-center items-center w-[100%] py-[5px]">
      <div className="flex flex-col min-w-0 flex-[0_1_1600px] gap-[30px] py-[30px] px-[50px]">
        {props.children}
      </div>
    </div>
  );
}
