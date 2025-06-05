import { Outlet, useLocation } from 'react-router';
import MainHeader from '~/routes/Page/MainHeader';
import SearchHeader from '~/routes/Page/SearchHeader';
import type { Route } from '../+types/root';
import MobileHeader from '~/routes/Page/MobileHeader';
import { useState } from 'react';
import SidePage from '~/routes/Page/MobileSidepage';
import { AnimatePresence } from 'motion/react';
import Footer from '~/routes/Page/Footer';
import { useDesktop } from '~/hooks/useDesktop';
import { Toaster } from '~/components/ui/sonner';
import LoginModalProvider from '~/routes/Page/LoginModalProvider';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Домио' },
    {
      name: 'description',
      content: 'Домио - сервис по продаже и аренде недвижимости!',
    },
  ];
}

export default function Page() {
  const isDesktop = useDesktop();
  const location = useLocation();
  const [sidePage, setSidepage] = useState<boolean>(false);
  const showSearchHeader = isDesktop && location.pathname !== '/search';

  function openSidepage() {
    setSidepage(!sidePage);
  }

  return (
    <div className="bg-[#F8F8F8] flex flex-col min-h-[100vh]">
      {isDesktop ? (
        <MainHeader />
      ) : (
        <MobileHeader
          onSidepageClicked={openSidepage}
          sidepageOpened={sidePage}
        />
      )}
      {showSearchHeader && <SearchHeader />}
      <AnimatePresence>
        {sidePage && (
          <div className="flex-1 flex">
            <SidePage onClose={() => setSidepage(false)} />
          </div>
        )}
      </AnimatePresence>
      <Toaster position="top-center" richColors />
      <div className="flex-1 flex">
        <Outlet />
      </div>
      <Footer isDesktop={isDesktop} />
      <LoginModalProvider />
    </div>
  );
}
