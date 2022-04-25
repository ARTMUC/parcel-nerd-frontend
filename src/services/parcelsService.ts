import { CreateProject } from "../interfaces/createProject.interface";
import { ParcelInfo } from "../interfaces/parcel-info.interface";
import { Project } from "../interfaces/project.interface";
import { RegisterData } from "../interfaces/register-data.interface";
import { ServerError } from "../interfaces/server-error.interface";
import { User } from "../interfaces/user.interface";
import { API_URL, defaultErrMessage, FetchError, mapServerResponse } from "./fetchUtils";


export const getAllParcels = async (projectId: string): Promise<ParcelInfo[] | void> => {
  try {
    const response = await fetch(`${API_URL}parcels/${projectId}`, { credentials: "include" });
    const body: ParcelInfo[] | ServerError = await response.json();

    return mapServerResponse<ParcelInfo[]>(response, body);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};
