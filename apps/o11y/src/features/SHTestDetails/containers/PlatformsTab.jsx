import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import VirtualisedTable from 'common/VirtualisedTable';
import { getSnPTestsBreakdownData } from 'features/SuiteHealth/slices/dataSlice';
import {
  getAllSnPTestFilters,
  getSnPTestFilterByKey
} from 'features/SuiteHealth/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { logOllyEvent } from 'utils/common';

import PlatformRow from '../components/PlatformsRow';
import { PLATFORM_HEADER_CELLS_MAPPING } from '../constants';
import { resetActiveTab, setSnPCbtInfo } from '../slices/dataSlice';
import { getShowSnPDetailsFor } from '../slices/selectors';

const PlatformsTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mounted = useRef();
  const testId = useSelector(getShowSnPDetailsFor);
  const filters = useSelector(getAllSnPTestFilters);
  const activeBuild = useSelector((state) =>
    getSnPTestFilterByKey(state, 'buildName')
  );
  const activeProject = useSelector(getActiveProject);
  const [breakDownData, setBreakDownData] = useState([]);
  const [isLoadingBD, setIsLoadingBD] = useState(true);

  useEffect(() => {
    mounted.current = true;
    setIsLoadingBD(true);
    if (testId) {
      dispatch(
        getSnPTestsBreakdownData({
          normalisedName: activeProject?.normalisedName,
          testId,
          buildName: activeBuild.value,
          filters
        })
      )
        .unwrap()
        .then((res) => {
          setBreakDownData(res);
        })
        .finally(() => {
          setIsLoadingBD(false);
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
    const activeRow = breakDownData?.[currentIndex];
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

  if (isLoadingBD) {
    return <O11yLoader wrapperClassName="py-6" />;
  }

  if (isEmpty(breakDownData)) {
    return (
      <div className={twClassNames('flex items-center justify-center flex-1')}>
        <EmptyPage text="No data found" />
      </div>
    );
  }

  return (
    <div className={twClassNames('flex-1')}>
      <VirtualisedTable
        style={{ height: '100%' }}
        data={breakDownData}
        fixedHeaderContent={() => (
          <O11yTableRow>
            {Object.keys(PLATFORM_HEADER_CELLS_MAPPING).map((key) => (
              <O11yTableCell
                key={key}
                wrapperClassName={twClassNames(
                  PLATFORM_HEADER_CELLS_MAPPING[key].defaultClass
                )}
              >
                <div className="text-xs font-medium leading-4">
                  {PLATFORM_HEADER_CELLS_MAPPING[key].name}
                </div>
              </O11yTableCell>
            ))}
          </O11yTableRow>
        )}
        itemContent={(index, buildData) => (
          <PlatformRow buildData={buildData} />
        )}
        handleRowClick={handleClickItem}
        showFixedFooter={false}
      />
    </div>
  );
};

export default PlatformsTab;
