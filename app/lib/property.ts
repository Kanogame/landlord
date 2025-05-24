import type { TMoney } from './money';

export enum TPropertyType {
  Rent,
  Sell,
}

export interface TProperty {
  type: TPropertyType;
  property: TRentProperty | TSellPropery;
}

export interface TGenericProperty {
  id: number;
  ownerId: number;
  name: string;
  address: string;
  area: number;
  // hrefs
  images: string[];
}

export enum TRentPeriod {
  Month,
  Week,
  Day,
}

export interface TRentProperty extends TGenericProperty {
  raiting: number;
  // maybe some TMoney?
  cost: TMoney;
  period: TRentPeriod;
}

export interface TSellPropery extends TGenericProperty {
  cost: TMoney;
}

export function FormatArea(value: number): string {
  return value + ' м²';
}
