import { ToastMessage } from '../../atoms/ToastMessage/ToastMessage';
import styles from './ToastMessageList.module.css';


export const ToastMessageList = ({ messages, removeToastMessage }: any) => {

    return (
        <ul className={styles.toast__list}>

            {messages.map((message: any) => <ToastMessage key={message.id} message={message} removeToastMessage={removeToastMessage} />)}

        </ul>
    );
}