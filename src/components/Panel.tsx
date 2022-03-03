import React from 'react';
import PropTypes from 'prop-types';
import { ParcelInfo } from '../interfaces/parcel-info.interface';


export const Panel = ({ toggleCheckBounds, parcels }: PanelProps) => {
    return (
        <div>
            please input line coordinates here
            <button onClick={toggleCheckBounds}>check parcel bounds</button>
            {parcels && parcels.map((parcel) => {
                return <div></div>
            })}
        </div>
    );
};

type PanelProps = {
    toggleCheckBounds: () => void
    parcels: ParcelInfo[]
};

