import type { TMoney } from './money';
import type { TUser } from './user';

export enum TPropertyType {
  Rent,
  Sell,
}

export type TProperty = TRentProperty | TSellPropery;

export interface TGenericProperty {
  id: number;
  type: TPropertyType;
  ownerId: number;
  name: string;
  address: string;
  area: number;
  desc: string;
  imageLinks: string[];
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
