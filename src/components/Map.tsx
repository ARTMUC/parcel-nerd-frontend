// rscp

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, Polyline, TileLayer, WMSTileLayer } from 'react-leaflet';
import { ParcelBounds } from '../interfaces/parcel-boundaries.type';

import "leaflet/dist/leaflet.css";
import { LatLngExpression } from 'leaflet';
import { LoadingCircle } from './LoadingCircle';
import { LineCoordinates } from '../interfaces/line-coordinates.type';
import { getParcelsCoords, getParcelsInfoByLatLng } from '../services/parcelsAPI';
import { ParcelInfo } from '../interfaces/parcel-info.interface';
import { DraggableMarker } from './DraggableMarker';




export const Map = ({ parcelsCoords, pipeCoordsDeg, isCheckingBounds, addParcelToList }: MapProps) => {

    const [map, setMap] = useState<any>()

    const redLines = { color: "red" };
    const blueLines = { color: "blue" };

    const wmsProps = {
        layers: "dzialki,numery_dzialek",
        url: `https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow`,
        opacity: 1,
        format: "image/png",
        control: true,
        tiled: true,
    }

    useEffect(() => {
        if (map && !isCheckingBounds) map.off('click')

        if (map && isCheckingBounds) {
            console.log(map)
            map.on("click", async function (e: any) {
                const parcelInfo = await getParcelsInfoByLatLng([[e.latlng.lat, e.latlng.lng]])
                const parcelCoords = await getParcelsCoords(parcelInfo)
                addParcelToList(parcelInfo, parcelCoords)
            });
        }
    }, [isCheckingBounds])




    return (
        <>
            <MapContainer center={pipeCoordsDeg[0]} zoom={100} scrollWheelZoom={true} style={{ height: "100vh" }} whenCreated={(map) => setMap(map)}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <WMSTileLayer {...wmsProps} />
                <Polyline pathOptions={redLines} positions={parcelsCoords} />
                <Polyline pathOptions={blueLines} positions={pipeCoordsDeg} />
                {/* <DraggableMarker /> */}
            </MapContainer>
        </>
    );
};

type MapProps = {
    parcelsCoords: ParcelBounds[],
    pipeCoordsDeg: LineCoordinates[],
    isCheckingBounds: boolean,
    parcels: ParcelInfo[],
    addParcelToList: (info: ParcelInfo[], coords: ParcelBounds) => void

};

