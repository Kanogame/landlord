import ButtonAccent from "~/components/buttonAccent";
import ButtonEmpty from "~/components/buttonEmpty";
import logo from "./mainHeader/logo.svg";
import type { ReactNode } from "react";

export default function MainHeader(props: any) {
  return (
    <div className="bg-white flex justify-center items-center border-b-[1px] border-b-[#EFEFEF] py-[5px]">
      <div className="max-w-[1300px] flex flex-1/0 justify-between items-center px-[15px]">
        <div>
          <img src={logo} alt="logo" className="block w-full" />
        </div>
        <div className="flex align-center gap-[15px]">
          <a href="" className="p-def">
            Главная
          </a>
          <a href="" className="p-def">
            Покупка
          </a>
          <a href="" className="p-def">
            Аренда
          </a>
          <span className="p-def">|</span>
          <a href="" className="p-def">
            Чаты
          </a>
          <a href="" className="p-def">
            Мониторинг
          </a>
        </div>
        <div className="flex flex-row gap-[5px]">
          <ButtonAccent width={100} label="Регистрация" />
          <ButtonEmpty width={100} label="Вход" />
        </div>
      </div>
    </div>
  );
}
