import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { FaGlobeEurope } from 'react-icons/fa';
import useToastMessageContext from '../../../hooks/useToastMessageContext';
import { LoginData } from '../../../interfaces/login-data.interface.';
import { RegisterData } from '../../../interfaces/register-data.interface';
import { User } from '../../../interfaces/user.interface';
import { loginUser, registerUser } from '../../../services/authService';
import { FormButton } from '../../atoms/FormButton/FormButton';
import { LoadingCircle } from '../../atoms/LoadingCircle/LoadingCircle';
import { InputWithError } from '../../molecules/InputWithError/InputWithError';

import styles from './SigninForm.module.css';


export const SigninForm = ({ handleLogin }: SigninFormProps) => {

    const { addToastMessage } = useToastMessageContext();
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();


    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        setIsLoading(true)
        const response = await loginUser(data)

        if ((response as User).email) {
            addToastMessage(`You've signed in successfully.`);
            handleLogin(response)
            window.location.href = "http://localhost:3001"
        } if (typeof response === 'string') {
            addToastMessage(response)
        }
        setIsLoading(false)
    }


    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

            <FaGlobeEurope className={styles.icon} />

            <InputWithError type="text" placeholder="Email" register={{
                ...register("email", {
                    required: 'Please provide valid email', pattern: {
                        value: /^\S+@\S+$/i, message: "Invalid email address"
                    }
                })
            }} error={errors.email} />

            <InputWithError type="password" placeholder="Password" register={{ ...register("password", { required: 'This field is required', min: 3 }) }} error={errors.password} />
            <div></div>
            <div></div>
            {isLoading ? <LoadingCircle /> : <FormButton type="submit" value='login' />}

        </form>
    );
}

type SigninFormProps = {
    handleLogin: (data: User) => void
}

