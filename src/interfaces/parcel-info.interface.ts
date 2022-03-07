import { ParcelBounds } from "./parcel-boundaries.type";

export interface ParcelInfo {
  id: string;
  voivodeship: string;
  county: string;
  commune: string;
  boundCoords: ParcelBounds;
  KW?: string;
  class?: string;
  ownerName?: string;
  ownerSurname?: string;
  ownerAdressStreet?: string;
  ownerAdressHouse?: string;
  ownerAdressCity?: string;
  ownerAdressPostalCode?: string;
}
