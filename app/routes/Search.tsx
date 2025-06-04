import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import DesktopWidth from '~/components/DesktopWidth';
import SearchList from '~/routes/Search/SearchList';
import { getSearchFromUrl, searchProperties } from '~/lib/searchApi';
import { getSearchAttributes, type SearchAttribute } from '~/lib/attributeApi';
import { TOfferType, type TProperty, type TSearchResult } from '~/lib/property';
import { useDesktop } from '~/hooks/useDesktop';
import type { Route } from './+types/Search';
import SearchFilters from '~/routes/Search/SearchFilters';
import Modal from '~/components/Modal';
import AttributeSearch from '~/routes/Search/AttributeSearch';
import ButtonAccent from '~/components/ButtonAccent';
import {
  searchFiltersToString,
  TSortOption,
  useSearchFilters,
  type TSearchFilters,
} from '~/hooks/useSearchFilters';
import SearchSortHeader from '~/components/SearchSortHeader';
import Block from '~/components/Block';
import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer';
import ButtonEmpty from '~/components/ButtonEmpty';
import SearchElement from '~/components/SearchElement';

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
const snapPoints = ['400px', 1];
export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const isDesktop = useDesktop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const { filters, resetFilters, updateFiltersAndUrl, setPage } =
    useSearchFilters(getSearchFromUrl(loaderData.searchParams));
  const [drawer, setDrawer] = useState(true);
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  const handleFilterChange = (updates: Partial<TSearchFilters>) => {
    updateFiltersAndUrl(updates, setSearchParams);
  };

  const handleSortingChange = (sorting: TSortOption) => {
    handleFilterChange({ sortBy: sorting });
  };

  const handleMapToggle = (newShowMap: boolean) => {
    setShowMap(newShowMap);
  };

  const handlePageChange = (page: number, size: number) => {
    setPage(page, size);
    updateFiltersAndUrl({ pageNumber: page, pageSize: size }, setSearchParams);
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
        {isDesktop && (
          <div className="flex-[3_1] sticky top-0">
            <div>
              <div className="h4-def pb-[20px]">
                Найдено <br />
                {searchResult.count} объявлений
              </div>
            </div>
            <Block isDesktop={true} label="Фильтры">
              <SearchFilters
                isDesktop={isDesktop}
                onFilterChange={handleFilterChange}
                onResetFilters={resetFilters}
                filters={filters}
              />
              <Modal
                trigger={
                  <ButtonAccent
                    label={`Дополнительные фильтры${
                      activeAttributeCount > 0
                        ? ` (${activeAttributeCount})`
                        : ''
                    }`}
                    width="100%"
                    height="40px"
                  />
                }
                title="Дополнительные фильтры"
                isDesktop={isDesktop}
                open={isAttributeModalOpen}
                onOpenChange={setIsAttributeModalOpen}
              >
                <div className="max-h-[600px] overflow-auto">
                  <AttributeSearch
                    attributes={attributes}
                    searchParams={searchParams}
                    isDesktop={isDesktop}
                    onApply={handleAttributeParamsChange}
                    onClose={() => setIsAttributeModalOpen(false)}
                  />
                </div>
              </Modal>
            </Block>
          </div>
        )}
        <div className="flex-[9_1] min-w-[0]">
          {!isDesktop && (
            <>
              <Block label="Результаты поиска" isDesktop={isDesktop}>
                <SearchElement
                  label={searchFiltersToString(filters)}
                  isDesktop={isDesktop}
                  onClick={() => setDrawer(true)}
                />
                <div className="flex gap-[10px]">
                  <ButtonEmpty
                    label="Фильтры"
                    onClick={() => setDrawer(true)}
                    width="100%"
                  />
                </div>
              </Block>
              <Drawer
                open={drawer}
                onClose={() => {
                  setDrawer(false);
                }}
              >
                <DrawerContent>
                  <div className="flex flex-col p-[20px] overflow-auto">
                    {isAttributeModalOpen && (
                      <AttributeSearch
                        attributes={attributes}
                        searchParams={searchParams}
                        isDesktop={isDesktop}
                        onApply={handleAttributeParamsChange}
                        onClose={() => setIsAttributeModalOpen(false)}
                      />
                    )}
                    {!isAttributeModalOpen && (
                      <div className="flex flex-col gap-[10px]">
                        <div className="h3-def">Фильтры</div>
                        <SearchFilters
                          isDesktop={isDesktop}
                          onFilterChange={handleFilterChange}
                          onResetFilters={resetFilters}
                          filters={filters}
                        />
                        <ButtonAccent
                          label={`Дополнительные фильтры${
                            activeAttributeCount > 0
                              ? ` (${activeAttributeCount})`
                              : ''
                          }`}
                          onClick={() => {
                            setIsAttributeModalOpen(true);
                          }}
                          width="100%"
                          height="40px"
                        />
                        <ButtonAccent
                          label="Применить"
                          onClick={() => setDrawer(false)}
                          width="100%"
                          height="40px"
                        />
                      </div>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>
            </>
          )}
          <SearchSortHeader
            sorting={filters.sortBy ?? TSortOption.CreatedDesc}
            onSortingChange={handleSortingChange}
            showMap={showMap}
            onMapToggle={handleMapToggle}
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
