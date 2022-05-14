import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet';
import { LatLng } from 'leaflet';

export const DraggableMarker = () => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState<any>({
    lat: 51.505,
    lng: -0.09
  });
  const markerRef = useRef(null);
  const eventHandlers = useMemo<any>(
    (): any => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      }
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const mapProps = {
    draggabled: draggable,
    eventHandlers: eventHandlers,
    position: position,
    ref: markerRef
  };

  const popupProps = {
    minWidth: 90
  };

  return (
    <Marker {...mapProps}>
      <Popup {...popupProps}>
        <span onClick={toggleDraggable}>
          {draggable ? 'Marker is draggable' : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  );
};

DraggableMarker.propTypes = {};
