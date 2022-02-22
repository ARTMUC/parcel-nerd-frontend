// rscp

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, Polyline, TileLayer, WMSTileLayer } from 'react-leaflet';
import { ParcelBounds } from '../interfaces/parcel-boundaries.type';

import "leaflet/dist/leaflet.css";
import { LatLngExpression } from 'leaflet';


export const Map = ({ parcelsCoords, isLoading }: MapProps) => {

    const redLines = { color: "red" };

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
            <MapContainer center={[50.23, 18.97]} zoom={100} scrollWheelZoom={true} style={{ height: "100vh" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <WMSTileLayer {...wmsProps} />
                {isLoading ? 'LOADING...' : <Polyline pathOptions={redLines} positions={parcelsCoords} />}
            </MapContainer>
        </>
    );
};

type MapProps = {
    parcelsCoords: ParcelBounds[],
    isLoading: boolean,
};

