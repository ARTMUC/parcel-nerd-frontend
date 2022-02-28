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
import { PipeLine } from '../components/PipeLine';
import { Hub } from '../components/Hub';

export const Dashboard = () => {
    const [pipeCoords, setPipeCoords] = useState<LineCoordinates[]>([[262694.85, 498375.45], [262638.3, 500919.82]]); // mock data 
    const [pipeCoordsDeg, setPipeCoordsDeg] = useState<LineCoordinates[]>([]);
    const [parcels, setParcels] = useState<ParcelInfo[]>([]);
    const [parcelsCoords, setParcelCoords] = useState<ParcelBounds[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingBounds, setIsCheckingBounds] = useState(false)
    const [isWmsShown, setIsWmsShown] = useState(false)
    const [isPipeEdit, setIsPipeEdit] = useState(false)

    const handleTogglePipeEdit = () => setIsPipeEdit(prev => !prev);

    const toggleCheckBounds = () => setIsCheckingBounds(prev => !prev);


    const toggleWMSDisplay = () => setIsWmsShown(prev => !prev);


    const handleAddNewPipeCoord = () => setPipeCoords(prev => [...prev, [0, 0]]);


    const handleChangeCoord = (e: { target: { dataset: { index: string; axis: string; }; value: number; }; }) => {
        const pointIndex = e.target.dataset.index
        const axis = e.target.dataset.axis
        setPipeCoords((prev) => {
            const updatedArray = prev.map((el, i) => {
                if (+pointIndex !== i) return el

                el[+axis] = +e.target.value
                return el
            })
            return updatedArray
        })
    }
    const handleDeleteCoord = (e: any) => {
        const pointIndex = e.target.dataset.index;
        setPipeCoords((prev) => {
            return prev.filter((el, index) => +pointIndex !== index)
        })
    }

    const handleDrawPipes = async () => {
        setIsLoading(true)
        const pipeConvertedCoords = await convertToDeg(pipeCoords)
        setPipeCoordsDeg(pipeConvertedCoords);
        setIsLoading(false)
    }


    const checkIfExist = (parcelInfo: ParcelInfo[]) => {
        const doubles = parcels.filter(e => e['Identyfikator działki'] === parcelInfo[0]['Identyfikator działki'])
        if (doubles.length > 0) return true
        return false
    };

    const addParcelToList = (parcelInfo: ParcelInfo[], coords: ParcelBounds[]) => {
        setParcels((prev) => [...prev, ...parcelInfo])
        setParcelCoords((prev) => [...prev, coords] as ParcelBounds[])
    };



    const fetchParcelsData = async () => {
        setIsLoading(true)
        const pipeConvertedCoords = await convertToDeg(pipeCoords)
        const parcelsInfo = await getParcelsInfo(pipeCoords);
        const parcelsBounds = await getParcelsCoords(parcelsInfo);
        setPipeCoordsDeg(pipeConvertedCoords);
        setParcels(parcelsInfo);
        setParcelCoords(parcelsBounds);
        setIsLoading(false)
    }

    // useEffect(() => {
    //     (async () => {
    //         setIsLoading(true)
    //         const pipeConvertedCoords = await convertToDeg(pipeCoords)
    //         const parcelsInfo = await getParcelsInfo(pipeCoords);
    //         const parcelsBounds = await getParcelsCoords(parcelsInfo);
    //         setPipeCoordsDeg(pipeConvertedCoords);
    //         setParcels(parcelsInfo);
    //         setParcelCoords(parcelsBounds);
    //         setIsLoading(false)
    //     })()
    // }, []);

    return (
        <div className={styles.container}>
            <Hub toggleCheckBounds={toggleCheckBounds} toggleWMSDisplay={toggleWMSDisplay} isCheckingBounds={isCheckingBounds} handleTogglePipeEdit={handleTogglePipeEdit} />
            {isLoading ? <LoadingCircle /> : <Map parcelsCoords={parcelsCoords} pipeCoordsDeg={pipeCoordsDeg} isCheckingBounds={isCheckingBounds} parcels={parcels} addParcelToList={addParcelToList} isWmsShown={isWmsShown} checkIfExist={checkIfExist} toggleCheckBounds={toggleCheckBounds} />}
            {isPipeEdit && <PipeLine pipeCoords={pipeCoords} handleAddNewPipeCoord={handleAddNewPipeCoord} handleChangeCoord={handleChangeCoord} handleDeleteCoord={handleDeleteCoord} fetchParcelsData={fetchParcelsData} handleDrawPipes={handleDrawPipes} handleTogglePipeEdit={handleTogglePipeEdit} />}
            {/* <Panel toggleCheckBounds={toggleCheckBounds} parcels={parcels} /> */}
        </div>
    );
};

Dashboard.propTypes = {

};

