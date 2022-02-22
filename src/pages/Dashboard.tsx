import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Map } from '../components/Map';
import { Panel } from '../components/Panel';
import { Coordinates } from '../interfaces/coordinates.interface';
import { ParcelInfo } from '../interfaces/parcel-info.interface';
import { ParcelBounds } from '../interfaces/parcel-boundaries.type';
import { getParcelsCoords, getParcelsInfo } from '../services/parcelsAPI';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
    const [pipeCoords, setPipeCoords] = useState<Coordinates[]>([
        {
            x: 262694.85,
            y: 498375.45,
        },
        {
            x: 262638.3,
            y: 500919.82,
        },
    ]); // mock data for now 
    const [parcels, setParcels] = useState<ParcelInfo[]>([]);
    const [parcelsCoords, setParcelCoords] = useState<ParcelBounds[]>([]);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        (async () => {
            const parcelsInfo = await getParcelsInfo(pipeCoords);
            const parcelsBounds = await getParcelsCoords(parcelsInfo);
            setParcels(parcelsInfo);
            setParcelCoords(parcelsBounds);
            setIsLoading(prev => !prev)
        })()
    }, []);



    return (
        <div className={styles.container}>
            <Map parcelsCoords={parcelsCoords} isLoading={isLoading} />
            <Panel />
        </div>
    );
};

Dashboard.propTypes = {

};

