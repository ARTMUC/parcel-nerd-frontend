// rscp

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, Polyline, TileLayer, WMSTileLayer, SVGOverlay, Polygon } from 'react-leaflet';
import { ParcelBounds } from '../interfaces/parcel-boundaries.type';

import "leaflet/dist/leaflet.css";
import styles from './Map.module.css';
import { LoadingCircle } from './LoadingCircle';
import { LineCoordinates } from '../interfaces/line-coordinates.type';
import { getParcelsCoords, getParcelsInfoByLatLng } from '../services/parcelsAPI';
import { ParcelInfo } from '../interfaces/parcel-info.interface';
import L, { LatLngBoundsLiteral } from 'leaflet';





export const Map = ({ parcelsCoords, pipeCoordsDeg, isCheckingBounds, addParcelToList, isWmsShown, checkIfExist, toggleCheckBounds, parcels }: MapProps) => {

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
        maxZoom: 50,
    }
    const locate = () => {
        map.locate().on("locationfound", function (e: any) {
            map.flyTo(e.latlng, 19);
            const radius = e.accuracy
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
            setTimeout(() => { circle.remove() }, 5000)

        });

    }

    useEffect(() => {

        if (map && !isCheckingBounds) {
            map.on("click", async function (e: { originalEvent: { srcElement: { _leaflet_id: number; }; }; sourceTarget: { _targets: { [x: string]: { options: { [x: string]: any; }; }; }; }; }) {
                const leafletContainerId = e.originalEvent.srcElement._leaflet_id
                const parcelIndex = e.sourceTarget._targets[leafletContainerId].options['data-set']
                const parcelData = parcels[parcelIndex]
                if (parcelData) alert(JSON.stringify(parcelData))
            });
            return () => map.off('click')
        }

        if (map && isCheckingBounds) {
            map.on("click", async function (e: { latlng: { lat: number; lng: number; }; }) {

                const parcelInfo = await getParcelsInfoByLatLng([[e.latlng.lat, e.latlng.lng]])
                if (checkIfExist(parcelInfo)) return

                const parcelCoords = await getParcelsCoords(parcelInfo)
                addParcelToList(parcelInfo, parcelCoords)

            });
            return () => map.off('click')
        }
    }, [isCheckingBounds, parcelsCoords])




    return (
        <>
            <MapContainer center={pipeCoordsDeg[0] ? pipeCoordsDeg[0] : [50.23, 18.99]} zoom={15} scrollWheelZoom={true} style={{ height: "100vh" }} maxZoom={23} whenCreated={(map) => setMap(map)}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={20} />
                {isWmsShown && <WMSTileLayer {...wmsProps} />}
                {parcelsCoords.map((parcel, index) => {
                    return <Polygon data-set={index} key={index} className={styles.parcel} pathOptions={redLines} positions={parcel} />
                })}
                <Polyline pathOptions={blueLines} positions={pipeCoordsDeg} />
            </MapContainer>
            <button onClick={locate}>locate</button>
        </>
    );
};

type MapProps = {
    parcelsCoords: ParcelBounds[],
    pipeCoordsDeg: LineCoordinates[],
    isCheckingBounds: boolean,
    parcels: ParcelInfo[],
    addParcelToList: (info: ParcelInfo[], coords: ParcelBounds[]) => void,
    isWmsShown: boolean,
    checkIfExist: (parcelInfo: ParcelInfo[]) => boolean
    toggleCheckBounds: () => void,
};

