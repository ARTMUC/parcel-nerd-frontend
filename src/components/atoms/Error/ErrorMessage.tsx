import React from 'react';
import { useForm } from 'react-hook-form';
import { FaGlobeEurope } from 'react-icons/fa';
import styles from './ErrorMessage.module.css';


export const ErrorMessage = (props: { message: string }) => {
    return (
        <p className={styles.alert}>{props.message}</p>
    );
}