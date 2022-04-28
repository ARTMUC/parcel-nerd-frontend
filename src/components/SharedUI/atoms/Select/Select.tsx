import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './Select.module.css';


export const Select = ({  options, register }: SelectProps) => {
    return (
        <select className={styles.select} {...register}>
            {options && options.map((option: Option, index: number) => <option key={option.id} value={option.id}>{option.text}</option>)}
        </select>
    );
}

type Option ={
id: string,
text:string
}

type SelectProps = {
options: Option[] | null,
register:UseFormRegisterReturn
}
