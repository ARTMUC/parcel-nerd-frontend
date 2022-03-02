// rscp
import React from 'react';
import PropTypes from 'prop-types';
import { LineCoordinates } from '../interfaces/line-coordinates.type';

import { Box, Modal, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ButtonGroup from '@mui/material/ButtonGroup';
import styles from './PipeLine.module.css';

export const PipeLine = ({ pipeCoords, handleAddNewPipeCoord, handleChangeCoord, handleDeleteCoord, fetchParcelsData, handleDrawPipes, handleTogglePipeEdit, isPipeEdit }: PipeLineProps) => {

    return (
        <Modal
            open={isPipeEdit}
            onClose={handleTogglePipeEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box >
                <div className={styles.container}>
                    <div className={styles.button_close}>
                        <IconButton onClick={handleTogglePipeEdit} color="secondary" aria-label="add an alarm">
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </div>
                    <ul className={styles.pipe_list}>
                        {pipeCoords.map((e, index) => {
                            return (
                                <li className={styles.list_element}>
                                    <TextField id="outlined-basic" label="x" variant="outlined" value={e[0]} data-index={index} data-axis={0} onChange={e => handleChangeCoord(e)} />
                                    <TextField id="outlined-basic" label="y" variant="outlined" value={e[1]} data-index={index} data-axis={1} onChange={e => handleChangeCoord(e)} />
                                    <Button variant="outlined" data-index={index} onClick={(e) => handleDeleteCoord(e)} startIcon={<DeleteIcon />}>
                                        Delete
                                    </Button>
                                </li>
                            )
                        })}
                    </ul>
                    <ButtonGroup className={styles.btn_container} size="large" aria-label="large button group">
                        <Button variant="contained" onClick={() => handleAddNewPipeCoord()} >ADD NEW</Button>
                        <Button variant="contained" onClick={() => handleDrawPipes()}>DRAW PIPES</Button>
                        <Button variant="contained" onClick={() => fetchParcelsData()}>CHECK PARCELS</Button>
                    </ButtonGroup>
                </div >
            </Box>
        </Modal>


    );
};

type PipeLineProps = {
    pipeCoords: LineCoordinates[];
    handleAddNewPipeCoord: () => void;
    handleChangeCoord: (e: any) => void;
    handleDeleteCoord: (e: any) => void;
    fetchParcelsData: () => Promise<void>;
    handleDrawPipes: () => Promise<void>;
    handleTogglePipeEdit: () => void;
    isPipeEdit: boolean
};

