import { ParcelBounds } from './parcel-boundaries.type';

export interface ParcelInfo {
  id: string;
  parcelNumber: string;
  voivodeship: string;
  county: string;
  commune: string;
  KW?: string;
  class?: string;
  projectId: string;
  userId: string;
  parcelBounds: ParcelBounds[];
}
