// rscp
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Hub.module.css';

export const Hub = ({ toggleCheckBounds, toggleWMSDisplay, isCheckingBounds, handleTogglePipeEdit }: HubProps) => {
    return (
        <ul className={styles.hub_container}>
            <li className={styles.hub_btn} onClick={handleTogglePipeEdit}>add pipeline</li>
            <li className={`${styles.hub_btn} ${isCheckingBounds && styles.selected}`} onClick={toggleCheckBounds}>add parcel</li>
            <li className={styles.hub_btn}>show parcel list</li>
            <li className={styles.hub_btn} onClick={toggleWMSDisplay}> toggle WMS display</li>
        </ul >
    );
};

type HubProps = {
    toggleCheckBounds: () => void,
    toggleWMSDisplay: () => void,
    isCheckingBounds: boolean,
    handleTogglePipeEdit: () => void;
};

