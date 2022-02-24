import React from 'react';
import PropTypes from 'prop-types';


export const Panel = ({ toggleCheckBounds }: PanelProps) => {
    return (
        <div>
            please input line coordinates here
            <button onClick={toggleCheckBounds}>check parcel bounds</button>
        </div>
    );
};

type PanelProps = {
    toggleCheckBounds: () => void
};

