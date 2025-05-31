import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import DesktopWidth from '~/blocks/DesktopWidth';
import SearchList from '~/blocks/SearchList';
import { getSearchFromUrl, searchProperties } from '~/lib/searchApi';
import { getSearchAttributes, type SearchAttribute } from '~/lib/attributeApi';
import { TOfferType, type TProperty, type TSearchResult } from '~/lib/property';
import { useDesktop } from '~/hooks/useDesktop';
import type { Route } from './+types/Search';
import SearchFilters from '~/blocks/SearchFilters';
import Modal from '~/components/Modal';
import AttributeSearch from '~/blocks/AttributeSearch';
import ButtonAccent from '~/components/ButtonAccent';
import {
  useSearchFilters,
  type TSearchFilters,
  type TSortOption,
} from '~/hooks/useSearchFilters';
import SearchSortHeader from '~/blocks/SearchSortHeader';

interface LoaderData {
  searchResult: TSearchResult;
  attributes: SearchAttribute[];
  searchParams: URLSearchParams;
}

export async function clientLoader({
  request,
}: Route.ClientLoaderArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const [searchResult, attributesResponse] = await Promise.all([
    searchProperties(getSearchFromUrl(searchParams)),
    getSearchAttributes(),
  ]);

  return {
    searchResult,
    attributes: attributesResponse,
    searchParams,
  };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const isDesktop = useDesktop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { filters, resetFilters, updateFiltersAndUrl, setPage, setFilters } =
    useSearchFilters(getSearchFromUrl(loaderData.searchParams));

  const handleFilterChange = (updates: Partial<TSearchFilters>) => {
    updateFiltersAndUrl(updates, setSearchParams);
  };

  const handleSortingChange = (sorting: TSortOption) => {
    handleFilterChange({ sorting });
  };

  const handleMapToggle = (newShowMap: boolean) => {
    setShowMap(newShowMap);
  };

  const handleMonitorRequest = () => {
    // TODO: Implement monitoring functionality
    console.log('Monitor request clicked');
  };

  const handlePageChange = (page: number, size: number) => {
    setPage(page, size);
    updateFiltersAndUrl({ pageNumber: page, pageSize: size }, setSearchParams);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAttributeParamsChange = (newParams: URLSearchParams) => {
    if (newParams.toString() != searchParams.toString()) {
      setSearchParams(newParams);
    }
  };

  const { searchResult, attributes } = loaderData;

  // Count active attribute filters
  const activeAttributeCount = Array.from(searchParams.keys()).filter(key =>
    key.startsWith('attr_')
  ).length;

  // Calculate pagination values
  const totalPages = Math.ceil(searchResult.count / filters.pageSize);
  const currentPage = filters.pageNumber;

  return (
    <DesktopWidth isDesktop={isDesktop}>
      <div className="flex gap-[20px] w-[100%] items-start">
        <div className="flex-[3_1] sticky top-0">
          <div>
            <div className="h4-def pb-[20px]">
              Найдено <br />
              {searchResult.count} объявлений
            </div>
          </div>
          <SearchFilters
            isDesktop={isDesktop}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            filters={filters}
          />

          <div className="mt-4">
            <Modal
              trigger={
                <ButtonAccent
                  label={`Дополнительные фильтры${
                    activeAttributeCount > 0 ? ` (${activeAttributeCount})` : ''
                  }`}
                  onClick={() => {}}
                  width="100%"
                  height="40px"
                />
              }
              title="Дополнительные фильтры"
              isDesktop={isDesktop}
              open={isAttributeModalOpen}
              onOpenChange={setIsAttributeModalOpen}
            >
              <AttributeSearch
                attributes={attributes}
                searchParams={searchParams}
                isDesktop={isDesktop}
                onApply={handleAttributeParamsChange}
                onClose={() => setIsAttributeModalOpen(false)}
              />
            </Modal>
          </div>
        </div>

        <div className="flex-[9_1] min-w-[0]">
          <SearchSortHeader
            sorting={filters.sorting || 'recent'}
            onSortingChange={handleSortingChange}
            showMap={showMap}
            onMapToggle={handleMapToggle}
            onMonitorRequest={handleMonitorRequest}
          />
          <SearchList
            propertyList={searchResult.properties}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={searchResult.count}
            pageSize={filters.pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </DesktopWidth>
  );
}
