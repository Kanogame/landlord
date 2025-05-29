import { useState, useCallback } from 'react';
import { TOfferType, TPropertyType } from '~/lib/property';

export interface SearchFiltersState {
  offerType: TOfferType;
  propertyType?: TPropertyType;
  city?: string;
  district?: string;
  priceFrom?: number;
  priceTo?: number;
  floorFrom?: number;
  floorTo?: number;
  area?: number;
  rooms?: number;
  renovation?: string;
  hasElevator: boolean;
  hasParking: boolean;
}

export interface SearchFiltersAPI {
  offerTypeId: TOfferType;
  propertyTypeId?: TPropertyType;
  city?: string;
  district?: string;
  priceMin?: number;
  priceMax?: number;
  floorMin?: number;
  floorMax?: number;
  areaMin?: number;
  rooms?: number;
  attributes?: Array<{
    name: string;
    value: string;
    type: 'boolean' | 'string' | 'number';
  }>;
}

export function useSearchFilters(initialFilters?: Partial<SearchFiltersState>) {
  const [filters, setFilters] = useState<SearchFiltersState>({
    offerType: TOfferType.Rent,
    hasElevator: false,
    hasParking: false,
    ...initialFilters,
  });

  const updateFilters = useCallback((updates: Partial<SearchFiltersState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      offerType: TOfferType.Rent,
      hasElevator: false,
      hasParking: false,
    });
  }, []);

  const toAPIFormat = useCallback((): SearchFiltersAPI => {
    const attributes: Array<{
      name: string;
      value: string;
      type: 'boolean' | 'string' | 'number';
    }> = [];

    // Add renovation as attribute
    if (filters.renovation) {
      attributes.push({
        name: 'renovation',
        value: filters.renovation,
        type: 'string',
      });
    }

    // Add elevator as attribute
    if (filters.hasElevator) {
      attributes.push({
        name: 'hasElevator',
        value: 'true',
        type: 'boolean',
      });
    }

    // Add parking as attribute
    if (filters.hasParking) {
      attributes.push({
        name: 'hasParking',
        value: 'true',
        type: 'boolean',
      });
    }

    return {
      offerTypeId: filters.offerType,
      propertyTypeId: filters.propertyType,
      city: filters.city,
      district: filters.district,
      priceMin: filters.priceFrom,
      priceMax: filters.priceTo,
      floorMin: filters.floorFrom,
      floorMax: filters.floorTo,
      areaMin: filters.area,
      rooms: filters.rooms,
      attributes: attributes.length > 0 ? attributes : undefined,
    };
  }, [filters]);

  return {
    filters,
    updateFilters,
    resetFilters,
    toAPIFormat,
  };
}
