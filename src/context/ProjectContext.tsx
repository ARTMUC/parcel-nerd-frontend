import React, { useCallback, useState, createContext, useEffect } from "react";
import { OwnerInfo } from "../interfaces/owner-info.interface";
import { ParcelInfo } from "../interfaces/parcel-info.interface";
import { User } from "../interfaces/user.interface";

export interface ProjectContextType {
    projectId: string | null;
    parcels: ParcelInfo[];
    owners: OwnerInfo[] ;
    addProjectId: (id: string) => void;
    setParcelsCtx: (parcels: ParcelInfo[]) => void;
    setOwnersCtx: (owners: OwnerInfo[]) => void;

};


export const ProjectContext = createContext<ProjectContextType | null>(null);

export const ProjectContextProvider: React.FC = ({ children }) => {
    const [projectId, setProjectId] = useState<string | null>(null)
    const [parcels, setParcels] = useState<ParcelInfo[]>([])
    const [owners, setOwners] = useState<OwnerInfo[]>([])

    const addProjectId = useCallback(
        (id: string) => {
            setProjectId(id);
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
            setOwners(owners)
        },
        [setOwners]
    );



    return (
        <ProjectContext.Provider value={{ projectId, addProjectId, parcels,setParcelsCtx,  owners, setOwnersCtx }}>
            {children}
        </ProjectContext.Provider>
    );
}
