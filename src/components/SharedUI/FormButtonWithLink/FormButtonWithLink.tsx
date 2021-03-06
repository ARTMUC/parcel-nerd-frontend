import { type } from 'os';
import React from 'react';
import { FormButton } from '../FormButton/FormButton';
import { CustomLink } from '../Link/CustomLink';
import { LoadingCircle } from '../LoadingCircle/LoadingCircle';

import styles from './FormButtonWithLink.module.css';

export const FormButtonWithLink = ({ type, value, to, text, linkText, isLoading }: FormButtonWithLinkProps) => {
  return (
    <div className={styles.container}>
      {isLoading ? <LoadingCircle /> : <FormButton type={type} value={value}></FormButton>}
      <CustomLink to={to} text={text} linkText={linkText}></CustomLink>
    </div>
  );
};

type FormButtonWithLinkProps = {
  type: string;
  value: string;
  to: string;
  text: string;
  isLoading: boolean;
  linkText: string;
};
