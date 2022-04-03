import React from 'react';
import { FieldValues, SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { FaGlobeEurope } from 'react-icons/fa';
import { RegisterData } from '../../../interfaces/register-data.interface';
import { FormButton } from '../../atoms/FormButton/FormButton';
import { LoadingCircle } from '../../atoms/LoadingCircle/LoadingCircle';
import { InputWithError } from '../../molecules/InputWithError/InputWithError';

import styles from './AuthForm.module.css';


export const AuthForm = (props: AuthFormProps) => {

    const { handleSubmit, register, errors, formFields, isLoading } = props

    return (
        <form className={styles.form} onSubmit={handleSubmit}>

            <FaGlobeEurope className={styles.icon} />

            {formFields.map((field: any) => {
                const { type, fieldName, options } = field

                return <InputWithError type={type} placeholder={fieldName}
                    register={{ ...register(fieldName, options) }} error={errors[fieldName]} />
            })}

            {isLoading ? <LoadingCircle /> : <FormButton type="submit" value='register' />}

        </form>
    );
}

type AuthFormProps = {
    handleSubmit: any,
    register: any,
    errors: any
    formFields: any,
    isLoading: boolean
};
