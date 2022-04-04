import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { FaGlobeEurope } from 'react-icons/fa';
import useToastMessageContext from '../../../hooks/useToastMessageContext';
import { RegisterData } from '../../../interfaces/register-data.interface';
import { User } from '../../../interfaces/user.interface';
import { registerUser } from '../../../services/authService';
import { FormButton } from '../../atoms/FormButton/FormButton';
import { LoadingCircle } from '../../atoms/LoadingCircle/LoadingCircle';
import { InputWithError } from '../../molecules/InputWithError/InputWithError';

import styles from './SignupForm.module.css';


export const SignupForm = () => {

    // const [messages, setMessages] = useState<{
    //     id: number;
    //     value: string;
    // }[]>([])
    const { addToastMessage } = useToastMessageContext();
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>();


    const onSubmit: SubmitHandler<RegisterData> = async (data) => {
        setIsLoading(true)
        const response = await registerUser(data)

        if ((response as User).email) {
            addToastMessage(`You've signed up successfully. We've sent you an email with activation link.`);
        } if (typeof response === 'string') {
            addToastMessage(response)
        }
        setIsLoading(false)
    }



    // const addToastMessage = (message: string) => {
    //     setMessages([{
    //         id: new Date().getTime(),
    //         value: message
    //     }]);
    // }

    // const removeToastMessage = (id: number) => {
    //     setMessages((prevState) => {
    //         return prevState.filter((message) => message.id !== id)
    //     })
    // }




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

            <InputWithError type="text" placeholder="Name" register={{ ...register("name", { required: 'This field is required' }) }} error={errors.name} />

            <InputWithError type="password" placeholder="Password" register={{ ...register("password", { required: 'This field is required', min: 3 }) }} error={errors.password} />

            <InputWithError type="password" placeholder="Repeat Password" register={{ ...register("repeatPassword", { required: 'This field is required', min: 3 }) }} error={errors.repeatPassword} />

            {isLoading ? <LoadingCircle /> : <FormButton type="submit" value='register' />}

        </form>
    );
}

