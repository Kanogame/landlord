import { useState, useEffect, type ReactNode } from 'react';
import LoginPromoModal from '~/routes/Page/LoginPromoModal';
import { setLoginModalOpener } from '~/lib/loginModal';

export default function LoginModalProvider() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoginModalOpener(() => setIsOpen(true));
  }, []);

  return (
    <>
      <LoginPromoModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
