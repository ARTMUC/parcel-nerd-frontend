import { useEffect, useState } from 'react';
import { Map } from '../../components/Map/Map';
import { ParcelInfo } from '../../interfaces/parcel-info.interface';
import styles from './Dashboard.module.css';

import { LineCoordinates } from '../../interfaces/line-coordinates.type';

import { Hub } from '../../components/Hub';
import { ParcelList } from '../../components/ParcelList';
import { OwnerList } from '../../components/OwnerList';
import { FixedLoadingCircle } from '../../components/SharedUI/atoms/FixedLoadingCircle/FixedLoadingCircle';
import { Lines } from '../../components/Lines/Lines/Lines';

export const Dashboard = () => {
  const [ownersInfoList, setOwnerInfoList] = useState<any[]>([]);

  //// this is only temporary - data will be split on the backend probably
  // useEffect(() => {
  //     const xxx = parcelsInfoList.filter((e) => e.owner)
  //     const owners = xxx.map((e) => {
  //         const xxx = e.owner
  //         return xxx.map((x: any) => {
  //             return { ...x, parcelId: e.id }
  //         })

  //     })
  //     const zzz = owners.flat()
  //     setOwnerInfoList(zzz)
  // }, [parcelsInfoList])
  ////

  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingBounds, setIsCheckingBounds] = useState(false);
  const [isWmsShown, setIsWmsShown] = useState(true);
  const [isPipeEdit, setIsPipeEdit] = useState(false);
  const [isParcelListShown, setIsParcelListShown] = useState(false);
  const [isOwnersListShown, setIsOwnersListShown] = useState(false);

  // const handleChangeParcelList = (params: GridEditCellPropsParams) => {
  //     setParcelsInfoList((prev) => prev.map((parcel) => parcel.id === params.id ? { ...parcel, [params.field]: params.props.value } : parcel))
  // }

  const handleTogglePipeEdit = () => setIsPipeEdit((prev) => !prev);

  const handleToggleParcelList = () => setIsParcelListShown((prev) => !prev);

  const handleToggleOwnersList = () => setIsOwnersListShown((prev) => !prev);

  const toggleCheckBounds = () => setIsCheckingBounds((prev) => !prev);

  const toggleWMSDisplay = () => setIsWmsShown((prev) => !prev);

  return (
    <div className={styles.container}>
      <Hub
        toggleCheckBounds={toggleCheckBounds}
        toggleWMSDisplay={toggleWMSDisplay}
        isCheckingBounds={isCheckingBounds}
        handleTogglePipeEdit={handleTogglePipeEdit}
        isPipeEdit={isPipeEdit}
        isWmsShown={isWmsShown}
        isParcelListShown={isParcelListShown}
        handleToggleParcelList={handleToggleParcelList}
        handleToggleOwnersList={handleToggleOwnersList}
        isOwnersListShown={isOwnersListShown}
      />

      {isLoading ? <FixedLoadingCircle /> : <Map isCheckingBounds={isCheckingBounds} isWmsShown={isWmsShown} />}

      {isPipeEdit && <Lines handleTogglePipeEdit={handleTogglePipeEdit} isPipeEdit={isPipeEdit} />}

      {isParcelListShown && (
        <ParcelList isParcelListShown={isParcelListShown} handleToggleParcelList={handleToggleParcelList} />
      )}

      {isOwnersListShown && (
        <OwnerList
          ownersInfoList={ownersInfoList}
          isOwnersListShown={isOwnersListShown}
          handleToggleOwnersList={handleToggleOwnersList}
        />
      )}
    </div>
  );
};
