// rscp
import React, { useState } from 'react';

import { Box, Modal } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Lines.module.css';
import { LineCoordinates } from '../../../interfaces/line-coordinates.type';
import { useProjectContext } from '../../../hooks/useProjectContext';
import { LinesList } from '../LinesList/LinesList';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AddLine } from '../AddLine/AddLine';

export const Lines = ({ handleTogglePipeEdit, isPipeEdit }: LineProps) => {
  const { lines, setLinesCtx } = useProjectContext();

  const handleDeletePipeCoord = (e: { target: { dataset: { index: string } } }) => {
    // const elementIndex = e.target.dataset.index;
    // setPipeCoords((prev) => {
    //     return prev.filter((el, index) => +elementIndex !== index)
    // })
  };

  return (
    <Modal
      open={isPipeEdit}
      onClose={handleTogglePipeEdit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <div className={styles.container}>
          <div className={styles.button_close}>
            <IconButton onClick={handleTogglePipeEdit} color="secondary" aria-label="add an alarm">
              <CloseIcon fontSize="large" />
            </IconButton>
          </div>
          <AddLine />
          <LinesList lines={lines} />
        </div>
      </Box>
    </Modal>
  );
};

type LineProps = {
  handleTogglePipeEdit: () => void;
  isPipeEdit: boolean;
};
