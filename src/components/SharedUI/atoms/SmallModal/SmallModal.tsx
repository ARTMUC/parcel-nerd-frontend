import styles from './SmallModal.module.css';


export const SmallModal = ({ children }: SmallModalProps) => {

    return (
        <div className={styles.modal}> {children} </div >
    );
}

type SmallModalProps = {
    children: JSX.Element[] | JSX.Element
}

