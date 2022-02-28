// rscp
import React from 'react';
import PropTypes from 'prop-types';
import { LineCoordinates } from '../interfaces/line-coordinates.type';
import styles from './PipeLine.module.css';

export const PipeLine = ({ pipeCoords, handleAddNewPipeCoord, handleChangeCoord, handleDeleteCoord, fetchParcelsData, handleDrawPipes, handleTogglePipeEdit }: PipeLineProps) => {



    return (
        <>

            <div className={styles.container}>
                <button onClick={handleTogglePipeEdit} className={styles.button_close}>X</button>
                <ul className={styles.pipe_list}>
                    {pipeCoords.map((e, index) => {
                        return (
                            <li className={styles.list_element}>
                                <input className={styles.input} value={e[0]} data-index={index} data-axis={0} onChange={e => handleChangeCoord(e)}></input>
                                <input className={styles.input} value={e[1]} data-index={index} data-axis={1} onChange={e => handleChangeCoord(e)}></input>
                                <button className={styles.button} data-index={index} onClick={(e) => handleDeleteCoord(e)}>delete</button></li>
                        )
                    })}
                </ul>
                <div className={styles.btn_container}>
                    <button className={styles.button} onClick={() => handleAddNewPipeCoord()}> add new </button>
                    <button className={styles.button} onClick={() => fetchParcelsData()}> check parcels IDs </button>
                    <button className={styles.button} onClick={() => handleDrawPipes()}>draw pipes</button>
                </div>

            </div >
        </>
    );
};

type PipeLineProps = {
    pipeCoords: LineCoordinates[];
    handleAddNewPipeCoord: () => void;
    handleChangeCoord: (e: any) => void;
    handleDeleteCoord: (e: any) => void;
    fetchParcelsData: () => Promise<void>;
    handleDrawPipes: () => Promise<void>;
    handleTogglePipeEdit: () => void;
};

