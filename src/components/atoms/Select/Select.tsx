import React from 'react';
import styles from './FormInput.module.css';


export const FormInput = (props: any) => {
    const { register, ...rest } = props
    return (
        <input type='select' className={styles.input} {...rest} {...register} />
    );
}