import { useEffect } from 'react';
import { ToastMessageInterface } from '../../../context/ToastMessageContext';
import styles from './ToastMessage.module.css';


export const ToastMessage = ({ message }: ToastMessageProps) => {

    return (
        <p className={styles.toast__message}>{message.value}</p>
    );
}

type ToastMessageProps = {
    message: ToastMessageInterface
}