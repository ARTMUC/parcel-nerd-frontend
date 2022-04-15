import React from 'react';
import styles from './Select.module.css';


export const Select = ({ name, options, register }: any) => {
    return (
        <select classNmae={styles.select} name={name} {...register}>
            {options && options.map((option: string, index: number) => <option key={index} value={option}>{option}</option>)}
        </select>
    );
}