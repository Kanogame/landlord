import { useNavigate } from 'react-router';
import logo from '~/media/icons/logo.svg';

const footerItems = [
  [
    { label: 'О нас', link: '/about' },
    { label: 'Услуги', link: '/services' },
    { label: 'Контакты', link: '/contacts' },
    { label: 'Политика конфиденциальности', link: '/privacy-policy' },
  ],
  [
    { label: 'Часто задаваемые вопросы', link: '/faq' },
    { label: 'Блог', link: '/blog' },
    { label: 'Карьера', link: '/careers' },
    { label: 'Условия обслуживания', link: '/terms-of-service' },
  ],
];

export default function Footer(props: { isDesktop: boolean }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#D9D9D9] flex justify-center items-center py-[5px]">
      <div className="flex flex-[0_1_1600px] justify-between items-center px-[50px] py-[20px]">
        <div className="flex flex-col gap-[10px] border-r border-[#707070]">
          <img src={logo} alt="logo" className="w-[100px]" />
          <div className="h5-light w-[500px]">
            Использование сайта означает согласие с Пользовательским соглашением
            и Политикой обработки персональных данных
          </div>
        </div>
        {footerItems.map((el, ind) => {
          return (
            <div key={ind} className="flex flex-col gap-[10px]">
              {el.map((ell, jnd) => {
                return (
                  <div
                    key={jnd * ind}
                    className="h5-def cursor-pointer"
                    onClick={() => {
                      navigate(ell.link);
                    }}
                  >
                    {ell.label}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
