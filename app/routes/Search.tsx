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
} from '~/hooks/useSearchFilters';

interface LoaderData {
  searchResult: TSearchResult;
  attributes: SearchAttribute[];
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
  };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const isDesktop = useDesktop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const { filters, resetFilters, updateFiltersAndUrl } = useSearchFilters();

  const handleFilterChange = (updates: Partial<TSearchFilters>) => {
    updateFiltersAndUrl(updates, setSearchParams);
  };

  const { searchResult, attributes } = loaderData;

  const handleAttributeParamsChange = (newParams: URLSearchParams) => {
    setSearchParams(newParams);
  };

  // Count active attribute filters
  const activeAttributeCount = Array.from(searchParams.keys()).filter(key =>
    key.startsWith('attr_')
  ).length;

  return (
    <DesktopWidth isDesktop={isDesktop}>
      <div className="flex gap-[20px] w-[100%] items-start">
        <div className="flex-[3_1] sticky top-0">
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
          <SearchList propertyList={searchResult.properties} />
        </div>
      </div>
    </DesktopWidth>
  );
}
