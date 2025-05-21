import DropDownLabel from "./DropdownLabel";

export interface SearchSection {
  label: string;
  values: string[];
}

export default function BigSearch(props: { sections: SearchSection[] }) {
  return (
    <div className="flex flex-[1_0_600px] bg-[#8b2635] px-[2px] py-[2px] rounded-[8px]">
      <div className="flex flex-[1_0] bg-white rounded-[6px]">
        {props.sections.map((el, ind) => {
          const last = ind == props.sections.length - 1;
          return (
            <div
              key={ind}
              className={
                " flex-[1_0] px-[8px] py-[8px] " +
                (last ? "" : "border-r-[1px] border-r-[#EFEFEF]")
              }
            >
              <DropDownLabel
                label={el.label}
                offsetY={0}
                values={el.values}
                onChosen={(a) => {
                  console.log(a);
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="text-xs flex justify-center items-center text-white px-[45px]">
        Найти
      </div>
    </div>
  );
}
