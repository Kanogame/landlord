import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import DesktopWidth from '~/blocks/DesktopWidth';
import SearchList from '~/blocks/SearchList';
import { ErrorToast, Post } from '~/lib/api';
import { type TSearchResult } from '~/lib/property';
import { useDesktop } from '~/hooks/useDesktop';
import type { Route } from './+types/Bookmarks';
import { useAuth } from '~/hooks/useAuth';
import { toast } from 'sonner';
import SearchSortHeader from '~/blocks/SearchSortHeader';
import { TSortOption } from '~/hooks/useSearchFilters';

interface GetBookmarksRequest {
  userId: number;
  pageNumber: number;
  pageSize: number;
}

interface LoaderData {
  bookmarksResult: TSearchResult;
}

export async function clientLoader({
  request,
}: Route.ClientLoaderArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const pageNumber = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('size') || '10');
  const sortBy = parseInt(searchParams.get('sortBy') || '0');

  const bookmarksResult = await Post<TSearchResult>(
    'api/Property/get_own_properties',
    {
      pageNumber,
      pageSize,
      sortBy,
    }
  );

  if (!bookmarksResult || bookmarksResult.success == false) {
    ErrorToast('Ошибка при загрузке ваших объявлений');
  }

  return {
    bookmarksResult,
  };
}

export default function BookmarksPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { bookmarksResult } = loaderData;

  const currentPage = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('size') || '10');
  const sortBy: TSortOption = parseInt(searchParams.get('sortBy') || '0');
  const totalPages = Math.ceil(bookmarksResult.count / pageSize);

  const handlePageChange = (
    page: number,
    size: number,
    sortBy: TSortOption
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    newSearchParams.set('size', size.toString());
    newSearchParams.set('sortBy', '' + sortBy);
    setSearchParams(newSearchParams);

    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-w-0">
      <div className="mb-[20px]">
        <div className="h3-def text-center">Ваши объявления</div>
        <div className="h4-def text-center">
          {bookmarksResult.count > 0
            ? `${bookmarksResult.count} объявлений`
            : 'У вас пока нет объявлений'}
        </div>
      </div>
      <SearchSortHeader
        sorting={sortBy ?? TSortOption.CreatedDesc}
        onSortingChange={newSort =>
          handlePageChange(currentPage, pageSize, newSort)
        }
        buttonText="Создать новое"
        onButtonClick={() => {
          navigate('/editor');
        }}
        showMap={false}
      />

      {bookmarksResult.count > 0 ? (
        <SearchList
          propertyList={bookmarksResult.properties}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={bookmarksResult.count}
          pageSize={pageSize}
          onPageChange={(page, size) => handlePageChange(page, size, sortBy)}
        />
      ) : (
        <div className="text-center py-[40px]">
          <p className="h5-light">Здесь будут отображаться объявления</p>
        </div>
      )}
    </div>
  );
}
