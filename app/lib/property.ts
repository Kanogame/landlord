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
  cost: string;
  period: TRentPeriod;
}

export interface TSellPropery extends TGenericProperty {
  cost: string;
}
