import { LineCoordinates } from './line-coordinates.type';

export interface Line {
  id: string;
  title: string;
  projectId: string;
  lineCoords: LineCoordinates[];
}
