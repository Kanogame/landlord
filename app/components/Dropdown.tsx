import { useState } from "react";
import iconDown from "./dropdown/lcon-down.svg";

export default function DropDown(props: {
  values: string[];
  onChosen: (choose: string) => void;
  width?: number;
  offsetY?: number;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const width: string = props.width ? props.width + "px" : "auto";
  const offsetY: string = props.offsetY ? props.offsetY + "px" : "auto";

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => {
        setOpen(false);
      }}
    >
      <img src={iconDown} alt="logo" className="block w-full" />
      {open ? (
        <div
          className="absolute cursor-pointer bg-white rounded-[10px] px-2 py-2"
          style={{
            width: width,
            right: offsetY,
          }}
        >
          {props.values.map((a) => {
            return (
              <div>
                <a
                  className="p-def border-b-[#EFEFEF]  border-b-[1px] flex"
                  onClick={() => {
                    props.onChosen(a);
                  }}
                >
                  {a}
                </a>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
