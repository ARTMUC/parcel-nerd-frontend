import { ResponseParcelInfo } from "../interfaces/response-parcel-info.interface";
import { ServerError } from "../interfaces/server-error.interface";
import { API_URL, defaultErrMessage, FetchError, mapServerResponse } from "./fetchUtils";


export const getAllParcels = async (projectId: string): Promise<ResponseParcelInfo[] | void> => {
  try {
    const response = await fetch(`${API_URL}parcels/${projectId}`, { credentials: "include" });
    const body: ResponseParcelInfo[] | ServerError = await response.json();

    return mapServerResponse<ResponseParcelInfo[]>(response, body);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};



export const addNewParcelByXY = async (projectId: string, x: number,
  y: number): Promise<ResponseParcelInfo | void> => {
  try {

const data = JSON.stringify({x,y})

    const response = await fetch(`${API_URL}parcels/getParcelByXY/${projectId}`, { 
      credentials: "include",
      method:'POST', 
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    const body: ResponseParcelInfo | ServerError = await response.json();

    return mapServerResponse<ResponseParcelInfo>(response, body);
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      throw error;
    }
    throw new Error(defaultErrMessage);
  }
};


// export const addNewParcelByXY = async (
//   x: number,
//   y: number
// ): Promise<ParcelInfo> => {
//   const response = await fetch(
//     `http://localhost:3000/parcels/getParcelByXY/${x},${y}`,
//     {
//       method: "POST",
//     }
//   );
//   if (response.status !== 201) throw new Error();

//   return await response.json();
// };
