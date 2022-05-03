import React, { MouseEventHandler } from 'react';
import styles from './Button.module.css';


export const Button = ({
    color,
    children,
    height,
    onClick,
    radius,
    width }: ButtonProps) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            style={{
                backgroundColor: color,
                borderRadius: radius,
                height,
                width
            }}
        >
            {children}
        </button>
    );
}

type ButtonProps = {
    color?: string;
    children?: React.ReactNode;
    height?: string;
    onClick?: (() => void) | (MouseEventHandler<HTMLButtonElement>);
    radius?: string
    width?: string;
}