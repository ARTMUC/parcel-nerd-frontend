import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Map } from '../components/Map';
import { ParcelInfo } from '../interfaces/parcel-info.interface';
import { ParcelBounds } from '../interfaces/parcel-boundaries.type';

import styles from './Dashboard.module.css';
import { LoadingCircle } from '../components/LoadingCircle';
import { LineCoordinates } from '../interfaces/line-coordinates.type';
import { PipeLine } from '../components/PipeLine';
import { Hub } from '../components/Hub';
import { convertToDeg } from '../services/parcelsAPI';
import { ParcelList } from '../components/ParcelList';
import { GridEditCellPropsParams } from '@mui/x-data-grid';

export const Dashboard = () => {
    const [pipeCoords, setPipeCoords] = useState<LineCoordinates[][]>([])
    const [parcelsInfoList, setParcelsInfoList] = useState<ParcelInfo[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingBounds, setIsCheckingBounds] = useState(false)
    const [isWmsShown, setIsWmsShown] = useState(true)
    const [isPipeEdit, setIsPipeEdit] = useState(false)
    const [isParcelListShown, setIsParcelListShown] = useState(false);

    const handleAddNewPipeCoord = async (coords: LineCoordinates[]) => {
        setIsLoading(true)
        const pipeConvertedCoords = await convertToDeg(coords)
        setPipeCoords(prev => [...prev, pipeConvertedCoords])
        setIsLoading(false)
    };

    const handleDeletePipeCoord = (e: { target: { dataset: { index: string; }; }; }) => {
        const elementIndex = e.target.dataset.index;
        setPipeCoords((prev) => {
            return prev.filter((el, index) => +elementIndex !== index)
        })
    }

    const addParcelToList = (parcelInfo: ParcelInfo) => {
        setParcelsInfoList((prev) => [...prev, parcelInfo])
    };


    const handleChangeParcelList = (params: GridEditCellPropsParams) => {
        setParcelsInfoList((prev) => prev.map((parcel) => parcel.id === params.id ? { ...parcel, [params.field]: params.props.value } : parcel))
    }

    const handleTogglePipeEdit = () => setIsPipeEdit(prev => !prev);

    const handleToggleParcelList = () => setIsParcelListShown(prev => !prev);

    const toggleCheckBounds = () => setIsCheckingBounds(prev => !prev);

    const toggleWMSDisplay = () => setIsWmsShown(prev => !prev);




    return (
        <div className={styles.container}>
            <Hub toggleCheckBounds={toggleCheckBounds} toggleWMSDisplay={toggleWMSDisplay} isCheckingBounds={isCheckingBounds} handleTogglePipeEdit={handleTogglePipeEdit} isPipeEdit={isPipeEdit} isWmsShown={isWmsShown} isParcelListShown={isParcelListShown} handleToggleParcelList={handleToggleParcelList} />

            {isLoading ? <LoadingCircle /> : <Map pipeCoords={pipeCoords} isCheckingBounds={isCheckingBounds} parcelsInfoList={parcelsInfoList} addParcelToList={addParcelToList} isWmsShown={isWmsShown} toggleCheckBounds={toggleCheckBounds} />}

            {isPipeEdit && <PipeLine handleTogglePipeEdit={handleTogglePipeEdit} isPipeEdit={isPipeEdit} handleAddNewPipeCoord={handleAddNewPipeCoord} handleDeletePipeCoord={handleDeletePipeCoord} pipeCoords={pipeCoords} />}

            {isParcelListShown && <ParcelList parcelsInfoList={parcelsInfoList} isParcelListShown={isParcelListShown} handleToggleParcelList={handleToggleParcelList} handleChangeParcelList={handleChangeParcelList} />}
        </div>
    );
};


