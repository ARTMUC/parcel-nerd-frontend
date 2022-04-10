import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { FaGlobeEurope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useToastMessageContext } from '../../../hooks/useToastMessageContext';
import { RegisterData } from '../../../interfaces/register-data.interface';
import { User } from '../../../interfaces/user.interface';
import { registerUser } from '../../../services/authService';
import { FormButton } from '../../atoms/FormButton/FormButton';
import { IconGlobe } from '../../atoms/IconGlobe/IconGlobe';
import { LoadingCircle } from '../../atoms/LoadingCircle/LoadingCircle';
import { FormButtonWithLink } from '../../molecules/FormButtonWithLink/FormButtonWithLink';
import { InputWithError } from '../../molecules/InputWithError/InputWithError';

import styles from './SignupForm.module.css';


export const SignupForm = () => {

    const { addToastMessage } = useToastMessageContext();
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<RegisterData> = async (data) => {
        try {
            setIsLoading(true)
            const response = await registerUser(data)
            if (!response) { return }
            addToastMessage(`You've signed up successfully. We've sent you an email with activation link.`);
            setIsLoading(false)
            navigate("../signin", { replace: true });
        } catch (error: unknown) {
            if (error instanceof Error) {
                addToastMessage(error.message)
                setIsLoading(false)
            }
        }
    }


    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

            <IconGlobe />

            <InputWithError type="text" placeholder="Email" register={{
                ...register("email", {
                    required: 'Please provide valid email', pattern: {
                        value: /^\S+@\S+$/i, message: "Invalid email address"
                    }
                })
            }} error={errors.email} />

            <InputWithError type="text" placeholder="Name" register={{ ...register("name", { required: 'This field is required' }) }} error={errors.name} />

            <InputWithError type="password" placeholder="Password" register={{ ...register("password", { required: 'This field is required', min: 3 }) }} error={errors.password} />

            <InputWithError type="password" placeholder="Repeat Password" register={{ ...register("repeatPassword", { required: 'This field is required', min: 3 }) }} error={errors.repeatPassword} />

            <FormButtonWithLink type='submit' value='register' to='/signin' text='If you already have an account please' linkText='sign in here' isLoading={isLoading} />

        </form>
    );
}

