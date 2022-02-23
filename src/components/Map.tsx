// rscp

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, Polyline, TileLayer, WMSTileLayer } from 'react-leaflet';
import { ParcelBounds } from '../interfaces/parcel-boundaries.type';

import "leaflet/dist/leaflet.css";
import { LatLngExpression } from 'leaflet';
import { LoadingCircle } from './LoadingCircle';
import { LineCoordinates } from '../interfaces/line-coordinates.type';


export const Map = ({ parcelsCoords, pipeCoordsDeg }: MapProps) => {

    const redLines = { color: "red" };
    const blueLines = { color: "blue" };

    const wmsProps = {
        layers: "dzialki,numery_dzialek",
        url: `https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow`,
        opacity: 0.7,
        format: "image/png",
        control: true,
        tiled: true,
    }

    return (
        <>
            <MapContainer center={pipeCoordsDeg[0]} zoom={100} scrollWheelZoom={true} style={{ height: "100vh" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <WMSTileLayer {...wmsProps} />
                <Polyline pathOptions={redLines} positions={parcelsCoords} />
                <Polyline pathOptions={blueLines} positions={pipeCoordsDeg} />
            </MapContainer>
        </>
    );
};

type MapProps = {
    parcelsCoords: ParcelBounds[],
    pipeCoordsDeg: LineCoordinates[]
};

