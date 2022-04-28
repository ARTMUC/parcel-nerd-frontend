import { ResponseParcelBounds } from "./response-parcel-boundaries.type";


export interface ResponseParcelInfo  {
  id:string
  parcelNumber: string;
  voivodeship: string;
  county: string;
  commune: string;
  KW?: string;
  class?: string;
  projectId: string;
  userId: string;
  parcelBounds: ResponseParcelBounds[];
 
}

