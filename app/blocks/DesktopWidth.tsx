import type { ReactNode } from 'react';

export default function DesktopWidth(props: {
  children: ReactNode;
  isDesktop: boolean;
}) {
  if (props.isDesktop) {
    return (
      <div className=" flex justify-center items-center w-[100%] py-[5px]">
        <div className="flex flex-col min-w-0 flex-[0_1_1600px] gap-[20px] py-[20px] px-[50px]">
          {props.children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col py-[20px] gap-[20px]">{props.children}</div>
  );
}
