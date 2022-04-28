// rscp

import { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer, WMSTileLayer, Polygon } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useToastMessageContext } from '../../hooks/useToastMessageContext';
import { useProjectContext } from '../../hooks/useProjectContext';
import { addNewParcelByXY, getAllParcels } from '../../services/parcelsService';
import { ParcelInfo } from '../../interfaces/parcel-info.interface';
import { ResponseParcelInfo } from '../../interfaces/response-parcel-info.interface';
import { Fab } from '@mui/material';
import styles from './Map.module.css';




export const Map = ({ pipeCoords, isCheckingBounds, isWmsShown }: MapProps) => {

    const { addToastMessage } = useToastMessageContext();
    const { projectId, parcels, setParcelsCtx } = useProjectContext();
    const [map, setMap] = useState<L.Map>()
    const [newParcel, setNewParcel] = useState<ParcelInfo[]>([])

    useEffect(() => {
        fetchParcelsData()
    }, [])

    useEffect(() => {
        setParcelsCtx([...parcels, ...newParcel])
    }, [newParcel])



    const redLines = { color: "red" };
    const blueLines = { color: "blue" };

    const wmsProps = {
        layers: "dzialki,numery_dzialek",
        url: `https://integracja.gugik.gov.pl/cgi-bin/KrajowaIntegracjaEwidencjiGruntow`,
        opacity: 1,
        format: "image/png",
        control: true,
        tiled: true,
        maxZoom: 50,
        transparent: true,
    }
    const locate = () => {
        if (map) {
            map.locate().on("locationfound", function (e: L.LocationEvent) {
                map.flyTo(e.latlng, 19);
                const radius = e.accuracy
                const circle = L.circle(e.latlng, radius);
                circle.addTo(map);
                setTimeout(() => { circle.remove() }, 5000)
            });
        }
    }

    const identifyParcelOnMap = (e: L.LeafletMouseEvent) => {

        const clickedElement = e?.originalEvent?.srcElement as any // check if there is better object to dig in
        const leafletContainerId: number = clickedElement?._leaflet_id
        if (leafletContainerId !== 3) {
            const parcelId = e.sourceTarget._targets[leafletContainerId].options['data-set']
            const parcelData = parcels.filter((e) => e.id === parcelId)
            return parcelData
        }
        return false
    }

    const fetchParcelsData = async () => {
        if (!projectId) {
            addToastMessage('Project not selected')
            return
        }
        const parcels = await getAllParcels(projectId)
        if (!parcels) {
            addToastMessage(`Failed getting parcels info.`)
            return
        }
        const mappedParcels = mapParcelsData(parcels)
        setParcelsCtx(mappedParcels)
    }


    const mapParcelsData = (parcelsInfo: ResponseParcelInfo[]): ParcelInfo[] => {
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
        if (!isCheckingBounds) {
            map.on("click", async function (e: L.LeafletMouseEvent) {

                const parcelData = identifyParcelOnMap(e)
                if (parcelData) {
                    addToastMessage(`This parcel number is ${parcelData[0].parcelNumber}.`)
                    return
                }

            });
            return () => map.off('click')
        }

        if (isCheckingBounds) {
            map.on("click", async function (e: L.LeafletMouseEvent) {
                if (!projectId) return

                const parcelData = identifyParcelOnMap(e)
                if (parcelData) {
                    addToastMessage(`This parcel ${parcelData[0].parcelNumber} is already on the list.`)
                    return
                }

                const parcelInfo = await addNewParcelByXY(projectId, +e.latlng.lat, +e.latlng.lng)

                if (!parcelInfo) {
                    addToastMessage(`Failed getting parcel info.`)
                    return
                }

                const mapped: ParcelInfo[] = mapParcelsData([parcelInfo])
                setNewParcel(mapped)
                return

            });
            return () => map.off('click')
        }

    }, [isCheckingBounds, parcels])




    return (

        <>
            <MapContainer center={pipeCoords.length > 0 ? pipeCoords[0] : [50.23, 18.99]} zoom={15} scrollWheelZoom={true} style={{ height: "100vh" }} maxZoom={23} whenCreated={(map) => setMap(map)}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maxZoom={20} />
                {isWmsShown && <WMSTileLayer {...wmsProps} />}
                {parcels.map((parcel: any, index) => {
                    return <Polygon data-set={parcel.id} key={index} className={styles.parcel} pathOptions={redLines} positions={parcel.parcelBounds} />
                })}
                <Polyline pathOptions={blueLines} positions={pipeCoords} />
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

