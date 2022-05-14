import { MappedParcelBounds } from './mapped-parcel-boundaries.type';

export interface MappedParcelInfo {
  id: string;
  parcelNumber: string;
  voivodeship: string;
  county: string;
  commune: string;
  KW?: string;
  class?: string;
  projectId: string;
  userId: string;
  parcelBounds: MappedParcelBounds[];
}
