import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './DataGridSelect.module.css';
import { ChangeEvent, useState } from 'react';
import { StatusOption } from '../../../../interfaces/status-options.type';
import { GridRenderCellParams } from '@mui/x-data-grid';

export const DataGridSelect = ({ handleOnClick, options, params }: DataGridSelectProps) => {
  const [optionValue, setOptionValue] = useState<StatusOption>({});

  const click = (e: ChangeEvent<HTMLSelectElement>) => {
    handleOnClick(e);
    const name = e.target.value;
    const color = e.target.options[e.target.selectedIndex].dataset.color;
    if (!color) {
      return;
    }
    setOptionValue({ name, color });
  };

  return (
    // <select className={styles.select} onChange={(e) => handleOnClick(e)}>

    <select style={{ backgroundColor: optionValue?.color }} className={styles.select} onChange={(e) => click(e)}>
      <option value="" selected disabled hidden>
        Choose
      </option>
      {options.map((option, index) => (
        <option key={index} data-color={option.color} value={option.name} style={{ backgroundColor: option.color }}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

type DataGridSelectProps = {
  handleOnClick: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: StatusOption[];
  params: GridRenderCellParams<string>;
};
