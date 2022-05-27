// rscp
import React, { useState } from 'react';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './LinesList.module.css';
import { useProjectContext } from '../../../hooks/useProjectContext';
import { Line } from '../../../interfaces/line.type';

export const LinesList = ({ lines, handleDeletePipeCoord }: LineListProps) => {
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
                onClick={() => handleDeletePipeCoord(line.id)}
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
  handleDeletePipeCoord: (id: string) => void;
};
