// rscp
import React, { useState } from 'react';

import { Box, Modal, TextareaAutosize, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ButtonGroup from '@mui/material/ButtonGroup';
import styles from './Lines.module.css';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { LineCoordinates } from '../../interfaces/line-coordinates.type';
import { useProjectContext } from '../../hooks/useProjectContext';

export const Lines = ({ handleTogglePipeEdit, isPipeEdit }: PipeLineProps) => {
  const [acadPoints, setAcadPoints] = useState('');
  const { lines, setLinesCtx } = useProjectContext();

  const parseInput = (string: string) => {
    const r = /[X]=[0-9]*\.[0-9]+\s*[Y]=[0-9]*\.[0-9]+/g;
    const r2 = /[0-9]*\.[0-9]+/g;
    setAcadPoints('');
    return [...string.matchAll(r)].map((e) => {
      const arr = [...e[0].matchAll(r2)];
      return [Number(...arr[0]), Number(...arr[1])];
    });
  };

  // const parseInput = (string: string) => {
  //   const r = /[X]=[0-9]*\.[0-9]+\s*[Y]=[0-9]*\.[0-9]+/g;
  //   const r2 = /[0-9]*\.[0-9]+/g;
  //   setAcadPoints('');
  //   return [...string.matchAll(r)].map((e) => {
  //     const arr = [...e[0].matchAll(r2)];
  //     return [Number(...arr[0]), Number(...arr[1])] as LineCoordinates;
  //   }) as LineCoordinates[];
  // };

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
          <TextField
            id="outlined-multiline-flexible"
            label="Pipe Coordinates"
            multiline
            minRows="3"
            maxRows="3"
            placeholder='Example input. You can copy coords from CAD "list" method :
                        at point  X=6537790.941  Y=5545664.794  Z=   10.260
                        at point  X=6537795.174  Y=5545664.985  Z=   10.260
                  '
            value={acadPoints}
            onChange={(e) => setAcadPoints(e.target.value)}
            variant="outlined"
            style={{ minWidth: 500, maxWidth: 500 }}
          />
          {/* {
            <ul className={styles.pipe_list}>
              {pipeCoords.length > 0 &&
                pipeCoords.map((coords: any, index: any) => {
                  return (
                    <li key={index} className={styles.list_element}>
                      <ul>
                        {coords.map((e: any, index: React.Key | null | undefined) => (
                          <li key={index}>
                            X={e[0]}, Y={e[1]}
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="outlined"
                        data-index={index}
                        // onClick={(e) => handleDeletePipeCoord(e)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </li>
                  );
                })}
            </ul>
          } */}
          <ButtonGroup className={styles.btn_container} size="large" aria-label="large button group">
            {/* <Button variant="contained" onClick={() => handleAddNewPipeCoord(parseInput(acadPoints))}>
              ADD NEW
            </Button> */}
            {/* <Button variant="contained" onClick={() => handleDrawPipes()}>DRAW PIPES</Button> */}
            {/* <Button >CHECK PARCELS</Button> */}
          </ButtonGroup>
        </div>
      </Box>
    </Modal>
  );
};

type PipeLineProps = {
  handleTogglePipeEdit: () => void;
  isPipeEdit: boolean;
  handleAddNewPipeCoord: (coords: LineCoordinates[]) => void;
  handleDeletePipeCoord: (e: any) => void;
};
