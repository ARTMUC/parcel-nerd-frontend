import { ParcelBounds } from "./parcel-boundaries.type";

export interface ParcelInfo  {
  parcelNumber: string;
  voivodeship: string;
  county: string;
  commune: string;
  boundCoords: ParcelBounds[];
  KW?: string;
  class?: string;
}
