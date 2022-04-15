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

import styles from './SmallModal.module.css';


export const SmallModal = ({ children }: SmallModalProps) => {

    return (
        <div className={styles.modal}> {children} </div >
    );
}

type SmallModalProps = {
    children: JSX.Element
}

