import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ParcelInfo } from '../interfaces/parcel-info.interface';
import { Box, Button, Modal } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './ParcelList.module.css';
import { DataGrid, GridRowsProp, GridColDef, GridColumns, useGridApiRef, GridEditCellPropsParams, GridRenderCellParams } from '@mui/x-data-grid';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';




export const ParcelList = ({ parcelsInfoList, isParcelListShown, handleToggleParcelList, handleChangeParcelList }: ParcelListProps) => {

    const columns: GridColDef[] = [
        {
            field: 'actions',
            headerName: 'actions',
            width: 100,
            renderCell: (params: GridRenderCellParams<Date>) => (
                <strong>
                    {/* {params.value.getFullYear()} */}
                    <IconButton
                        // variant="contained"
                        // color="primary"
                        // size="small"
                        // style={{ marginLeft: 2 }}
                        onClick={(e) => alert(JSON.stringify(params.row))}
                    >
                        <LaunchIcon />
                    </IconButton>
                    <IconButton
                        // variant="contained"
                        // color="primary"
                        // size="small"
                        // style={{ marginLeft: 2 }}
                        onClick={(e) => alert(JSON.stringify(params.row))}
                    >
                        <DeleteOutlineIcon />
                    </IconButton>
                </strong>
            ),
        },
        { field: 'id', headerName: 'id', width: 300 },
        { field: 'voivodeship', headerName: 'voivodeship', width: 150, },
        { field: 'county', headerName: 'county', width: 150, },
        { field: 'commune', headerName: 'commune', width: 150, },
        { field: 'KW', headerName: 'KW', width: 150, editable: true, },
        { field: 'class', headerName: 'class', width: 150, editable: true, },
        { field: 'ownerName', headerName: 'owner name', width: 150, editable: true, },
        { field: 'ownerSurname', headerName: 'owner surname', width: 150, editable: true, },
        { field: 'ownerAdressStreet', headerName: 'owner adress street', width: 150, editable: true, },
        { field: 'ownerAdressHouse', headerName: 'owner house number', width: 150, editable: true, },
        { field: 'ownerAdressCity', headerName: 'owner adress city', width: 150, editable: true, },
        { field: 'ownerAdressPostalCode', headerName: 'postal code', width: 150, editable: true, },

    ];


    return (

        <Modal
            open={isParcelListShown}
            onClose={handleToggleParcelList}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={styles.container}>
                <div className={styles.button_close}>
                    <IconButton onClick={handleToggleParcelList} color="secondary">
                        <CloseIcon fontSize="large" />
                    </IconButton>
                </div>
                <div className={styles.list}>
                    <DataGrid editMode="row" rows={parcelsInfoList} columns={columns} onEditCellPropsChange={(params) => handleChangeParcelList(params)} />
                </div>
            </div >
        </Modal >
    );
};

type ParcelListProps = {
    parcelsInfoList: ParcelInfo[];
    isParcelListShown: boolean;
    handleToggleParcelList: () => void;
    handleChangeParcelList: (params: GridEditCellPropsParams) => void;
};

