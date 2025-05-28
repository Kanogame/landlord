import { useState } from 'react';
import { Form, useActionData, useNavigate, useNavigation } from 'react-router';
import type { ActionFunctionArgs } from 'react-router';
import FullscreenBlock from '~/blocks/FullscreenBlock';
import ButtonAccent from '~/components/ButtonAccent';
import ButtonEmpty from '~/components/ButtonEmpty';
import { Input } from '~/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '~/components/ui/input-otp';
import { UseLocalStorage } from '~/hooks/useLocalStorage';
import { Post } from '~/lib/api';

interface ActionData {
  error?: string;
  success?: boolean;
  stage?: number;
  verificationId?: number;
  token?: string;
}

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get('intent') as string;

  switch (intent) {
    case 'send-code': {
      const phone = formData.get('phone') as string;

      const { success, verificationId } = await Post<{
        success: boolean;
        verificationId: number;
      }>('api/User/verification_number', { number: phone });

      if (success) {
        return { success: true, stage: 1, verificationId: verificationId };
      } else {
        return { error: 'Ошибка отправки SMS', stage: 0 };
      }
    }

    case 'verify-code': {
      const verificationId = +(formData.get('verificationId') as string);
      const code = +(formData.get('code') as string);
      console.log(verificationId, code);

      const { success } = await Post<{ success: boolean }>(
        'api/User/verification_code',
        { verificationId, code }
      );

      if (success) {
        return { success: true, stage: 2, verificationId };
      } else {
        return { error: 'Неверный код', stage: 1, verificationId };
      }
    }

    case 'complete-registration': {
      const verificationId = +(formData.get('verificationId') as string);
      const firstName = formData.get('firstName') as string;
      const lastName = formData.get('lastName') as string;
      const Patronym = formData.get('patronym') as string;
      const email = formData.get('email') as string;

      const { success, token } = await Post<{
        success: boolean;
        token: string;
      }>('api/User/verification_personal', {
        verificationId,
        firstName,
        lastName,
        Patronym,
        email,
      });

      if (success) {
        return { success: true, stage: 3, token: token };
      } else {
        return { error: 'Ошибка регистрации', stage: 2, verificationId };
      }
    }

    default:
      return { stage: 0 };
  }
}

export default function Register() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [currentStage, setCurrentStage] = useState(actionData?.stage || 0);
  const [verificationId, setVerificationId] = useState(0);
  const [token, setToken] = UseLocalStorage('token', '');

  // Update local state when action data changes
  if (actionData?.stage !== undefined && actionData.stage !== currentStage) {
    if (actionData.stage === 3) {
      setToken(actionData?.token ?? '');
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
    <FullscreenBlock label="Регистрация">
      {currentStage === 0 && (
        <Form method="post" className="flex items-center flex-col gap-[10px]">
          <input type="hidden" name="intent" value="send-code" />
          <div className="h5-def">Введите номер телефона</div>
          <div className="flex gap-[10px] items-center w-[100%]">
            <div className="h4-def">+7</div>
            <Input
              type="text"
              name="phone"
              required
              className="w-[100%]"
              placeholder="(999) 999-99-99"
            />
          </div>
          <div className="h5-def">
            По указанному номеру будет отправлено СМС с кодом
          </div>

          {actionData?.error && (
            <div className="text-red-500 text-sm">{actionData.error}</div>
          )}

          <ButtonAccent
            label={isSubmitting ? 'Отправка...' : 'Далее'}
            width="100%"
            type="submit"
            disabled={isSubmitting}
          />
          <ButtonEmpty label="Войти по Сбер ID" width="100%" />
          <ButtonEmpty
            label="Уже есть аккаунт"
            width="100%"
            onClick={() => navigate('/login')}
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

          {actionData?.error && (
            <div className="text-red-500 text-sm">{actionData.error}</div>
          )}

          <input type="hidden" name="stage" value="1" />
          <input type="hidden" name="verificationId" value={verificationId} />

          <ButtonAccent
            label={isSubmitting ? 'Проверка...' : 'Подтвердить'}
            width="100%"
            type="submit"
            disabled={isSubmitting}
          />
        </Form>
      )}

      {currentStage === 2 && (
        <Form method="post" className="flex items-center flex-col gap-[10px]">
          <input type="hidden" name="intent" value="complete-registration" />
          <div className="h5-def">Заполните информацию о себе</div>

          <Input
            type="text"
            name="lastName"
            required
            placeholder="Фамилия"
            className="w-[100%]"
          />

          <Input
            type="text"
            name="firstName"
            required
            placeholder="Имя"
            className="w-[100%]"
          />

          <Input
            type="text"
            name="patronym"
            placeholder="Отчество"
            className="w-[100%]"
          />

          <Input
            type="email"
            name="email"
            required
            placeholder="Email"
            className="w-[100%]"
          />

          {actionData?.error && (
            <div className="text-red-500 text-sm">{actionData.error}</div>
          )}

          <input type="hidden" name="verificationId" value={verificationId} />

          <ButtonAccent
            label={isSubmitting ? 'Регистрация...' : 'Завершить регистрацию'}
            width="100%"
            type="submit"
            disabled={isSubmitting}
          />
        </Form>
      )}
    </FullscreenBlock>
  );
}
