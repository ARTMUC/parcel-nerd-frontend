import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaGlobeEurope } from 'react-icons/fa';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useToastMessageContext } from '../../../hooks/useToastMessageContext';
import { LoginData } from '../../../interfaces/login-data.interface.';
import { loginUser } from '../../../services/authService';
import { FormButton } from '../../atoms/FormButton/FormButton';
import { LoadingCircle } from '../../atoms/LoadingCircle/LoadingCircle';
import { Select } from '../../atoms/Select/Select';
import { InputWithError } from '../../molecules/InputWithError/InputWithError';

import styles from './ProjectSelectScreen.module.css';

export const ProjectSelectScreen = () => {

    const { addToastMessage } = useToastMessageContext();
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
    const { addUserContext } = useAuthContext()

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        setIsLoading(true)

        setIsLoading(false)
    }


    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <Select></Select>

        </form>
    );
}



