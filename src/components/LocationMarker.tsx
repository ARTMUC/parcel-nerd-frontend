// rscp
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { LatLng } from 'leaflet';

export const UserCurrentLocationMarker = () => {

    const [position, setPosition] = useState<LatLng | null>(null)
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            // console.log(e)
            const currPos = e.latlng
            setPosition(currPos)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <>
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        </>

    )
};

UserCurrentLocationMarker.propTypes = {

};

