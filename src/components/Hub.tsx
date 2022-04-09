// rscp
import styles from './Hub.module.css';
import { Fab } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import MapIcon from '@mui/icons-material/Map';
import LayersIcon from '@mui/icons-material/Layers';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { logoutUser } from '../services/authService';
import { useAuthContext } from '../hooks/useAuthContext';

export const Hub = ({ toggleCheckBounds, toggleWMSDisplay, isCheckingBounds, handleTogglePipeEdit, isPipeEdit, isWmsShown, isParcelListShown, handleToggleParcelList, handleToggleOwnersList, isOwnersListShown }: HubProps) => {

    const authCtx = useAuthContext()

    const logout = () => {
        logoutUser()
        authCtx.removeUserContext()
        window.location.href = "http://localhost:3001/signin"
    }


    return (
        <ul className={styles.container}>
            <Fab color={isPipeEdit ? "secondary" : "primary"} variant="extended" onClick={handleTogglePipeEdit}>
                <DriveFileRenameOutlineIcon />
                Change project
            </Fab>
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
            <Fab color={isOwnersListShown ? "secondary" : "primary"} variant="extended" onClick={handleToggleOwnersList}>
                <PeopleOutlineIcon sx={{ mr: 1 }} />
                Owners List
            </Fab>
            <Fab color={isWmsShown ? "secondary" : "primary"} variant="extended" onClick={toggleWMSDisplay}>
                <LayersIcon />
                Geoportal Layer
            </Fab>
            <Fab color={isPipeEdit ? "secondary" : "primary"} variant="extended" onClick={logout}>
                <DriveFileRenameOutlineIcon />
                Logout
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
    handleToggleOwnersList: () => void;
    isOwnersListShown: boolean
};

