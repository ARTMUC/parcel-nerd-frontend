import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthForm } from '../components/organisms/AuthForm/AuthForm';

import { ToastMessageList } from '../components/organisms/ToastMessagesList/ToastMessageList';
import { RegisterData } from '../interfaces/register-data.interface';
import { User } from '../interfaces/user.interface';
import { registerUser } from '../services/authService';
import styles from './SignUp.module.css';


export const SignUp = () => {
    const [messages, setMessages] = useState<{
        id: number;
        value: string;
    }[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>();


    const onSubmit: SubmitHandler<RegisterData> = async (data) => {
        setIsLoading(true)
        const response = await registerUser(data)

        if (response as User) {
            addToastMessage(`You've signed up successfully. We've sent you an email with activation link.`);
        }
        // const message = response.email ? successMessage : response
        // addToastMessage(message);
        setIsLoading(false)
    }

    const addToastMessage = (message: string) => {
        setMessages([{
            id: new Date().getTime(),
            value: message
        }]);
    }

    const removeToastMessage = (id: number) => {
        setMessages((prevState) => {
            return prevState.filter((message) => message.id !== id)
        })
    }

    const formFields = [
        {
            type: 'text', fieldName: 'email', options: {
                required: 'This field is required', pattern: {
                    value: /^\S+@\S+$/i, message: "Invalid email address"
                }
            }
        },
        { type: 'text', fieldName: 'name', options: { required: 'This field is required' } },
        { type: 'password', fieldName: 'password', options: { required: 'This field is required', min: 7 } },
        { type: 'password', fieldName: 'repeatPassword', options: { required: 'This field is required', min: 7 } }
    ]

    return (
        <div className={styles.container} >
            <AuthForm register={register} handleSubmit={handleSubmit(onSubmit)}
                errors={errors} formFields={formFields} isLoading={isLoading} />
            <ToastMessageList messages={messages} removeToastMessage={removeToastMessage} />
        </div>
    );
}





