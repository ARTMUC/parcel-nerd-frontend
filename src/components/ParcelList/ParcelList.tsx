import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import styles from './ParcelList.module.css';
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
import { useToastMessageContext } from '../../hooks/useToastMessageContext';
import { useProjectContext } from '../../hooks/useProjectContext';
import { CloseButton } from '../SharedUI/atoms/CloseButton/CloseButton';
import { DataGridSelect } from '../SharedUI/atoms/DataGridSelect/DataGridSelect';
import { StatusOption } from '../../interfaces/status-options.type';

export const ParcelList = ({ isParcelListShown, handleToggleParcelList }: ParcelListProps) => {
  const { parcels, projectId, lines, setLinesCtx } = useProjectContext();
  const { addToastMessage } = useToastMessageContext();

  // const options = ['Approved', 'Rejected', 'Warning', 'Irrelevant'];
  const parcelStatusOptions: StatusOption[] = [
    { name: 'Approved', color: 'green' },
    { name: 'Rejected', color: 'red' },
    { name: 'Warning', color: 'yellow' },
    { name: 'Irrelevant', color: 'grey' }
  ];

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
      field: 'status',
      headerName: 'status',
      width: 100,
      renderCell: (params: GridRenderCellParams<string>) => (
        <DataGridSelect
          options={parcelStatusOptions}
          handleOnClick={(e) => console.log(params.id, e.target.value)}
          params={params}
        />
        // <select onChange={(e) => console.log(params.id, e.target.value)}>
        //   {options.map((status) => (
        //     <option key={status} value={status}>
        //       {status}
        //     </option>
        //   ))}
        // </select>
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
          <DataGrid
            editMode="row"
            rows={parcels}
            columns={columns}
            onEditCellPropsChange={(params) => console.log(params)}
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
