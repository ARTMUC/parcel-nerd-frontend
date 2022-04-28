interface ParcelId {
    parcelNumber: string,
    id: string
}


export interface OwnerInfo {
          id: string,
          name: string,
          surname:  string,
          streetName: string,
          homeNumber: string,
          city: string,
          postalCode: string,
          parcels:ParcelId[],
          userId: string,
          projectId: string
      }