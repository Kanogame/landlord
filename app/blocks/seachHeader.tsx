import BigSearch from "~/components/bigSearch";
import ButtonAccent from "~/components/buttonAccent";
import ButtonArrow from "~/components/buttonArrow";
import ButtonEmpty from "~/components/buttonEmpty";
import DropDown from "~/components/dropdown";
import DropDownLabel from "~/components/dropdownLabel";

export default function SearchHeader() {
  return (
    <div className="bg-white flex justify-center items-center border-b-[1px] border-b-[#EFEFEF] py-[10px]">
      <div className="max-w-[1300px] w-auto flex flex-1/0 gap-[100px] justify-center items-center px-[15px]">
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
