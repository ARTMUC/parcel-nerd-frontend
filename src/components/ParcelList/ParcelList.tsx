import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import styles from './ParcelList.module.css';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useToastMessageContext } from '../../hooks/useToastMessageContext';
import { useProjectContext } from '../../hooks/useProjectContext';
import { CloseButton } from '../SharedUI/CloseButton/CloseButton';
import { StatusSelect } from './StatusSelect/StatusSelect';
import { StatusOption } from '../../interfaces/status-options.type';
import { StatusName } from '../../interfaces/parcel-status-name.type';
import { ParcelInfo } from '../../interfaces/parcel-info.interface';
import { UpdateParcel } from '../../interfaces/update-parcel.interface';
import { updateParcel } from '../../services/parcelsService';

const parcelStatusOptions: StatusOption[] = [
  { name: StatusName.APPROVED, color: 'Approved' },
  { name: StatusName.REJECTED, color: 'Rejected' },
  { name: StatusName.WARNING, color: 'Warning' },
  { name: StatusName.OPEN, color: 'Open' },
  { name: StatusName.IRRELEVANT, color: 'Irrelevant' }
];

export const ParcelList = ({ isParcelListShown, handleToggleParcelList }: ParcelListProps) => {
  const { parcels, setParcelsCtx, projectId, lines, setLinesCtx } = useProjectContext();
  const { addToastMessage } = useToastMessageContext();
  const [isLoading, setIsLoading] = useState(false);

  // const options = ['Approved', 'Rejected', 'Warning', 'Irrelevant'];

  const updateParcelData = async (parcelId: string, field: string, value: string) => {
    if (!value) {
      return;
    }
    setIsLoading(true);
    const data = { [field]: value } as UpdateParcel;
    try {
      const response = await updateParcel(parcelId, data);
      if (response) {
        const updatedParcelsList = parcels.map((parcel) => {
          if (parcel.id === parcelId) {
            return { ...parcel, ...data };
          } else {
            return parcel;
          }
        });
        setParcelsCtx(updatedParcelsList);
        addToastMessage('Parcel successfully updated');
        setIsLoading(false);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        addToastMessage(error.message);
        setIsLoading(false);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'actions',
      width: 100,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <strong>
          <IconButton onClick={(e) => alert(JSON.stringify(params.row))}>
            {/* need new modal to show one parcel info with notes, photos etc */}
            <LaunchIcon />
          </IconButton>
          <IconButton onClick={(e) => alert(JSON.stringify(params.row))}>
            <DeleteOutlineIcon />
          </IconButton>
        </strong>
      )
    },
    { field: 'parcelNumber', headerName: 'Parcel number', width: 250 },
    { field: 'voivodeship', headerName: 'Voivodeship', width: 150 },
    { field: 'county', headerName: 'County', width: 150 },
    { field: 'commune', headerName: 'Commune', width: 150 },
    { field: 'KW', headerName: 'KW', width: 150, editable: true },
    { field: 'class', headerName: 'Class', width: 150, editable: true },
    {
      field: 'statusName',
      headerName: 'status',
      width: 100,
      renderCell: (params: GridRenderCellParams<ParcelInfo>) => (
        <StatusSelect
          options={parcelStatusOptions}
          // handleOnClick={(e) => console.log(params, e.target.value)}
          handleOnClick={(e) => updateParcelData(String(params.id), params.field, e.target.value)}
          params={params}
        />
      )
    }
  ];

  return (
    <Modal
      open={isParcelListShown}
      onClose={handleToggleParcelList}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.container}>
        <CloseButton handleClick={handleToggleParcelList} />
        <div className={styles.list}>
          {isLoading && 'Loading...'}
          <DataGrid
            getRowClassName={(params) => {
              const currentColor = parcelStatusOptions.filter((status) => status.name === params.row.statusName)[0]
                .color;
              // return styles[`row_${params.row.statusName}`];
              return styles[`row_${currentColor}`];
            }}
            editMode="row"
            rows={parcels}
            columns={columns}
            onEditCellPropsChange={(params) => console.log(params)}
            sx={{
              // boxShadow: 2,
              // border: 2,
              // borderColor: 'primary.light',
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'primary.light'
              }
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

type ParcelListProps = {
  isParcelListShown: boolean;
  handleToggleParcelList: () => void;
};
