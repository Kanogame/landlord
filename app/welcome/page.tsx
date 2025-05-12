import logo from "./logo.svg";

export function Page() {
  return (
    <div className="bg-white h-[40px] flex justify-center items-center">
      <div className="max-w-[1000px] w-auto flex flex-1/0 justify-between items-center px-[15px]">
        <div>
          <img
            src={logo}
            alt="logo"
            className="block w-full"
          />
        </div>
        <div className="flex align-center gap-[15px]">
          <a href="" className="p-def">
            Главная
          </a>
          <a href="" className="p-def">
            Главная
          </a>
          <a href="" className="p-def">
            Главная
          </a>
          <span className="p-def">|</span>
          <a href="" className="p-def">
            Главная
          </a>
          <a href="" className="p-def">
            Главная
          </a>
        </div>
      </div>
    </div >
  );
}