// rscp
import React, { useState } from 'react';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './LinesList.module.css';
import { useProjectContext } from '../../../hooks/useProjectContext';
import { Line } from '../../../interfaces/line.type';

export const LinesList = ({ lines }: LineListProps) => {
  const handleDeletePipeCoord = (e: { target: { dataset: { index: string } } }) => {
    // const elementIndex = e.target.dataset.index;
    // setPipeCoords((prev) => {
    //     return prev.filter((el, index) => +elementIndex !== index)
    // })
  };

  return (
    <ul className={styles.pipe_list}>
      {lines.length > 0 &&
        lines.map((line) => {
          return (
            <li key={line.id} className={styles.list_element}>
              <p>{line.title}</p>
              <Button
                variant="outlined"
                data-index={line.id}
                // onClick={(e) => handleDeletePipeCoord(e)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </li>
          );
        })}
    </ul>
  );
};

type LineListProps = {
  lines: Line[];
};
