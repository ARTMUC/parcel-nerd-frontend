// rscp
import { useCallback, useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer, WMSTileLayer, Polygon } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useToastMessageContext } from '../../hooks/useToastMessageContext';
import { useProjectContext } from '../../hooks/useProjectContext';
import { addNewParcelByXY, getAllParcels } from '../../services/parcelsService';
import { ParcelInfo } from '../../interfaces/parcel-info.interface';
import { Fab } from '@mui/material';
import styles from './Map.module.css';
import L from 'leaflet';
import { MappedParcelInfo } from '../../interfaces/mapped-parcel-info.interface';





const wmsProps = {

    opacity: 1,
    format: "image/png",
    control: true,
    tiled: true,
    maxZoom: 20,
    transparent: true,
    keepBuffer: 2,
    tileSize: 2000
}

const parcelsWmsUrl = {
    layers: "dzialki,numery_dzialek,budynki",
    url: `https://integracja02.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow`,
}

const civilWmsUrl = {
    layers: "przewod_wodociagowy,przewod_kanalizacyjny,przewod_cieplowniczy,przewod_gazowy,przewod_telekomunikacyjny,przewod_elektroenergetyczny,przewod_niezidentyfikowany,przewod_niezidentyfikowany,przewod_urzadzenia",
    url: `https://integracja01.gugik.gov.pl/cgi-bin/KrajowaIntegracjaUzbrojeniaTerenu_24`,
}

const redLines = { color: "red" };
const blueLines = { color: "blue" };


export const Map = ({ pipeCoords, isCheckingBounds, isWmsShown }: MapProps) => {

    const { addToastMessage } = useToastMessageContext();
    const { projectId, parcels, setParcelsCtx } = useProjectContext();
    const [map, setMap] = useState<L.Map>()

    const fetchParcelsData = useCallback(async () => {
        if (!projectId) {
            addToastMessage('Project not selected')
            return
        }
        const parcels = await getAllParcels(projectId)
        if (!parcels) {
            addToastMessage(`Failed getting parcels info.`)
            return
        }
        setParcelsCtx(parcels)
    }, [addToastMessage, projectId, setParcelsCtx])

    useEffect(() => {
        fetchParcelsData()
    }, [fetchParcelsData])

    const locate = () => {
        if (map) {
            map.locate().on("locationfound", function (e: L.LocationEvent) {
                map.flyTo(e.latlng, 18);
                const radius = e.accuracy
                const circle = L.circle(e.latlng, radius);
                circle.addTo(map);
                setTimeout(() => { circle.remove() }, 5000)
            });
        }
    }

    const checkIfClickOnMap = (e: L.LeafletMouseEvent) => {
        const clickedElement = e?.originalEvent?.srcElement as any // check if there is better object to dig in
        const leafletContainerId: number = clickedElement?._leaflet_id
        if (leafletContainerId === 3) return true
    }

    const identifyParcelOnMap = (e: L.LeafletMouseEvent) => {
        const parcelId = e.sourceTarget.options['data-set']
        const parcelData = parcels.filter((e) => e.id === parcelId)
        addToastMessage(parcelData[0].parcelNumber)
    }


    const mapParcelsData = (parcelsInfo: ParcelInfo[]): MappedParcelInfo[] => {
        return parcelsInfo.map((parcel) => {
            return {
                ...parcel,
                parcelBounds: parcel.parcelBounds.map((point) => {
                    return [point.x, point.y]
                })
            }
        })
    }


    useEffect(() => {
        if (!map) return () => { }
        if (isCheckingBounds) {
            map.on("click", async function (e: L.LeafletMouseEvent) {
                if (!projectId) return

                const isClickOnMap = checkIfClickOnMap(e)
                if (!isClickOnMap) {
                    return
                }

                const parcelInfo = await addNewParcelByXY(projectId, +e.latlng.lat, +e.latlng.lng)

                if (!parcelInfo) {
                    addToastMessage(`Failed getting parcel info.`)
                    return
                }

                setParcelsCtx([...parcels, parcelInfo])
                return

            });
            return () => map.off('click')
        }

    }, [addToastMessage, isCheckingBounds, map, parcels, projectId, setParcelsCtx])




    return (

        <>
            <MapContainer center={pipeCoords.length > 0 ? pipeCoords[0] : [50.23, 18.99]} zoom={18} scrollWheelZoom={true} style={{ height: "100vh" }} maxZoom={18} whenCreated={(map) => setMap(map)}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={18} eventHandlers={{ click: (e) => console.log(e) }} />
                {isWmsShown && <WMSTileLayer {...wmsProps} {...parcelsWmsUrl} eventHandlers={{ load: (e) => console.log('wms loaded') }} />}
                {isWmsShown && <WMSTileLayer {...wmsProps} {...civilWmsUrl} />}
                {mapParcelsData(parcels).map((parcel, index) => {
                    return <Polygon eventHandlers={{ click: (e) => identifyParcelOnMap(e) }} data-set={parcel.id} key={index} className={styles.parcel} pathOptions={redLines} positions={parcel.parcelBounds} />
                })}
                <Polyline pathOptions={blueLines} positions={pipeCoords} eventHandlers={{ click: (e) => console.log(e) }} />
            </MapContainer>

            <div className={styles.button}>
                <Fab color={"primary"} onClick={locate}>
                    {/* <LocationOnIcon fontSize="large" /> */}
                </Fab>

            </div>

        </>
    );
};

type MapProps = {
    pipeCoords: any, // will be stored in context, interface yet to be created
    isCheckingBounds: boolean,
    isWmsShown: boolean,
};

