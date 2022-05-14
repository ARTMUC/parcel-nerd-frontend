import React, { useCallback, useState, createContext } from 'react';
import { OwnerInfo } from '../interfaces/owner-info.interface';
import { ParcelInfo } from '../interfaces/parcel-info.interface';

export interface ProjectContextType {
  projectId: string | null;
  parcels: ParcelInfo[];
  owners: OwnerInfo[];
  addProjectId: (id: string) => void;
  setParcelsCtx: (parcels: ParcelInfo[]) => void;
  setOwnersCtx: (owners: OwnerInfo[]) => void;
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

  return (
    <ProjectContext.Provider value={{ projectId, addProjectId, parcels, setParcelsCtx, owners, setOwnersCtx }}>
      {children}
    </ProjectContext.Provider>
  );
};
