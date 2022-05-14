import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ParcelInfo } from '../interfaces/parcel-info.interface';
import { Box, Button, Modal } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './OwnerlList.module.css';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridColumns,
  useGridApiRef,
  GridEditCellPropsParams,
  GridRenderCellParams
} from '@mui/x-data-grid';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const OwnerList = ({ ownersInfoList, isOwnersListShown, handleToggleOwnersList }: ParcelListProps) => {
  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'actions',
      width: 100,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <strong>
          <IconButton onClick={(e) => alert(JSON.stringify(params.row))}>
            <LaunchIcon />
          </IconButton>
          <IconButton onClick={(e) => alert(JSON.stringify(params.row))}>
            <DeleteOutlineIcon />
          </IconButton>
        </strong>
      )
    },

    { field: 'parcelId', headerName: 'parcel id', width: 150 },
    { field: 'id', headerName: 'owner id', width: 150 },
    { field: 'ownerName', headerName: 'owner name', width: 150, editable: true },
    { field: 'ownerSurname', headerName: 'owner surname', width: 150, editable: true },
    { field: 'ownerAdressStreet', headerName: 'owner adress street', width: 150, editable: true },
    { field: 'ownerAdressHouse', headerName: 'owner house number', width: 150, editable: true },
    { field: 'ownerAdressCity', headerName: 'owner adress city', width: 150, editable: true },
    { field: 'ownerAdressPostalCode', headerName: 'postal code', width: 150, editable: true }
  ];

  return (
    <Modal
      open={isOwnersListShown}
      onClose={handleToggleOwnersList}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.container}>
        <div className={styles.button_close}>
          <IconButton onClick={handleToggleOwnersList} color="secondary">
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>
        <div className={styles.list}>
          <DataGrid
            editMode="row"
            rows={ownersInfoList}
            columns={columns}
            onEditCellPropsChange={(params) => console.log(params)}
          />
        </div>

        {/* need a button to add new owner manually */}
      </div>
    </Modal>
  );
};

type ParcelListProps = {
  // parcelsInfoList: ParcelInfo[];
  ownersInfoList: any;
  isOwnersListShown: boolean;
  handleToggleOwnersList: () => void;
};
