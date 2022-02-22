import { Coordinates } from "../interfaces/coordinates.interface";
import { ParcelInfo } from "../interfaces/parcel-info.interface";

export const getParcelsInfo = async (pipeCoords: Coordinates[]) => {
  console.log("LOADING DATA...");
  const reqData = JSON.stringify(pipeCoords);
  const response = await fetch(
    "http://localhost:3000/parcels/getByCoordinates",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: reqData,
    }
  );
  if (response.status !== 201) console.log("ERROR GETTING PARCELS INFO");
  console.log("SUCCESS GETTING PARCELS INFO");
  return await response.json();
};
export const getParcelsCoords = async (parcels: ParcelInfo[]) => {
  console.log("LOADING DATA...");
  const parcelsNumbers = parcels.map((parcel) => {
    return parcel["Identyfikator działki"];
  });
  const reqData = JSON.stringify(parcelsNumbers);
  const response = await fetch("http://localhost:3000/parcels/getBoudsById", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: reqData,
  });
  if (response.status !== 201) console.log("ERROR GETTING PARCELS COORDS");
  console.log("SUCCESS GETTING PARCELS COORDS");
  return await response.json();
};
