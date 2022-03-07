// rscp
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Hub.module.css';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MapIcon from '@mui/icons-material/Map';
import LayersIcon from '@mui/icons-material/Layers';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

export const Hub = ({ toggleCheckBounds, toggleWMSDisplay, isCheckingBounds, handleTogglePipeEdit, isPipeEdit, isWmsShown, isParcelListShown, handleToggleParcelList }: HubProps) => {
    return (
        <ul className={styles.container}>
            <Fab color={isPipeEdit ? "secondary" : "primary"} variant="extended" onClick={handleTogglePipeEdit}>
                <DriveFileRenameOutlineIcon />
                Add pipelines
            </Fab>
            <Fab color={isCheckingBounds ? "secondary" : "primary"} variant="extended" onClick={toggleCheckBounds}>
                <AddLocationAltIcon />
                Add Parcel
            </Fab>
            <Fab color={isParcelListShown ? "secondary" : "primary"} variant="extended" onClick={handleToggleParcelList}>
                <MapIcon sx={{ mr: 1 }} />
                Parcel List
            </Fab>
            <Fab color={isParcelListShown ? "secondary" : "primary"} variant="extended" onClick={handleToggleParcelList}>
                <PeopleOutlineIcon sx={{ mr: 1 }} />
                Owners List
            </Fab>
            <Fab color={isWmsShown ? "secondary" : "primary"} variant="extended" onClick={toggleWMSDisplay}>
                <LayersIcon />
                Geoportal Layer
            </Fab>
        </ul >
    );
};

type HubProps = {
    toggleCheckBounds: () => void,
    toggleWMSDisplay: () => void,
    isCheckingBounds: boolean,
    handleTogglePipeEdit: () => void;
    isPipeEdit: boolean;
    isWmsShown: boolean;
    isParcelListShown: boolean;
    handleToggleParcelList: () => void;
};

