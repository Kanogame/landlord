import { useNavigate } from 'react-router';
import logo from '~/media/icons/logo.svg';

const footerItems = [
  [
    { label: 'О нас', link: '/about' },
    { label: 'Услуги', link: '/service' },
    { label: 'Контакты', link: '/contacts' },
    { label: 'Политика конфиденциальности', link: '/privacy-policy' },
  ],
  [
    { label: 'Часто задаваемые вопросы', link: '/faq' },
    { label: 'Советы', link: '/tips/remont' },
    { label: 'Бонусы', link: '/offers' },
    { label: 'Инвестиции', link: '/offers' },
  ],
];

export default function Footer(props: { isDesktop: boolean }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#D9D9D9] flex justify-center items-center py-[5px]">
      <div
        className={
          'flex flex-[0_1_1600px] items-center px-[50px] py-[20px] ' +
          (props.isDesktop ? '' : 'flex-col-reverse')
        }
      >
        <div
          className={
            'flex flex-col gap-[10px] ' +
            (props.isDesktop ? 'border-r border-[#707070]' : ' mt-[15px]')
          }
        >
          <img src={logo} alt="logo" className="w-[100px]" />
          <div className="h5-light max-w-[500px]">
            Использование сайта означает согласие с Пользовательским соглашением
            и Политикой обработки персональных данных
          </div>
        </div>
        <div
          className={
            'flex w-[100%] flex-wrap gap-[10px] ' +
            (props.isDesktop ? 'justify-around' : 'justify-between')
          }
        >
          {footerItems.map((el, ind) => {
            return (
              <div key={ind} className="flex flex-col gap-[10px]">
                {el.map(ell => {
                  return (
                    <div
                      key={ell.label}
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
    </div>
  );
}
