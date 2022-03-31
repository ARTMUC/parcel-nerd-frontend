import React from 'react';
import { useForm } from 'react-hook-form';
import { FaGlobeEurope } from 'react-icons/fa';
import { FormButton } from '../atoms/FormButton/FormButton';
import { InputWithError } from '../molecules/InputWithError/InputWithError';
import styles from './AuthForm.module.css';


export const AuthForm = (props: any) => {

    const { handleSubmit, onSubmit, register, errors } = props

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

            <FaGlobeEurope className={styles.icon} />

            <InputWithError type="text" placeholder="Email" register={{ ...register("Email", { required: 'Please provide valid email', pattern: /^\S+@\S+$/i }) }} error={errors.Email} />

            <InputWithError type="text" placeholder="Name" register={{ ...register("Name", { required: 'This field is required' }) }} error={errors.Name} />

            <InputWithError type="password" placeholder="Password" register={{ ...register("Password", { required: 'This field is required', min: 3 }) }} error={errors.Password} />

            <InputWithError type="password" placeholder="Repeat Password" register={{ ...register("RepeatPassword", { required: 'This field is required', min: 3 }) }} error={errors.RepeatPassword} />

            <FormButton type="submit" value='register' />
        </form>
    );
}