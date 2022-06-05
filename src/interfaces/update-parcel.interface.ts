import { ParcelBounds } from './parcel-boundaries.type';
import { StatusName } from './parcel-status-name.type';

export interface UpdateParcel {
  id?: string;
  KW?: string;
  class?: string;
  statusName?: StatusName;
}
