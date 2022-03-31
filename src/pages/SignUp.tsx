import React from 'react';
import { useForm } from 'react-hook-form';
import { FaGlobeEurope } from 'react-icons/fa';
import { InputWithError } from '../components/molecules/InputWithError/InputWithError';
import { AuthForm } from '../components/organisms/AuthForm';
import { RegisterData } from '../interfaces/register-data.interface';
import { registerUser } from '../services/authService';
import styles from './SignUp.module.css';


export const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: RegisterData) => registerUser(data)
    console.log(errors);

    return (
        <div className={styles.container} >
            <AuthForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} />
        </div>
    );
}