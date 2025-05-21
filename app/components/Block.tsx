import type { ReactNode } from "react";

export default function Block(props: {
  children: ReactNode;
  link?: string;
  label: string;
}) {
  return (
    <div className="flex flex-col p-[20px] gap-[15px] h-[100%] bg-white block-shadow rounded-[20px]">
      <div className="h3-def flex justify-between">
        {props.label}
        {props.link && <div>{props.link}</div>}
      </div>
      {props.children}
    </div>
  );
}
