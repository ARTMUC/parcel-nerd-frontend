import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, InputLabel, MenuItem, Modal, Select } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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

export const ParcelList = ({ isParcelListShown, handleToggleParcelList }: ParcelListProps) => {
  const { parcels, projectId, lines, setLinesCtx } = useProjectContext();
  const { addToastMessage } = useToastMessageContext();

  const options = ['done', 'problems', 'warning'];

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
    { field: 'parcelNumber', headerName: 'Parcel number', width: 300 },
    { field: 'voivodeship', headerName: 'Voivodeship', width: 150 },
    { field: 'county', headerName: 'County', width: 150 },
    { field: 'commune', headerName: 'Commune', width: 150 },
    { field: 'KW', headerName: 'KW', width: 150, editable: true },
    { field: 'class', headerName: 'Class', width: 150, editable: true },
    {
      field: 'status',
      headerName: 'status',
      width: 100,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <div>
          {/* <InputLabel id="demo-simple-select-label">System</InputLabel> */}
          <Select
            defaultValue={'true'}
            // error={invalid}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={value || ''}
            label="system"
            // onChange={onChange}
          >
            {options.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </div>
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
        <div className={styles.button_close}>
          <IconButton onClick={handleToggleParcelList} color="secondary">
            <CloseIcon fontSize="large" />
          </IconButton>
        </div>
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
