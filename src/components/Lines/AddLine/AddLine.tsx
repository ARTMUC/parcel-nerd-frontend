import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import styles from './AddLine.module.css';
import { LineCoordinates } from '../../../interfaces/line-coordinates.type';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export const AddLine = () => {
  interface CreateLinesForm {
    title: string;
    lineCoords: string;
    system: number;
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
    console.log(data.title, data.system, data.lineCoords);
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
      <Controller
        control={control}
        name="system"
        rules={{ required: 'This field is required' }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState
        }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value || 10}
              label="Age"
              onChange={onChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Button variant="contained" type="submit">
        ADD NEW
      </Button>
    </form>
  );
};