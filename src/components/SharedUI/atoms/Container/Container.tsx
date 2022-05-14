import { FieldError } from 'react-hook-form';
import styles from './Container.module.css';

export const Container = ({ children }: ContainerProps) => {
  return <div className={styles.container}> {children} </div>;
};

type ContainerProps = {
  children: JSX.Element[] | JSX.Element;
};
