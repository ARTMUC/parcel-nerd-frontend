import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignupForm } from '../components/organisms/SignupForm/SignupForm';

import { ToastMessageList } from '../components/organisms/ToastMessagesList/ToastMessageList';
import { RegisterData } from '../interfaces/register-data.interface';
import { User } from '../interfaces/user.interface';
import { registerUser } from '../services/authService';
import styles from './SignUp.module.css';


export const SignUp = () => {

    return (
        <div className={styles.container} >
            <SignupForm />
        </div>
    );
}





