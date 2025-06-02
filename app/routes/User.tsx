import { useSearchParams } from 'react-router';
import DesktopWidth from '~/blocks/DesktopWidth';
import SearchList from '~/blocks/SearchList';
import SearchSortHeader from '~/blocks/SearchSortHeader';
import UserCard, { type UserData } from '~/blocks/UserCard';
import { useDesktop } from '~/hooks/useDesktop';
import { TSortOption } from '~/hooks/useSearchFilters';
import { ErrorToast, Post } from '~/lib/api';
import { type TSearchResult } from '~/lib/property';
import { getUserInfo, type GetPropertiesByUserIdRequest } from '~/lib/userApi';
import type { Route } from './+types/User';

interface LoaderData {
  userInfo: UserData;
  propertiesResult: TSearchResult;
  userId: number;
}

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const userId = +params.id;
  const pageNumber = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('size') || '10');
  const sortBy = parseInt(searchParams.get('sortBy') || '0');

  const [userInfoResponse, propertiesResult] = await Promise.all([
    getUserInfo(userId),
    Post<TSearchResult>('api/Property/get_properties_by_user_id', {
      userId,
      pageNumber,
      pageSize,
      sortBy,
    } as GetPropertiesByUserIdRequest),
  ]);

  if (!userInfoResponse) {
    ErrorToast('Ошибка при загрузке информации о пользователе');
  }

  if (!propertiesResult) {
    ErrorToast('Ошибка при загрузке объявлений пользователя');
  }

  const userInfo: UserData = {
    fullName: userInfoResponse.fullName,
    activePropertiesCount: userInfoResponse.activePropertiesCount,
    rentedSoldRentEndingCount: userInfoResponse.rentedSoldRentEndingCount,
    experience: userInfoResponse.experience,
  };

  return {
    userInfo,
    propertiesResult,
    userId,
  };
}

export default function User({ loaderData }: Route.ComponentProps) {
  const isDesktop = useDesktop();
  const [searchParams, setSearchParams] = useSearchParams();

  const { userInfo, propertiesResult, userId } = loaderData;

  const currentPage = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('size') || '10');
  const sortBy: TSortOption = parseInt(searchParams.get('sortBy') || '0');
  const totalPages = Math.ceil(propertiesResult.count / pageSize);

  const handlePageChange = (
    page: number,
    size: number,
    sortBy: TSortOption
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    newSearchParams.set('size', size.toString());
    newSearchParams.set('sortBy', sortBy.toString());
    setSearchParams(newSearchParams);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DesktopWidth isDesktop={isDesktop}>
      <div>
        <UserCard user={userInfo} userId={userId} />
      </div>

      <SearchSortHeader
        sorting={sortBy ?? TSortOption.CreatedDesc}
        onSortingChange={newSort =>
          handlePageChange(currentPage, pageSize, newSort)
        }
        showMap={false}
      />

      {propertiesResult.count > 0 ? (
        <SearchList
          propertyList={propertiesResult.properties}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={propertiesResult.count}
          pageSize={pageSize}
          onPageChange={(page, size) => handlePageChange(page, size, sortBy)}
        />
      ) : (
        <div className="text-center py-[40px]">
          <p className="h5-light">
            У этого пользователя нет активных объявлений
          </p>
        </div>
      )}
    </DesktopWidth>
  );
}
