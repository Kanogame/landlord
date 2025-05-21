import BigSearch from "~/components/BigSearch";
import ButtonAccent from "~/components/ButtonAccent";
import ButtonArrow from "~/components/ButtonArrow";
import ButtonEmpty from "~/components/ButtonEmpty";
import DropDown from "~/components/Dropdown";
import DropDownLabel from "~/components/DropdownLabel";

export default function SearchHeader() {
  return (
    <div className="bg-white flex justify-center items-center border-b-[1px] border-b-[#EFEFEF] py-[10px]">
      <div className="flex flex-[0_1_1400px] gap-[20px] justify-center items-center px-[50px]">
        <BigSearch
          sections={[
            {
              label: "Город",
              values: ["Москва", "Новосибирск"],
            },
            {
              label: "Город",
              values: ["Москва", "Новосибирск"],
            },
            {
              label: "Город",
              values: ["Москва", "Новосибирск"],
            },
            {
              label: "Город",
              values: ["Москва", "Новосибирск"],
            },
          ]}
        />
        <ButtonArrow label="Больше фильтров" width={190} height={38} />
      </div>
    </div>
  );
}
