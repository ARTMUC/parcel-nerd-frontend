import React from 'react';
import styles from './FormInput.module.css';


export const FormInput = (props: any) => {
    const { register, ...rest } = props
    return (
        <input className={styles.input} {...rest} {...register} />
    );
}