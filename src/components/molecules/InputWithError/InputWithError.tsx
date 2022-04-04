import React from 'react';
import { ErrorMessage } from '../../atoms/Error/ErrorMessage';
import { FormInput } from '../../atoms/Input/FormInput';
import styles from './InputWithError.module.css';


export const InputWithError = (props: { [x: string]: any; error: any; }) => {
    const { error, ...rest } = props
    return (
        <section className={styles.container}>
            <FormInput {...rest} />
            <div>{error && <ErrorMessage {...error} />}
            </div>
        </section>



    );
}