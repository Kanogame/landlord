import { useState, useEffect } from 'react';
import { Form, useActionData, useNavigation } from 'react-router';
import Block from '~/components/Block';
import ButtonAccent from '~/components/ButtonAccent';
import { Input } from '~/components/ui/input';
import Avatar from '~/components/chat/Avatar';
import { useDesktop } from '~/hooks/useDesktop';
import { ErrorToast, Post, Get } from '~/lib/api';
import { toast } from 'sonner';
import type { Route } from './+types/Settings';

interface UserData {
  success: boolean;
  user: {
    id: number;
    email: string;
    registerDate: string;
    updateDate: string;
    profileLink: string;
    personal: {
      id: number;
      firstName: string;
      lastName: string;
      patronym: string;
      fullName: string;
    };
    statistics: {
      activePropertiesCount: number;
      totalPropertiesCount: number;
      rentedSoldRentEndingCount: number;
      experience: string;
    };
  };
}

interface ActionData {
  error?: string;
  success?: boolean;
}

export async function clientLoader() {
  const userData = await Get<UserData>('api/User/me');
  return { userData };
}

export async function clientAction({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const patronym = formData.get('patronym') as string;
  const email = formData.get('email') as string;

  const { success } = await Post<{ success: boolean }>('api/User/edit', {
    firstName,
    lastName,
    patronym,
    email,
  });

  if (success) {
    toast.success('Настройки успешно сохранены');
    return { success: true };
  } else {
    ErrorToast('Ошибка при сохранении настроек');
    return { error: 'Ошибка при сохранении настроек' };
  }
}

export default function SettingPage({ loaderData }: Route.ComponentProps) {
  const isDesktop = useDesktop();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    patronym: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (loaderData?.userData?.success && loaderData.userData.user) {
      const { user } = loaderData.userData;
      setFormData({
        firstName: user.personal.firstName || '',
        lastName: user.personal.lastName || '',
        patronym: user.personal.patronym || '',
        email: user.email || '',
        phone: '', // Phone is not provided in the API response
      });
    }
  }, [loaderData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Block label="Настройки профиля" isDesktop={isDesktop}>
      <Form method="post" className="w-full">
        <div
          className={
            isDesktop
              ? 'flex justify-between items-start gap-10 w-full'
              : 'flex flex-col items-center gap-4 w-full'
          }
        >
          <div className="flex flex-col items-center gap-2.5 px-5 flex-shrink-0">
            <Avatar
              avatar="https://placehold.co/120x120"
              size={120}
              className="rounded-full"
            />
            <ButtonAccent label="Сменить аватар" type="button" width="100%" />
          </div>

          <div className="flex flex-wrap gap-2 flex-1 max-w-2xl">
            <div className="flex flex-col gap-1.5 flex-[1_0_300px]">
              <label className="p-def">Имя</label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={e => handleInputChange('firstName', e.target.value)}
                placeholder="Введите имя"
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-[1_0_300px]">
              <label className="p-def">Фамилия</label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={e => handleInputChange('lastName', e.target.value)}
                placeholder="Введите фамилию"
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-[1_0_300px]">
              <label className="p-def">Отчество</label>
              <Input
                name="patronym"
                value={formData.patronym}
                onChange={e => handleInputChange('patronym', e.target.value)}
                placeholder="Введите отчество"
              />
            </div>

            <div className="flex flex-col gap-1.5 flex-[1_0_300px]">
              <label className="p-def">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                placeholder="Введите email"
              />
            </div>
          </div>
        </div>

        <div
          className={`flex ${
            isDesktop ? 'justify-end' : 'justify-center'
          } mt-4`}
        >
          <ButtonAccent
            label={isSubmitting ? 'Сохранение...' : 'Сохранить'}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </Form>
    </Block>
  );
}
