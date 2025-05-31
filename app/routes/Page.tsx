import { Outlet } from 'react-router';
import MainHeader from '~/blocks/MainHeader';
import SearchHeader from '~/blocks/SearchHeader';
import type { Route } from '../+types/root';
import { useMediaQuery } from 'react-responsive';
import MobileHeader from '~/blocks/MobileHeader';
import { useState } from 'react';
import SidePage from '~/blocks/mobileSidepage';
import { AnimatePresence } from 'motion/react';
import Footer from '~/blocks/Footer';
import { useDesktop } from '~/hooks/useDesktop';
import { Toaster } from '~/components/ui/sonner';
import LoginModalProvider from '~/components/LoginModalProvider';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Domio' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Page() {
  const isDesktop = useDesktop();
  const [sidePage, setSidepage] = useState<boolean>(false);

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
      {isDesktop && <SearchHeader />}
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
