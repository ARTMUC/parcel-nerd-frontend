// rscp

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, Polyline, TileLayer, WMSTileLayer, SVGOverlay, Polygon } from 'react-leaflet';
import { ParcelBounds } from '../interfaces/parcel-boundaries.type';

import "leaflet/dist/leaflet.css";
import styles from './Map.module.css';
import { LoadingCircle } from './LoadingCircle_old';
import { LineCoordinates } from '../interfaces/line-coordinates.type';
import { ParcelInfo } from '../interfaces/parcel-info.interface';
import L, { LatLngBoundsLiteral } from 'leaflet';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Fab } from '@mui/material';
import { checkParcelData } from '../services/parcelsAPI';





export const Map = ({ pipeCoords, isCheckingBounds, addParcelToList, isWmsShown, toggleCheckBounds, parcelsInfoList }: MapProps) => {

    // const [map, setMap] = useState<any>()

    // const redLines = { color: "red" };
    // const blueLines = { color: "blue" };

    // const wmsProps = {
    //     layers: "dzialki,numery_dzialek",
    //     url: `https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow`,
    //     opacity: 1,
    //     format: "image/png",
    //     control: true,
    //     tiled: true,
    //     maxZoom: 50,
    //     transparent: true,
    // }
    // const locate = () => {
    //     map.locate().on("locationfound", function (e: any) {
    //         map.flyTo(e.latlng, 19);
    //         const radius = e.accuracy
    //         const circle = L.circle(e.latlng, radius);
    //         circle.addTo(map);
    //         setTimeout(() => { circle.remove() }, 5000)

    //     });
    // }




    // useEffect(() => {
    //     if (map && !isCheckingBounds) {
    //         map.on("click", async function (e: { originalEvent: { srcElement: { _leaflet_id: number; }; }; sourceTarget: { _targets: { [x: string]: { options: { [x: string]: any; }; }; }; }; }) {

    //             const leafletContainerId = e.originalEvent.srcElement._leaflet_id
    //             const parcelId = e.sourceTarget._targets[leafletContainerId].options['data-set']
    //             const parcelData = parcelsInfoList.filter(e => e.id === parcelId)
    //             if (parcelData) alert(JSON.stringify(parcelData))
    //         });
    //         return () => map.off('click')
    //     }

    //     if (map && isCheckingBounds) {
    //         map.on("click", async function (e: { latlng: { lat: number; lng: number; }; originalEvent: { srcElement: { _leaflet_id: any; }; }; sourceTarget: { _targets: { [x: string]: { options: { [x: string]: any; }; }; }; }; }) {

    //             const parcelInfo = await checkParcelData(e.latlng.lat, e.latlng.lng)
    //             const leafletContainerId = e.originalEvent.srcElement._leaflet_id
    //             const parcelId = e.sourceTarget._targets[leafletContainerId].options['data-set']
    //             const parcelData = parcelsInfoList.filter(e => e.id === parcelId)

    //             if (parcelData.length > 0) return

    //             addParcelToList(parcelInfo)

    //         });
    //         return () => map.off('click')
    //     }
    // }, [isCheckingBounds, parcelsInfoList])




    return (

<div>map</div>

        // <>
        //     <MapContainer center={pipeCoords.length > 0 ? pipeCoords[0] : [50.23, 18.99]} zoom={15} scrollWheelZoom={true} style={{ height: "100vh" }} maxZoom={23} whenCreated={(map) => setMap(map)}>
        //         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={20} />
        //         {isWmsShown && <WMSTileLayer {...wmsProps} />}
        //         {parcelsInfoList.map((parcel, index) => {
        //             return <Polygon data-set={parcel.id} key={index} className={styles.parcel} pathOptions={redLines} positions={parcel.boundCoords} />
        //         })}
        //         <Polyline pathOptions={blueLines} positions={pipeCoords} />
        //     </MapContainer>

        //     <div className={styles.button}>
        //         <Fab color={"primary"} onClick={locate}>
        //             <LocationOnIcon fontSize="large" />
        //         </Fab>
        //     </div>

        // </>
    );
};

type MapProps = {
    pipeCoords: any,
    isCheckingBounds: boolean,
    addParcelToList: (parcelInfo: ParcelInfo) => void
    isWmsShown: boolean,
    toggleCheckBounds: () => void,
    parcelsInfoList: ParcelInfo[]
};

