import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PlatformsTable from 'common/PlatformsTable';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

import FixedPlatformHeader from '../components/FixedHeader';
import PlatformRow from '../components/PlatformRow';
import {
  getSnPErrorDetailsPlatformsData,
  resetUEDetailsActiveTab,
  setUECbtInfo
} from '../slices/dataSlice';
import { getShowUEDetailsFor } from '../slices/selectors';

const PlatformsTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mounted = useRef();
  const { testId, errorId } = useSelector(getShowUEDetailsFor);
  const activeProject = useSelector(getActiveProject);
  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mounted.current = true;
    setIsLoading(true);
    if (testId && errorId) {
      dispatch(
        getSnPErrorDetailsPlatformsData({
          normalisedName: activeProject?.normalisedName,
          testId,
          errorId
        })
      )
        .unwrap()
        .then((res) => {
          setPlatforms(res);
        })
        .catch(() => {
          if (mounted.current) {
            setPlatforms([]);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    return () => {
      mounted.current = false;
    };
  }, [dispatch, activeProject?.normalisedName, testId, errorId]);

  const handleClickItem = (currentIndex) => {
    const activeRow = platforms?.[currentIndex];
    const browser = activeRow?.browserDevice || activeRow?.browser;
    if (activeRow) {
      dispatch(
        setUECbtInfo({
          osName: activeRow?.os?.name || '',
          osVersion: activeRow?.os?.version || '',
          browserName: browser?.name || '',
          browserVersion: browser?.version || '',
          deviceName: browser?.device || '',
          osKey: activeRow?.os?.key || '',
          browserKey: browser?.key || '',
          deviceKey: browser?.device?.key || ''
        })
      );
      const searchParams = new URLSearchParams(window?.location?.search);
      dispatch(resetUEDetailsActiveTab());
      navigate({ search: searchParams.toString() });
      logOllyEvent({
        event: 'O11ySuiteHealthErrorsTimelineInteracted',
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          interaction: 'filter'
        }
      });
    }
  };

  return (
    <PlatformsTable
      isLoading={isLoading}
      data={platforms}
      onRowClick={handleClickItem}
      FixedHeaderContent={FixedPlatformHeader}
      ItemContent={PlatformRow}
    />
  );
};

export default PlatformsTab;
