import { LineCoordinates } from "../interfaces/line-coordinates.type";
import { ParcelInfo } from "../interfaces/parcel-info.interface";

export const checkParcelData = async (
  x: number,
  y: number
): Promise<ParcelInfo> => {
  const response = await fetch(
    `http://localhost:3000/parcels/getParcelByXY/${x},${y}`,
    {
      method: "POST",
    }
  );
  if (response.status !== 201) throw new Error();

  return await response.json();
};
export const convertToDeg = async (
  pipeCoords: LineCoordinates[]
): Promise<LineCoordinates[]> => {
  console.log("LOADING DATA...");
  const reqData = JSON.stringify(pipeCoords);
  const response = await fetch("http://localhost:3000/parcels/coordsToDeg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: reqData,
  });
  if (response.status !== 201) console.log("ERROR CONVERTING COORDS");

  console.log("SUCCESS CONVERTING COORDS");
  return await response.json();
};

// export const getParcelsInfo = async (
//   pipeCoords: LineCoordinates[]
// ): Promise<ParcelInfo[]> => {
//   console.log("LOADING DATA...");
//   const reqData = JSON.stringify(pipeCoords);
//   const response = await fetch(
//     "http://localhost:3000/parcels/getByCoordinates",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: reqData,
//     }
//   );
//   if (response.status !== 201) console.log("ERROR GETTING PARCELS INFO");
//   console.log("SUCCESS GETTING PARCELS INFO");
//   return await response.json();
// };
// export const getParcelsCoords = async (
//   parcels: ParcelInfo[]
// ): Promise<ParcelBounds[]> => {
//   console.log("LOADING DATA...");
//   const parcelsNumbers = parcels.map((parcel) => {
//     return parcel["Identyfikator działki"];
//   });
//   const reqData = JSON.stringify(parcelsNumbers);
//   const response = await fetch("http://localhost:3000/parcels/getBoudsById", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: reqData,
//   });
//   if (response.status !== 201) console.log("ERROR GETTING PARCELS COORDS");
//   console.log("SUCCESS GETTING PARCELS COORDS");
//   return await response.json();
// };

// export const getParcelsInfoByLatLng = async (
//   pipeCoords: LineCoordinates[]
// ): Promise<ParcelInfo[]> => {
//   console.log("LOADING DATA...");
//   const reqData = JSON.stringify(pipeCoords);
//   const response = await fetch("http://localhost:3000/parcels/getByLatLng", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: reqData,
//   });
//   if (response.status !== 201) console.log("ERROR GETTING PARCELS INFO");
//   console.log("SUCCESS GETTING PARCELS INFO");
//   return await response.json();
// };
