import React from 'react';
import styles from './FormButton.module.css';


export const FormButton = (props: any) => {
    return (
        <input className={styles.button} {...props} />
    );
}