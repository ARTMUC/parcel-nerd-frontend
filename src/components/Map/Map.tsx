// rscp
import { useCallback, useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer, WMSTileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Fab } from '@mui/material';
import L, { LatLngExpression } from 'leaflet';
import { useToastMessageContext } from '../../hooks/useToastMessageContext';
import { useProjectContext } from '../../hooks/useProjectContext';
import { addNewParcelByXY, getAllParcels } from '../../services/parcelsService';
import { ParcelInfo } from '../../interfaces/parcel-info.interface';
import styles from './Map.module.css';
import { MappedParcelInfo } from '../../interfaces/mapped-parcel-info.interface';
import { Line } from '../../interfaces/line.type';
import { getAllLines } from '../../services/linesService';

const wmsProps = {
  opacity: 1,
  format: 'image/png',
  control: true,
  tiled: true,
  maxZoom: 20,
  transparent: true,
  keepBuffer: 20,
  tileSize: 1024
};

const parcelsWmsUrl = {
  layers: 'dzialki,numery_dzialek,budynki',
  url: 'https://integracja01.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow'
};

const civilWmsUrl = {
  layers:
    'przewod_wodociagowy,przewod_kanalizacyjny,przewod_cieplowniczy,przewod_gazowy,przewod_telekomunikacyjny,przewod_elektroenergetyczny,przewod_niezidentyfikowany,przewod_niezidentyfikowany,przewod_urzadzenia',
  url: 'https://integracja01.gugik.gov.pl/cgi-bin/KrajowaIntegracjaUzbrojeniaTerenu_24'
};

const redLines = { color: 'red' };
const blueLines = { color: 'blue' };

export const Map = ({ isCheckingBounds, isWmsShown }: MapProps) => {
  const { addToastMessage } = useToastMessageContext();
  const { projectId, parcels, lines, setParcelsCtx, setLinesCtx } = useProjectContext();
  const [map, setMap] = useState<L.Map>();

  const getPositions = (line: Line): [number, number][] => {
    return line.lineCoords.map((coord) => {
      return [coord.x, coord.y];
    });
  };

  const fetchParcelsData = useCallback(async () => {
    if (!projectId) {
      addToastMessage('Project not selected');
      return;
    }
    const parcels = await getAllParcels(projectId);
    if (!parcels) {
      addToastMessage('Failed getting parcels info.');
      return;
    }
    setParcelsCtx(parcels);
  }, [addToastMessage, projectId, setParcelsCtx]);

  const fetchLinesData = useCallback(async () => {
    if (!projectId) {
      addToastMessage('Project not selected');
      return;
    }
    const lines = await getAllLines(projectId);
    if (!lines) {
      addToastMessage('Failed getting lines info.');
      return;
    }
    setLinesCtx(lines);
  }, [addToastMessage, projectId, setLinesCtx]);

  useEffect(() => {
    fetchParcelsData();
    fetchLinesData();
  }, [fetchParcelsData, fetchLinesData]);

  const locate = () => {
    if (map) {
      map.locate().on('locationfound', (e: L.LocationEvent) => {
        map.flyTo(e.latlng, 18);
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setTimeout(() => {
          circle.remove();
        }, 5000);
      });
    }
  };

  const checkIfClickOnMap = (e: L.LeafletMouseEvent) => {
    const clickedElement = e?.originalEvent?.srcElement as any; // check if there is better object to dig in
    const leafletContainerId: number = clickedElement?._leaflet_id;
    if (leafletContainerId === 3) return true;
  };

  const identifyParcelOnMap = (e: L.LeafletMouseEvent) => {
    const parcelId = e.sourceTarget.options['data-set'];
    const parcelData = parcels.filter((e) => e.id === parcelId);
    addToastMessage(parcelData[0].parcelNumber);
  };

  const mapParcelsData = (parcelsInfo: ParcelInfo[]): MappedParcelInfo[] =>
    parcelsInfo.map((parcel) => ({
      ...parcel,
      parcelBounds: parcel.parcelBounds.map((point) => [point.x, point.y])
    }));

  useEffect(() => {
    if (!map) {
      return;
    }
    const location: [number, number] = [lines[0].lineCoords[0].x, lines[0].lineCoords[0].y];
    map.flyTo(location, 18);
  }, [lines]);

  useEffect(() => {
    if (!map) return () => {};
    if (isCheckingBounds) {
      map.on('click', async (e: L.LeafletMouseEvent) => {
        if (!projectId) return;

        const isClickOnMap = checkIfClickOnMap(e);
        if (!isClickOnMap) {
          return;
        }

        const parcelInfo = await addNewParcelByXY(projectId, +e.latlng.lat, +e.latlng.lng);

        if (!parcelInfo) {
          addToastMessage('Failed getting parcel info.');
          return;
        }

        setParcelsCtx([...parcels, parcelInfo]);
      });
      return () => map.off('click');
    }
  }, [addToastMessage, isCheckingBounds, map, parcels, projectId, setParcelsCtx]);

  return (
    <>
      <MapContainer
        center={[50.6108936116734, 18.97505879356]}
        zoom={21}
        scrollWheelZoom
        style={{ height: '100vh' }}
        maxZoom={21}
        whenCreated={(map) => setMap(map)}
      >
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={20} eventHandlers={{ click: (e) => console.log(e) }} /> */}
        {/* <TileLayer url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}' subdomains={['mt0', 'mt1', 'mt2', 'mt3']} maxZoom={20} eventHandlers={{ click: (e) => console.log(e) }} /> */}
        <TileLayer
          url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
          maxZoom={21}
          eventHandlers={{ click: (e) => console.log(e) }}
        />
        {isWmsShown && (
          <WMSTileLayer {...wmsProps} {...parcelsWmsUrl} eventHandlers={{ load: (e) => console.log('wms loaded') }} />
        )}
        {isWmsShown && <WMSTileLayer {...wmsProps} {...civilWmsUrl} />}
        {parcels.length > 0 &&
          mapParcelsData(parcels).map((parcel, index) => (
            <Polygon
              eventHandlers={{ click: (e) => identifyParcelOnMap(e) }}
              data-set={parcel.id}
              key={index}
              className={styles.parcel}
              pathOptions={redLines}
              positions={parcel.parcelBounds}
            />
          ))}
        {lines.map((line, index) => {
          const positions = getPositions(line);
          return (
            <Polyline
              key={index}
              pathOptions={blueLines}
              positions={positions}
              eventHandlers={{ click: (e) => console.log(line.title, e) }}
            />
          );
        })}
      </MapContainer>

      <div className={styles.button}>
        <Fab color="primary" onClick={locate}>
          {/* <LocationOnIcon fontSize="large" /> */}
        </Fab>
      </div>
    </>
  );
};

type MapProps = {
  isCheckingBounds: boolean;
  isWmsShown: boolean;
};
