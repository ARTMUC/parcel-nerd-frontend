import React, { useCallback, useState, createContext } from 'react';
import { Line } from '../interfaces/line.type';
import { OwnerInfo } from '../interfaces/owner-info.interface';
import { ParcelInfo } from '../interfaces/parcel-info.interface';

export interface ProjectContextType {
  projectId: string | null;
  parcels: ParcelInfo[];
  owners: OwnerInfo[];
  lines: Line[];
  addProjectId: (id: string) => void;
  setParcelsCtx: (parcels: ParcelInfo[]) => void;
  setOwnersCtx: (owners: OwnerInfo[]) => void;
  setLinesCtx: (lines: Line[]) => void;
}

const getLocalProject: () => string | null = () => {
  const project = localStorage.getItem('parcelNerd-project');
  if (!project) {
    return null;
  }
  return JSON.parse(project);
};
const initialProject = getLocalProject();

export const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectContextProvider: React.FC = ({ children }) => {
  const [projectId, setProjectId] = useState<string | null>(initialProject);
  const [parcels, setParcels] = useState<ParcelInfo[]>([]);
  const [owners, setOwners] = useState<OwnerInfo[]>([]);
  const [lines, setLines] = useState<Line[]>([
    // {
    //   id: 'adfasdf213r12rqfsadf',
    //   title: 'my test pipeline',
    //   projectId: 'asdfasdfljshadfahsdf',
    //   lineCoords: [
    //     { x: 50.6108936116734, y: 18.97505879356 },
    //     { x: 50.6008936116734, y: 18.98505879356 }
    //   ]
    // },
    // {
    //   id: 'sdfgbsd3456',
    //   title: 'my test pipeline2',
    //   projectId: 'sdfgf35345',
    //   lineCoords: [
    //     { x: 50.6208936116734, y: 18.98505879356 },
    //     { x: 50.6108936116734, y: 18.99505879356 }
    //   ]
    // }
  ]);

  const addProjectId = useCallback(
    (id: string) => {
      setProjectId(id);
      localStorage.setItem('parcelNerd-project', JSON.stringify(id));
    },
    [setProjectId]
  );

  const setParcelsCtx = useCallback(
    (parcels: ParcelInfo[]) => {
      setParcels(parcels);
    },
    [setParcels]
  );

  const setOwnersCtx = useCallback(
    (owners: OwnerInfo[]) => {
      setOwners(owners);
    },
    [setOwners]
  );

  const setLinesCtx = useCallback(
    (lines: Line[]) => {
      setLines(lines);
    },
    [setLines]
  );

  return (
    <ProjectContext.Provider
      value={{ projectId, addProjectId, parcels, setParcelsCtx, owners, setOwnersCtx, lines, setLinesCtx }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
