import { useState, useCallback } from 'react';
import {
  TOfferType,
  TPropertyType,
  type TPropertyAttribute,
} from '~/lib/property';

export type TSortOption = 'recent' | 'price' | 'area';

export interface TSearchFilters {
  pageNumber: number;
  pageSize: number;
  offerType: TOfferType;
  propertyType?: TPropertyType;
  city?: string;
  district?: string;
  priceFrom?: number;
  priceTo?: number;
  floorFrom?: number;
  floorTo?: number;
  area?: number;
  attributes: TPropertyAttribute[];
  sorting?: TSortOption;
}

export function useSearchFilters(initialFilters?: Partial<TSearchFilters>) {
  const [filters, setFilters] = useState<TSearchFilters>({
    offerType: TOfferType.Rent,
    pageNumber: 1,
    pageSize: 10,
    sorting: 'recent',
    ...initialFilters,
    attributes: [],
  });

  function setPage(page: number, size: number) {
    setFilters(prev => ({ ...prev, pageNumber: page, pageSize: size }));
  }

  function applyUrl(filter: TSearchFilters): URLSearchParams {
    const newParams = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        newParams.set(key, value.toString());
      }

      if (key === 'attributes') {
        for (const attribute of value) {
          newParams.set(`attr_${attribute.attribute}`, attribute.value);
        }
      }
    });
    return newParams;
  }

  function updateFiltersAndUrl(
    updates: Partial<TSearchFilters>,
    setUrl: (param: URLSearchParams) => void
  ) {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, ...updates };
      setUrl(applyUrl(newFilters));
      return newFilters;
    });
  }

  function updateFilters(updates: Partial<TSearchFilters>) {
    setFilters(prevFilters => ({ ...prevFilters, ...updates }));
  }

  function resetFilters() {
    setFilters({
      offerType: TOfferType.Rent,
      pageNumber: 1,
      pageSize: 10,
      sorting: 'recent',
      attributes: [],
    });
  }

  return {
    filters,
    updateFilters,
    updateFiltersAndUrl,
    resetFilters,
    setPage,
  };
}
