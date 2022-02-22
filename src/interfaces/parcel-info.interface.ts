import { Coordinates } from './coordinates.interface';

export interface ParcelInfo {
  'Identyfikator działki': string;
  Województwo: string;
  Powiat: string;
  Gmina: string;
  Obręb: string;
  'Numer działki': string;
  'Pole pow. w ewidencji gruntów (ha)': string;
  KW: string;
  'Grupa rejestrowa': string;
  'Oznaczenie użytku': string;
  'Oznaczenie konturu': string;
  'Data publikacji danych': string;
  'Informacje o pochodzeniu danych': string;
  'Informacje dodatkowe o działce': string;
  coordinates: Coordinates;
  index: number;
}
