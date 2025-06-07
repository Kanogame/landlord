import { Post, Put } from './api';
import {
  TOfferType,
  type CreatePropertyRequest,
  type CreatePropertyResponse,
  type TProperty,
  type TRentPeriod,
  type TRentProperty,
  type TSellProperty,
} from './property';

export async function createProperty(
  p: TRentProperty | TSellProperty
): Promise<CreatePropertyResponse> {
  let req: CreatePropertyRequest = {
    offerTypeId: p.offerTypeId,
    propertyTypeId: p.propertyTypeId,
    name: p.name,
    desc: p.desc,
    price: p.price.amount,
    currency: p.price.currency,
    area: p.area,
    address: p.address,
    imageLinks: p.imageLinks,
    propertyAttributes: p.propertyAttributes,
    rooms: p.rooms,
    parking: p.parking,
  };
  if (p.offerTypeId == TOfferType.Rent) {
    req.services = (p as TRentProperty).services;
    req.period = (p as TRentProperty).period;
  }
  return await Post<CreatePropertyResponse>('api/Property/create', req);
}

export interface UpdatePropertyResponse {
  success: boolean;
  message?: string;
}

export async function updateProperty(
  id: number,
  propertyData: TProperty
): Promise<UpdatePropertyResponse> {
  return await Put<UpdatePropertyResponse>(`api/Property/update/${id}`, {
    req: propertyData,
  });
}
