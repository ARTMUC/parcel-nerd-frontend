import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './FormInput.module.css';

export const FormInput = (props: FormInputProps) => {
  const { register, ...rest } = props;
  return <input className={styles.input} {...rest} {...register} />;
};

type FormInputProps = {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
};
