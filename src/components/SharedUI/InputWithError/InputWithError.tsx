import React from 'react';
import { FieldError, FieldValues, UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';
import { ErrorMessage } from '../Error/ErrorMessage';
import { FormInput } from '../Input/FormInput';
import styles from './InputWithError.module.css';

export const InputWithError = (props: InputWithErrorProps) => {
  const { error, ...rest } = props;
  return (
    <section className={styles.container}>
      <FormInput {...rest} />
      <div>{error && <ErrorMessage {...error} />}</div>
    </section>
  );
};

type InputWithErrorProps = {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
};
