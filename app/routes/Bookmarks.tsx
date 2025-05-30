import { useState } from 'react';
import { useSearchParams } from 'react-router';
import DesktopWidth from '~/blocks/DesktopWidth';
import SearchList from '~/blocks/SearchList';
import { Post } from '~/lib/api';
import { type TSearchResult } from '~/lib/property';
import { useDesktop } from '~/hooks/useDesktop';
import type { Route } from './+types/Bookmarks';
import { useAuth } from '~/hooks/useAuth';

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

  const bookmarksResult = await Post<TSearchResult>(
    'api/Bookmark/get_bookmarks',
    {
      pageNumber,
      pageSize,
    }
  );

  return {
    bookmarksResult,
  };
}

export default function BookmarksPage({ loaderData }: Route.ComponentProps) {
  const isDesktop = useDesktop();
  const [searchParams, setSearchParams] = useSearchParams();

  const { bookmarksResult } = loaderData;

  const currentPage = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('size') || '10');
  const totalPages = Math.ceil(bookmarksResult.count / pageSize);

  const handlePageChange = (page: number, size: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    newSearchParams.set('size', size.toString());
    setSearchParams(newSearchParams);

    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-w-0">
      <div className="mb-[20px]">
        <div className="h3-def text-center">Закладки</div>
        <div className="h4-def text-center">
          {bookmarksResult.count > 0
            ? `Сохранено ${bookmarksResult.count} объявлений`
            : 'У вас пока нет сохраненных объявлений'}
        </div>
      </div>

      {bookmarksResult.count > 0 ? (
        <SearchList
          propertyList={bookmarksResult.properties}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={bookmarksResult.count}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      ) : (
        <div className="text-center py-[40px]">
          <p className="text-gray-500">
            Здесь будут отображаться сохраненные объявления
          </p>
        </div>
      )}
    </div>
  );
}
