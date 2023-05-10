import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PlatformsTable from 'common/PlatformsTable';
import { getSnPTestsBreakdownData } from 'features/SuiteHealth/slices/dataSlice';
import {
  getAllSnPTestFilters,
  getSnPTestFilterByKey
} from 'features/SuiteHealth/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

import FixedPlatformHeader from '../components/FixedHeader';
import PlatformRow from '../components/PlatformsRow';
import { resetActiveTab, setSnPCbtInfo } from '../slices/dataSlice';
import { getShowSHTestsDetailsFor } from '../slices/selectors';

const PlatformsTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mounted = useRef();
  const testId = useSelector(getShowSHTestsDetailsFor);
  const filters = useSelector(getAllSnPTestFilters);
  const activeBuild = useSelector((state) =>
    getSnPTestFilterByKey(state, 'buildName')
  );
  const activeProject = useSelector(getActiveProject);
  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mounted.current = true;
    setIsLoading(true);
    if (testId) {
      dispatch(
        getSnPTestsBreakdownData({
          normalisedName: activeProject?.normalisedName,
          testId,
          filters
        })
      )
        .unwrap()
        .then((res) => {
          setPlatforms(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    return () => {
      mounted.current = false;
    };
  }, [
    activeBuild.value,
    dispatch,
    filters,
    activeProject?.normalisedName,
    testId
  ]);

  const handleClickItem = (currentIndex) => {
    const activeRow = platforms?.[currentIndex];
    if (activeRow) {
      dispatch(
        setSnPCbtInfo({
          osName: activeRow?.os?.name || '',
          osVersion: activeRow?.os?.version || '',
          browserName: activeRow?.browserDevice?.name || '',
          browserVersion: activeRow?.browserDevice?.version || '',
          deviceName: activeRow?.browserDevice?.device?.name || '',
          osKey: activeRow?.os?.key || '',
          browserKey: activeRow?.browserDevice?.key || '',
          deviceKey: activeRow?.browserDevice?.device?.key || ''
        })
      );
      const searchParams = new URLSearchParams(window?.location?.search);
      dispatch(resetActiveTab());
      navigate({ search: searchParams.toString() });
      logOllyEvent({
        event: 'O11ySuiteHealthTestsTimelineInteracted',
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
