import { ChangeEvent, useState } from 'react';
import { StatusOption } from '../../../interfaces/status-options.type';
import { GridRenderCellParams } from '@mui/x-data-grid';
import { ParcelInfo } from '../../../interfaces/parcel-info.interface';
import { StatusName } from '../../../interfaces/parcel-status-name.type';
import styles from './StatusSelect.module.css';

export const StatusSelect = ({ handleOnClick, options, params }: StatusSelectProps) => {
  const initialOption = options.filter((option) => option.name === params.row.statusName);
  const [optionValue, setOptionValue] = useState<StatusOption>(initialOption[0]);

  const click = (e: ChangeEvent<HTMLSelectElement>) => {
    handleOnClick(e);
    const name = e.target.value as StatusName;
    const color = e.target.options[e.target.selectedIndex].dataset.color;
    if (!color) {
      return;
    }
    setOptionValue({ name, color });
  };

  return (
    <select
      value={optionValue.name}
      style={{ backgroundColor: optionValue?.color }}
      className={styles.select}
      onChange={(e) => click(e)}
    >
      {options.map((option, index) => (
        <option
          className={styles.option}
          key={index}
          data-color={option.color}
          value={option.name}
          style={{ backgroundColor: option.color }}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

type StatusSelectProps = {
  handleOnClick: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: StatusOption[];
  params: GridRenderCellParams<ParcelInfo>;
};
