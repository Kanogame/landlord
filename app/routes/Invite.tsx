import { useEffect, useState } from 'react';
import { Form, useActionData, useNavigate, useNavigation } from 'react-router';
import FullscreenBlock from '~/components/FullscreenBlock';
import ButtonAccent from '~/components/ButtonAccent';
import ButtonEmpty from '~/components/ButtonEmpty';
import { Input } from '~/components/ui/input';
import Profile from '~/components/chat/Profile';
import { useAuth } from '~/hooks/useAuth';
import { ErrorToast, Post } from '~/lib/api';
import { useDesktop } from '~/hooks/useDesktop';
import DesktopWidth from '~/components/DesktopWidth';
import type { Route } from './+types/Invite';
import { toast } from 'sonner';
import type {
  TProperty,
  TOfferType,
  InviteTransactionRequest,
  InviteTransactionResponse,
} from '~/lib/property';
import { getUserInfo, type GetUserInfoResponse } from '~/lib/userApi';
import FormatPrice from '~/lib/property';

interface LoaderData {
  property: TProperty;
  ownerInfo: GetUserInfoResponse;
}

interface ActionData {
  success?: boolean;
  message?: string;
}

export async function clientLoader({
  params,
}: Route.ClientLoaderArgs): Promise<LoaderData> {
  const propertyResp = await Post<TProperty>(
    'api/Property/get_property_by_id',
    {
      propertyId: params.propertyId,
    }
  );

  if (!propertyResp) {
    throw new Error('Объявление не найдено');
  }

  const ownerInfo = await getUserInfo(propertyResp.property.ownerId);

  if (!ownerInfo) {
    throw new Error('Информация о владельце не найдена');
  }

  return {
    property: propertyResp,
    ownerInfo,
  };
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs): Promise<ActionData> {
  const formData = await request.formData();
  const action = formData.get('action') as string;

  if (action === 'accept') {
    const propertyId = parseInt(params.propertyId);
    const transactionType = parseInt(formData.get('transactionType') as string);
    const buyerRenterId = parseInt(formData.get('buyerRenterId') as string);

    const requestData: InviteTransactionRequest = {
      propertyId,
      buyerRenterId,
      transactionType: transactionType as 1 | 2,
    };

    try {
      const response = await Post<InviteTransactionResponse>(
        'api/calendar/rent-buy-property',
        requestData
      );

      if (response.success) {
        toast('Предложение принято успешно!');
        return { success: true, message: response.message };
      } else {
        ErrorToast(response.message || 'Ошибка при принятии предложения');
        return { success: false, message: response.message };
      }
    } catch (error) {
      ErrorToast('Ошибка при отправке запроса');
      return { success: false, message: 'Ошибка при отправке запроса' };
    }
  } else if (action === 'decline') {
    toast('Предложение отклонено');
    return { success: true, message: 'Предложение отклонено' };
  }

  return { success: false, message: 'Неизвестное действие' };
}

export default function Invite({ loaderData }: Route.ComponentProps) {
  const { property, ownerInfo } = loaderData;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData<ActionData>();
  const isDesktop = useDesktop();

  const isRent = property.type === 0; // TOfferType.Rent
  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (actionData?.success) {
      navigate('/profile/history');
    }
  }, [actionData]);

  if (!isAuthenticated) {
    return (
      <FullscreenBlock label="Приглашение">
        <div className="text-center py-[40px]">
          <p className="h5-light mb-4">
            Для просмотра приглашения необходимо войти в систему
          </p>
          <ButtonAccent label="Войти" onClick={() => navigate('/login')} />
        </div>
      </FullscreenBlock>
    );
  }

  return (
    <DesktopWidth isDesktop={isDesktop}>
      <FullscreenBlock
        label={isRent ? 'Приглашение к аренде' : 'Предложение о покупке'}
      >
        <div className="flex flex-col gap-[20px]">
          <div className="text-center">
            <p className="h5-light">
              Вас приглашают {isRent ? 'арендовать' : 'купить'} недвижимость
            </p>
          </div>

          <div
            className="bg-white rounded-lg border p-4 cursor-pointer"
            onClick={() => navigate('/property/' + property.property.id)}
          >
            <div className="flex gap-4">
              <div className="flex-1">
                <h3 className="h4-def mb-1">{property.property.name}</h3>
                <p className="p-light mb-2">
                  {property.property.address.displayAddress}
                </p>
                <p className="h5-def">{FormatPrice(property)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <h3 className="h4-def mb-3">Владелец</h3>
            <Profile
              name={ownerInfo.fullName}
              avatar="/app/media/images/placeholder.png"
              subtitle={`На сайте ${ownerInfo.experience} • ${ownerInfo.activePropertiesCount} объявлений`}
              isBig={true}
              onClick={() => navigate(`/user/${property.property.ownerId}`)}
            />
          </div>

          <div className="flex gap-4 justify-center">
            {/* Decline Form */}
            <Form method="post">
              <input type="hidden" name="action" value="decline" />
              <ButtonEmpty
                label="Отклонить"
                disabled={isSubmitting}
                width="150px"
                type="submit"
              />
            </Form>

            {/* Accept Form */}
            <Form method="post">
              <input type="hidden" name="action" value="accept" />
              <input
                type="hidden"
                name="transactionType"
                value={isRent ? '1' : '2'}
              />
              <input
                type="hidden"
                name="buyerRenterId"
                value={property.property.ownerId.toString()}
              />
              <ButtonAccent
                label={isSubmitting ? 'Обработка...' : 'Принять'}
                disabled={isSubmitting}
                width="150px"
                type="submit"
              />
            </Form>
          </div>
        </div>
      </FullscreenBlock>
    </DesktopWidth>
  );
}
