import { useState } from 'react';
import { Form, useActionData, useNavigate, useNavigation } from 'react-router';
import FullscreenBlock from '~/blocks/FullscreenBlock';
import ButtonAccent from '~/components/ButtonAccent';
import ButtonEmpty from '~/components/ButtonEmpty';
import { Input } from '~/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '~/components/ui/input-otp';
import { useAuth } from '~/hooks/useAuth';
import { ErrorToast, Post } from '~/lib/api';
import type { Route } from './+types/Login';
import { toast } from 'sonner';
import PhoneInput from '~/components/PhoneInput';

interface ActionData {
  error?: string;
  success?: boolean;
  stage?: number;
  verificationId?: number;
  token?: string;
}

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent') as string;

  switch (intent) {
    case 'send-code': {
      const phone = formData.get('phone') as string;

      const { success, verificationId, message } = await Post<{
        success: boolean;
        verificationId?: number;
        message?: string;
      }>('api/User/login/send-code', { number: phone });

      if (success) {
        return { success: true, stage: 1, verificationId: verificationId };
      } else {
        ErrorToast(message ?? '');
        return { error: message, stage: 0 };
      }
    }

    case 'verify-code': {
      const verificationId = +(formData.get('verificationId') as string);
      const code = +(formData.get('code') as string);

      const { success, token } = await Post<{
        success: boolean;
        token: string;
      }>('api/User/login/verify-code', { verificationId, code });

      if (success) {
        return { success: true, stage: 2, token: token };
      } else {
        ErrorToast('Неверный код');
        return { error: 'Неверный код', stage: 1, verificationId };
      }
    }

    default:
      return { stage: 0 };
  }
}

export default function Login() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [currentStage, setCurrentStage] = useState(actionData?.stage || 0);
  const [verificationId, setVerificationId] = useState(0);
  const { login } = useAuth();

  // Update local state when action data changes
  if (actionData?.stage !== undefined && actionData.stage !== currentStage) {
    if (actionData.stage === 2) {
      login(actionData?.token ?? '');
      navigate('/');
    }
    setCurrentStage(actionData.stage);
  }
  if (
    actionData?.verificationId &&
    actionData.verificationId !== verificationId
  ) {
    setVerificationId(actionData.verificationId);
  }

  const isSubmitting = navigation.state === 'submitting';

  return (
    <FullscreenBlock label="Вход">
      {currentStage === 0 && (
        <Form method="post" className="flex items-center flex-col gap-[10px]">
          <input type="hidden" name="intent" value="send-code" />
          <div className="h5-def">Введите номер телефона</div>
          <div className="flex gap-[10px] items-center w-[100%]">
            <div className="h4-def">+7</div>
            <PhoneInput
              required
              className="w-[100%]"
              placeholder="(999) 999-99-99"
            />
          </div>
          <div className="h5-def">
            По указанному номеру будет отправлено СМС с кодом
          </div>

          <ButtonAccent
            label={isSubmitting ? 'Отправка...' : 'Далее'}
            width="100%"
            type="submit"
            disabled={isSubmitting}
          />
          <ButtonEmpty label="Войти по Сбер ID" width="100%" />
          <ButtonEmpty
            label="Создать аккаунт"
            width="100%"
            onClick={() => navigate('/register')}
          />
        </Form>
      )}

      {currentStage === 1 && (
        <Form method="post" className="flex items-center flex-col gap-[10px]">
          <input type="hidden" name="intent" value="verify-code" />

          <div className="h5-def">Введите код из СМС</div>

          <InputOTP maxLength={6} name="code">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <input type="hidden" name="stage" value="1" />
          <input type="hidden" name="verificationId" value={verificationId} />

          <ButtonAccent
            label={isSubmitting ? 'Проверка...' : 'Войти'}
            width="100%"
            type="submit"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </FullscreenBlock>
  );
}
