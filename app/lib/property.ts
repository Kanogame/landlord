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
  story: number;
  displayAddress: string;
}

export interface TProperty {
  type: TOfferType;

  property: TRentProperty | TSellProperty;
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

export interface TGenericProperty {
  id: number;
  ownerId: number;
  offerTypeId: TOfferType;
  PropertyTypeId: TPropertyType;
  name: string;
  desc: string;
  address: TAddress;
  area: number;
  imageLinks: string[];
  username: string;
  profileLink: string;
}

export enum TRentPeriod {
  Month,
  Week,
  Day,
}

export interface TRentProperty extends TGenericProperty {
  raiting: number;
  price: TMoney;
  period: TRentPeriod;
}

export interface TSellProperty extends TGenericProperty {
  price: TMoney;
}

export function FormatArea(value: number): string {
  return value + ' м²';
}

export interface TSearchResult {
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
