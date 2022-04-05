import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Map } from '../components/Map';
import { ParcelInfo } from '../interfaces/parcel-info.interface';
import { ParcelBounds } from '../interfaces/parcel-boundaries.type';

import styles from './Dashboard.module.css';
import { LoadingCircle } from '../components/LoadingCircle_old';
import { LineCoordinates } from '../interfaces/line-coordinates.type';
import { PipeLine } from '../components/PipeLine';
import { Hub } from '../components/Hub';
import { convertToDeg } from '../services/parcelsAPI';
import { ParcelList } from '../components/ParcelList';
import { GridEditCellPropsParams } from '@mui/x-data-grid';
import { OwnerList } from '../components/OwnerList';


export const Dashboard = () => {


    const [pipeCoords, setPipeCoords] = useState<any>([[50.6108936116734, 18.97505879356], [50.6008936116734, 18.98505879356],])


    const [parcelsInfoList, setParcelsInfoList] = useState<any[]>([{
        id: 'string',
        voivodeship: 'string',
        county: 'string',
        commune: 'string123',
        boundCoords: [[50.6008936116734, 18.98505879356], [50.6026872639661, 18.9828860939266], [50.6027542279003, 18.983018559349], [50.6028160358464, 18.9830970458734], [50.602864007728, 18.9832825406091], [50.6005552836585, 18.9859811575193], [50.5998134034592, 18.9868830614328], [50.5996610841659, 18.9863860168516], [50.6008936116734, 18.98505879356]],
        KW: 'string123',
        owner: [{
            id: 1,
            class: 'string123',
            ownerName: 'string123',
            ownerSurname: 'string123',
            ownerAdressStreet: 'string123',
            ownerAdressHouse: 'string123',
            ownerAdressCity: 'string123',
            ownerAdressPostalCode: 'string123',
        }, {
            id: 2,
            class: 'string1234',
            ownerName: 'string1234',
            ownerSurname: 'string1234',
            ownerAdressStreet: 'string1234',
            ownerAdressHouse: 'string1234',
            ownerAdressCity: 'string1243',
            ownerAdressPostalCode: 'string1234'
        }]

    }])

    const [ownersInfoList, setOwnerInfoList] = useState<any[]>([])


    //// this is only temporary - data will be split on the backend probably
    useEffect(() => {
        const xxx = parcelsInfoList.filter((e) => e.owner)
        const owners = xxx.map((e) => {
            const xxx = e.owner
            return xxx.map((x: any) => {
                return { ...x, parcelId: e.id }
            })

        })
        const zzz = owners.flat()
        setOwnerInfoList(zzz)
    }, [parcelsInfoList])
    ////



    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingBounds, setIsCheckingBounds] = useState(false)
    const [isWmsShown, setIsWmsShown] = useState(true)
    const [isPipeEdit, setIsPipeEdit] = useState(false)
    const [isParcelListShown, setIsParcelListShown] = useState(false);
    const [isOwnersListShown, setIsOwnersListShown] = useState(false);

    const handleAddNewPipeCoord = async (coords: LineCoordinates[]) => {
        // setIsLoading(true)
        // const pipeConvertedCoords = await convertToDeg(coords)
        // setPipeCoords(prev => [...prev, pipeConvertedCoords])
        // setIsLoading(false)
    };

    const handleDeletePipeCoord = (e: { target: { dataset: { index: string; }; }; }) => {
        // const elementIndex = e.target.dataset.index;
        // setPipeCoords((prev) => {
        //     return prev.filter((el, index) => +elementIndex !== index)
        // })
    }

    const addParcelToList = (parcelInfo: ParcelInfo) => {
        setParcelsInfoList((prev) => [...prev, parcelInfo])
    };


    const handleChangeParcelList = (params: GridEditCellPropsParams) => {
        setParcelsInfoList((prev) => prev.map((parcel) => parcel.id === params.id ? { ...parcel, [params.field]: params.props.value } : parcel))
    }

    const handleTogglePipeEdit = () => setIsPipeEdit(prev => !prev);

    const handleToggleParcelList = () => setIsParcelListShown(prev => !prev);

    const handleToggleOwnersList = () => setIsOwnersListShown(prev => !prev);

    const toggleCheckBounds = () => setIsCheckingBounds(prev => !prev);

    const toggleWMSDisplay = () => setIsWmsShown(prev => !prev);




    return (
        <div className={styles.container} >
            <Hub toggleCheckBounds={toggleCheckBounds} toggleWMSDisplay={toggleWMSDisplay} isCheckingBounds={isCheckingBounds} handleTogglePipeEdit={handleTogglePipeEdit} isPipeEdit={isPipeEdit} isWmsShown={isWmsShown} isParcelListShown={isParcelListShown} handleToggleParcelList={handleToggleParcelList} handleToggleOwnersList={handleToggleOwnersList} isOwnersListShown={isOwnersListShown} />

            {isLoading ? <LoadingCircle /> : <Map pipeCoords={pipeCoords} isCheckingBounds={isCheckingBounds} parcelsInfoList={parcelsInfoList} addParcelToList={addParcelToList} isWmsShown={isWmsShown} toggleCheckBounds={toggleCheckBounds} />}

            {isPipeEdit && <PipeLine handleTogglePipeEdit={handleTogglePipeEdit} isPipeEdit={isPipeEdit} handleAddNewPipeCoord={handleAddNewPipeCoord} handleDeletePipeCoord={handleDeletePipeCoord} pipeCoords={pipeCoords} />}

            {isParcelListShown && <ParcelList parcelsInfoList={parcelsInfoList} isParcelListShown={isParcelListShown} handleToggleParcelList={handleToggleParcelList} handleChangeParcelList={handleChangeParcelList} />}

            {isOwnersListShown && <OwnerList ownersInfoList={ownersInfoList} isOwnersListShown={isOwnersListShown} handleToggleOwnersList={handleToggleOwnersList} handleChangeParcelList={handleChangeParcelList} />}
        </div >
    );
};
