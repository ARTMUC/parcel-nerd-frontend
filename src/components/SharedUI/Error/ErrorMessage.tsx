import React from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { FaGlobeEurope } from 'react-icons/fa';
import styles from './ErrorMessage.module.css';

export const ErrorMessage = (props: FieldError) => {
  return <p className={styles.alert}>{props.message}</p>;
};
