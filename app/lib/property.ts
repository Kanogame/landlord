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
  city: string;
  district: string;
  street: string;
  floor: number;
  displayAddress: string;
}

export interface TProperty {
  type: TOfferType;
  property: TRentProperty | TSellProperty;
}

export function CreateEmptyProperty(type: TOfferType): TProperty {
  const def = {
    id: 0,
    PropertyTypeId: TPropertyType.Flat,
    name: '',
    desc: '',
    price: {
      amount: '0',
      currency: 125,
      currencySymbol: '₽',
    },
    area: 0,
    address: {
      city: '',
      district: '',
      street: '',
      floor: 0,
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
    services: true,
    parking: false,
  };

  if (type === TOfferType.Sell) {
    return {
      type: type,
      property: {
        ...def,
        // Rent-specific fields
        period: TRentPeriod.Month,
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
  Text,
  Number,
  Boolean,
}

export interface TPropertyAttribute {
  name: string;
  value: string;
}

export interface TGenericProperty {
  id: number;
  ownerId: number;
  offerTypeId: TOfferType;
  PropertyTypeId: TPropertyType;
  propertyAttributes: TPropertyAttribute[];
  name: string;
  desc: string;
  address: TAddress;
  area: number;
  rooms: number;
  services: boolean;
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
  rating: number;
  period: TRentPeriod;
}

export type TSellProperty = TGenericProperty;
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
