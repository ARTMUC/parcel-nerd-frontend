import React from 'react';
import styles from './FormButton.module.css';

export const FormButton = (props: FormButtonProps) => {
  return <input className={styles.button} {...props} />;
};

type FormButtonProps = {
  type: string;
  value: string;
};
