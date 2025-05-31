import { useState } from 'react';
import { useNavigate } from 'react-router';
import Modal from '~/components/Modal';
import RegButtons from '~/components/RegButtons';
import { useDesktop } from '~/hooks/useDesktop';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginPromoModal({
  open,
  onOpenChange,
}: LoginModalProps) {
  const navigate = useNavigate();
  const isDesktop = useDesktop();

  const handleLoginClick = () => {
    onOpenChange(false);
    navigate('/login');
  };

  const handleRegisterClick = () => {
    onOpenChange(false);
    navigate('/register');
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      trigger={<></>}
      title="Зарегистрируйтесь чтобы пользоваться всеми возможностями"
      isDesktop={isDesktop}
    >
      <div className="h5-light w-max-[450px]">
        Для полноценного использования сайта, необходима регистрация.
        Присоединяйтесь, создайте аккаунт прямо сейчас, это бесплатно!
      </div>
      <RegButtons
        onLogClick={handleLoginClick}
        onRegClick={handleRegisterClick}
      />
    </Modal>
  );
}
