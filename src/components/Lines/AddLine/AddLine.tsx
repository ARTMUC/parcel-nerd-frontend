import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import styles from './AddLine.module.css';
import { LineCoordinates } from '../../../interfaces/line-coordinates.type';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { addLine } from '../../../services/linesService';
import { CreateLine } from '../../../interfaces/createLine.type';
import { useProjectContext } from '../../../hooks/useProjectContext';
import { useState } from 'react';
import { useToastMessageContext } from '../../../hooks/useToastMessageContext';

const coordSystems = [
  'EPSG:2180',
  'EPSG:4326',
  'EPSG:2177',
  'EPSG:2179',
  'EPSG:2176',
  'EPSG:3120',
  'EPSG:2178',
  'EPSG:2174',
  'EPSG:2173',
  'EPSG:2172',
  'EPSG:2175',
  'EPSG:3328'
];

interface CreateLinesForm {
  title: string;
  lineCoords: string;
  system: string;
}

export const AddLine = () => {
  const { projectId, lines, setLinesCtx } = useProjectContext();
  const [isLoading, setIsLoading] = useState(false);
  const { addToastMessage } = useToastMessageContext();

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
    const parsedLineCoords = parseInput(data.lineCoords);
    setIsLoading(true);
    const newLine = await handleAddNewPipeCoord({
      ...data,
      lineCoords: parsedLineCoords
    });
    if (!lines || !newLine) {
      return;
    }
    setLinesCtx([...lines, newLine]);
    addToastMessage('New line added succesfully');
    setIsLoading(false);
  };

  const handleAddNewPipeCoord = async (lineData: CreateLine) => {
    try {
      if (!projectId) {
        addToastMessage('Error');
        return;
      }
      const newLine = await addLine(lineData, projectId);
      if (!newLine) {
        addToastMessage('Failed adding new line.');
        return;
      }
      return newLine;
    } catch (error: unknown) {
      if (error instanceof Error) {
        addToastMessage(error.message);
        setIsLoading(false);
      }
    }
  };

  return (
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
            className={styles.item1}
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
            className={styles.item2}
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
      <Controller
        control={control}
        name="system"
        rules={{ required: 'This field is required' }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState
        }) => (
          <FormControl className={styles.item3}>
            <InputLabel id="demo-simple-select-label">System</InputLabel>
            <Select
              error={invalid}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value || ''}
              label="system"
              onChange={onChange}
            >
              {coordSystems.map((system) => (
                <MenuItem key={system} value={system}>
                  {system}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" type="submit" className={styles.item4}>
          ADD NEW
        </Button>
      )}
    </form>
  );
};
