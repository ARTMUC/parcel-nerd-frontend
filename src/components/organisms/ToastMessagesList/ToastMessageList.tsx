import { ToastMessageInterface } from '../../../context/ToastMessageContext';
import { ToastMessage } from '../../atoms/ToastMessage/ToastMessage';
import styles from './ToastMessageList.module.css';


export const ToastMessageList = ({ messages }: ToastMessageListProps) => {

    return (
        <ul className={styles.toast__list}>
            {messages.map((message) => <ToastMessage key={message.id} message={message} />)}
        </ul>
    );
}

type ToastMessageListProps = {
    messages: ToastMessageInterface[]
}