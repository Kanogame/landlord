import type { TSearchFilters } from '~/hooks/useSearchFilters';
import { Post } from './api';
import {
  PropertyAttributeType,
  type TOfferType,
  type TPropertyAttribute,
  type TPropertyType,
  type TSearchResult,
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
    region: url.get('region') || undefined,
    city: url.get('city') || undefined,
    street: url.get('street') || undefined,
    priceFrom: url.get('priceFrom')
      ? parseInt(url.get('priceFrom')!)
      : undefined,
    priceTo: url.get('priceTo') ? parseInt(url.get('priceTo')!) : undefined,
    floorFrom: url.get('floorFrom')
      ? parseInt(url.get('floorFrom')!)
      : undefined,
    floorTo: url.get('floorTo') ? parseInt(url.get('floorTo')!) : undefined,
    areaFrom: url.get('areaFrom') ? parseInt(url.get('areaFrom')!) : undefined,
    roomsFrom: url.get('roomsFrom')
      ? parseInt(url.get('roomsFrom')!)
      : undefined,
    service: url.get('service') === 'true' ? true : undefined,
    parking: url.get('parking') === 'true' ? true : undefined,
    sortBy: parseInt(url.get('sortBy') || '0'),
    attributes: [],
  };

  // Parse attribute parameters
  for (const [key, value] of url.entries()) {
    if (key.startsWith('attr_')) {
      const attributeId = key.replace('attr_', '');
      searchRequest.attributes.push({
        name: attributeId,
        attributeType: parseInt(value)
          ? PropertyAttributeType.Number
          : PropertyAttributeType.Text,
        value: value,
      });
    }
  }

  return searchRequest;
}
