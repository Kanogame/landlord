import type { TImageLink } from '~/components/ImageScroller';
import { createChat } from './chatApi';
import { FormatMoney, type TMoney } from './money';

export enum TOfferType {
  Rent,
  Sell,
}

export enum TPropertyType {
  Flat,
  Detached,
  Commercial,
}

export interface TAddress {
  region: string;
  city: string;
  street: string;
  house: string;
  floor: number;
  displayAddress: string;
}

export interface TProperty {
  type: TOfferType;
  property: TRentProperty | TSellProperty;
  status?: TPropertyStatus;
}

export enum TPropertyStatus {
  Draft,
  Active,
  Rented,
  RentEnding,
  Sold,
  Hidden,
  UnderMaintenance,
}

export function isRentProperty(
  property: TProperty
): property is TProperty & { property: TRentProperty } {
  return property.type === TOfferType.Rent;
}

export function isSellProperty(
  property: TProperty
): property is TProperty & { property: TSellProperty } {
  return property.type === TOfferType.Sell;
}

export function CreateEmptyProperty(type: TOfferType): TProperty {
  const def: TGenericProperty = {
    id: 0,
    propertyTypeId: TPropertyType.Flat,
    name: '',
    desc: '',
    price: {
      amount: '0',
      currency: 125,
      currencySymbol: '₽',
    },
    area: 30,
    address: {
      region: '',
      city: '',
      street: '',
      house: '',
      floor: 1,
      displayAddress: '',
    },
    imageLinks: [],
    ownerId: 0,
    offerTypeId: type,
    propertyAttributes: [],
    username: '',
    profileLink: '',
    isBookmarked: false,
    rooms: 1,
    parking: false,
  };

  if (type === TOfferType.Sell) {
    return {
      type: type,
      property: {
        ...def,
        // Rent-specific fields
        period: TRentPeriod.Month,
        services: true,
        rating: 0,
      },
    };
  }
  return {
    type: type,
    property: def,
  };
}

export interface TOwner {
  id: number;
  name: {
    name: string;
    surname: string;
    patronym: string;
  };
  username?: string;
  profileLink?: string;
  yearsOnSite?: number;
  totalListings?: number;
}

export enum PropertyAttributeType {
  Text = 0,
  Number = 1,
  Boolean = 2,
}

export interface TPropertyAttribute {
  name: string;
  value: string;
  attributeType: PropertyAttributeType;
}

export interface TGenericProperty {
  id: number;
  ownerId: number;
  offerTypeId: TOfferType;
  propertyTypeId: TPropertyType;
  propertyAttributes: TPropertyAttribute[];
  name: string;
  desc: string;
  address: TAddress;
  area: number;
  rooms: number;
  parking: boolean;
  imageLinks: TImageLink[];
  username: string;
  profileLink: string;
  price: TMoney;
  isBookmarked: boolean | null;
}

export enum TRentPeriod {
  Month,
  Week,
  Day,
}

export interface TRentProperty extends TGenericProperty {
  services: boolean;
  rating: number;
  period: TRentPeriod;
}

export type TSellProperty = TGenericProperty;

export interface CreatePropertyRequest {
  offerTypeId: TOfferType;
  propertyTypeId: TPropertyType;
  name: string;
  desc: string;
  address: TAddress;
  area: number;
  rooms: number;
  parking: boolean;
  period?: TRentPeriod;
  services?: boolean;
  imageLinks: TImageLink[];
  price: string;
  currency: number;
  propertyAttributes: TPropertyAttribute[];
}

export interface CreatePropertyResponse {
  success: boolean;
  propertyId?: number;
  message?: string;
}

export function FormatArea(value: number): string {
  return value + ' м²';
}

export interface TSearchResult {
  success: boolean;
  count: number;
  properties: TProperty[];
}

function PricePeriodToString(period: TRentPeriod) {
  switch (period) {
    case TRentPeriod.Day:
      return 'день';
    case TRentPeriod.Week:
      return 'неделя';
    case TRentPeriod.Month:
      return 'месяц';
  }
}

export default function FormatPrice(p: TProperty): string {
  if (p.type == TOfferType.Rent) {
    return (
      FormatMoney(p.property.price) +
      '/' +
      PricePeriodToString((p.property as TRentProperty).period)
    );
  } else {
    return FormatMoney(p.property.price);
  }
}

export function GetOwnerDisplayName(owner: TOwner): string {
  return `${owner.name.surname} ${owner.name.name} ${owner.name.patronym}`;
}

export async function InitiateChat(
  property: TProperty,
  initialMessage: string
): Promise<{ success: boolean; chatId: number }> {
  return await createChat({
    otherUserId: property.property.ownerId,
    propertyId: property.property.id,
    initialMessage: initialMessage,
  });
}
