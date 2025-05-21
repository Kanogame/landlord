import ButtonArrow from "~/components/ButtonArrow";
import banner from "~/media/images/banner2.png";

export default function SearchBanner() {
  return (
    <div
      style={{
        background: `url(${banner})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-img w-[100%] px-[50px] py-[30px] flex justify-between"
    >
      <div>
        <div className="h3-def mb-[20px]">Не можете найти?</div>
        <div className="h1-def mb-[40px]">Попробуйте поиск по фильтрам</div>
        <div className="h4-def w-[500px]">
          Вы сможете сузить круг поиска при помощи фильтров и увидеть объекты на
          карте
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <ButtonArrow label="Попробовать" width={180} height={60} radius={12} />
      </div>
    </div>
  );
}
