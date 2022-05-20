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
import { LineCoordinates } from '../../../interfaces/line-coordinates.type';
import { useProjectContext } from '../../../hooks/useProjectContext';
import { LinesList } from '../LinesList/LinesList';
import { addLine } from '../../../services/linesService';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateLine } from '../../../interfaces/createLine.type';

export const Lines = ({ handleTogglePipeEdit, isPipeEdit }: LineProps) => {
  // const [acadPoints, setAcadPoints] = useState('');
  const { lines, setLinesCtx } = useProjectContext();

  interface CreateLinesForm {
    title: string;
    lineCoords: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<CreateLinesForm>();

  const parseInput = (string: string): LineCoordinates[] => {
    const r = /[X]=[0-9]*\.[0-9]+\s*[Y]=[0-9]*\.[0-9]+/g;
    const r2 = /[0-9]*\.[0-9]+/g;
    return [...string.matchAll(r)].map((e) => {
      const arr = [...e[0].matchAll(r2)];
      return { x: Number(...arr[0]), y: Number(...arr[1]) };
    });
  };

  const onSubmit: SubmitHandler<CreateLinesForm> = async (data) => {
    console.log(parseInput(data.lineCoords));
    console.log(data.title);
    handleAddNewPipeCoord(parseInput(data.lineCoords));
  };

  // console.log('Errors:', errors);

  const handleAddNewPipeCoord = async (coords: LineCoordinates[]) => {
    // const newLine = addLine()
    // setIsLoading(true)
    // const pipeConvertedCoords = await convertToDeg(coords)
    // setPipeCoords(prev => [...prev, pipeConvertedCoords])
    // setIsLoading(false)
  };

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
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              rules={{ required: 'This field is required' }}
              name="title"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState
              }) => (
                <TextField
                  error={invalid}
                  id="outlined-multiline-flexible"
                  label="Title"
                  multiline
                  minRows="1"
                  maxRows="3"
                  placeholder="Please type Title"
                  onBlur={onBlur}
                  onChange={onChange}
                  variant="outlined"
                  style={{ minWidth: 500, maxWidth: 500 }}
                />
              )}
            />
            <Controller
              control={control}
              name="lineCoords"
              rules={{ required: 'This field is required' }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState
              }) => (
                <TextField
                  error={invalid}
                  id="outlined-multiline-flexible"
                  label="Pipe Coordinates"
                  multiline
                  minRows="3"
                  maxRows="3"
                  placeholder='Example input. You can copy coords from CAD "list" method :
                at point  X=6537790.941  Y=5545664.794  Z=   10.260
                at point  X=6537795.174  Y=5545664.985  Z=   10.260
          '
                  onBlur={onBlur}
                  onChange={onChange}
                  variant="outlined"
                  style={{ minWidth: 500, maxWidth: 500 }}
                />
              )}
            />
            <Button variant="contained" type="submit">
              ADD NEW
            </Button>
          </form>
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
