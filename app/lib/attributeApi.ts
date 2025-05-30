import { Get, Post } from './api';

export interface SearchAttribute {
  attributeName: string;
  attributeType: number; // 0=Select, 1=Number, 2=Boolean
  possibleValues: string[];
}

export async function getSearchAttributes(): Promise<SearchAttribute[]> {
  return await Get<SearchAttribute[]>('api/Property/get_search_attributes');
}
