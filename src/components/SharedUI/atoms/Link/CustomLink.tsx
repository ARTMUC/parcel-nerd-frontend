import { Link } from 'react-router-dom';


import styles from './CustomLink.module.css';


export const CustomLink = ({ to, text, linkText }: CustomLinkProps) => {

    return (
        <div className={styles.customLink}>
            <p>{text}</p> <Link className={styles.link} to={to}>{linkText}</Link>
        </div>

    );
}

type CustomLinkProps = {
    to: string,
    text: string,
    linkText: string
}

