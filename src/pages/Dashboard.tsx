import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Map } from '../components/Map';
import { Panel } from '../components/Panel';
import { ParcelInfo } from '../interfaces/parcel-info.interface';
import { ParcelBounds } from '../interfaces/parcel-boundaries.type';
import { convertToDeg, getParcelsCoords, getParcelsInfo } from '../services/parcelsAPI';
import styles from './Dashboard.module.css';
import { LoadingCircle } from '../components/LoadingCircle';
import { LineCoordinates } from '../interfaces/line-coordinates.type';

export const Dashboard = () => {
    const [pipeCoords, setPipeCoords] = useState<LineCoordinates[]>([[262694.85, 498375.45], [262638.3, 500919.82]]); // mock data for now 
    const [pipeCoordsDeg, setPipeCoordsDeg] = useState<LineCoordinates[]>([]);
    const [parcels, setParcels] = useState<ParcelInfo[]>([]);
    const [parcelsCoords, setParcelCoords] = useState<ParcelBounds[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingBounds, setIsCheckingBounds] = useState(false)

    const toggleCheckBounds = () => {
        setIsCheckingBounds(prev => !prev)
    }



    useEffect(() => {
        (async () => {
            setIsLoading(true)
            const pipeConvertedCoords = await convertToDeg(pipeCoords)
            const parcelsInfo = await getParcelsInfo(pipeCoords);
            const parcelsBounds = await getParcelsCoords(parcelsInfo);
            setPipeCoordsDeg(pipeConvertedCoords);
            setParcels(parcelsInfo);
            setParcelCoords(parcelsBounds);
            setIsLoading(false)
        })()
    }, []);




    return (
        <div className={styles.container}>
            {isLoading ? <LoadingCircle /> : <Map parcelsCoords={parcelsCoords} pipeCoordsDeg={pipeCoordsDeg} isCheckingBounds={isCheckingBounds} />}
            <Panel toggleCheckBounds={toggleCheckBounds} />
        </div>
    );
};

Dashboard.propTypes = {

};

