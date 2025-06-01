import { useState, useCallback } from 'react';
import {
  TOfferType,
  TPropertyType,
  type TPropertyAttribute,
} from '~/lib/property';

export enum TSortOption {
  PriceAsc,
  PriceDesc,
  AreaAsc,
  AreaDesc,
  CreatedAsc,
  CreatedDesc,
}

export interface TSearchFilters {
  pageNumber: number;
  pageSize: number;
  offerType: TOfferType;
  propertyType?: TPropertyType;
  region?: string;
  city?: string;
  street?: string;
  priceFrom?: number;
  priceTo?: number;
  floorFrom?: number;
  floorTo?: number;
  areaFrom?: number;
  roomsFrom?: number;
  service?: boolean;
  parking?: boolean;
  sortBy?: TSortOption;
  attributes: TPropertyAttribute[];
}

export function useSearchFilters(initialFilters?: Partial<TSearchFilters>) {
  const [filters, setFilters] = useState<TSearchFilters>({
    offerType: TOfferType.Rent,
    pageNumber: 1,
    pageSize: 10,
    sortBy: TSortOption.CreatedDesc,
    ...initialFilters,
    attributes: [],
  });

  function setPage(page: number, size: number) {
    setFilters(prev => ({ ...prev, pageNumber: page, pageSize: size }));
  }

  function applyUrl(filter: TSearchFilters): URLSearchParams {
    const newParams = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        key !== 'attributes'
      ) {
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

  const updateFiltersAndUrl = useCallback(
    (
      updates: Partial<TSearchFilters>,
      setUrl: (param: URLSearchParams) => void
    ) => {
      const newFilters = { ...filters, ...updates };
      setFilters(newFilters);

      // Use React Router's navigate or similar async method
      requestAnimationFrame(() => {
        setUrl(applyUrl(newFilters));
      });
    },
    [filters]
  );

  function updateFilters(updates: Partial<TSearchFilters>) {
    setFilters(prevFilters => ({ ...prevFilters, ...updates }));
  }

  function resetFilters() {
    setFilters({
      offerType: TOfferType.Rent,
      pageNumber: 1,
      pageSize: 10,
      sortBy: TSortOption.CreatedDesc,
      attributes: [],
    });
  }

  return {
    filters,
    updateFilters,
    updateFiltersAndUrl,
    resetFilters,
    setFilters,
    setPage,
  };
}
