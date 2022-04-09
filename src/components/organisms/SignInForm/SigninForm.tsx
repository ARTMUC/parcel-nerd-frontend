import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaGlobeEurope } from 'react-icons/fa';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useToastMessageContext } from '../../../hooks/useToastMessageContext';
import { LoginData } from '../../../interfaces/login-data.interface.';
import { loginUser } from '../../../services/authService';
import { FormButton } from '../../atoms/FormButton/FormButton';
import { LoadingCircle } from '../../atoms/LoadingCircle/LoadingCircle';
import { InputWithError } from '../../molecules/InputWithError/InputWithError';

import styles from './SigninForm.module.css';

export const SigninForm = () => {

    const { addToastMessage } = useToastMessageContext();
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
    const { addUserContext } = useAuthContext()

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        setIsLoading(true)

        const response = await loginUser(data)

        if (!response) { return }

        addToastMessage(`You've signed in successfully.`);
        addUserContext(response)

        window.location.href = "http://localhost:3001"

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



