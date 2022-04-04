import { useEffect } from 'react';
import styles from './ToastMessage.module.css';


export const ToastMessage = ({ message, removeToastMessage }: any) => {

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         removeToastMessage(message.id)
    //     }, 5000)

    //     return () => {
    //         clearTimeout(timer);
    //     }

    // }, [])

    return (

        <p className={styles.toast__message}>{message.value}</p>

    );
}