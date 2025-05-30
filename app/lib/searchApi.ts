import type { TSearchFilters } from '~/hooks/useSearchFilters';
import { Post } from './api';
import type {
  TOfferType,
  TPropertyAttribute,
  TPropertyType,
  TSearchResult,
} from './property';

export async function searchProperties(
  request: TSearchFilters
): Promise<TSearchResult> {
  return await Post<TSearchResult>(
    'api/Property/get_properties_search',
    request
  );
}

export function getSearchFromUrl(url: URLSearchParams): TSearchFilters {
  const searchRequest: TSearchFilters = {
    pageNumber: parseInt(url.get('page') || '1'),
    pageSize: parseInt(url.get('size') || '10'),
    offerType: parseInt(url.get('offerType') || '0'),
    propertyType: url.get('propertyType')
      ? parseInt(url.get('propertyType')!)
      : undefined,
    city: url.get('city') || undefined,
    district: url.get('district') || undefined,
    priceFrom: url.get('priceFrom')
      ? parseInt(url.get('priceFrom')!)
      : undefined,
    priceTo: url.get('priceTo') ? parseInt(url.get('priceTo')!) : undefined,
    floorFrom: url.get('floorFrom')
      ? parseInt(url.get('floorFrom')!)
      : undefined,
    floorTo: url.get('floorTo') ? parseInt(url.get('floorTo')!) : undefined,
    area: url.get('area') ? parseInt(url.get('area')!) : undefined,
    attributes: [],
  };

  // Parse attribute parameters
  for (const [key, value] of url.entries()) {
    if (key.startsWith('attr_')) {
      const attributeId = key.replace('attr_', '');
      searchRequest.attributes.push({
        name: attributeId,
        value: value,
      });
    }
  }

  return searchRequest;
}
