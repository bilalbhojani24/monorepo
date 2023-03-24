import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CombinationsMenu from 'common/CombinationsMenu';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { capitalize, getShortOSName, logOllyEvent } from 'utils/common';

import {
  setSHTestDetailsChartBounds,
  setSnPCbtInfo
} from '../slices/dataSlice';
import {
  getShowSHTestsDetailsFor,
  getSHTestsDetailsInfo,
  getSnPCbtInfo
} from '../slices/selectors';

const TestDetailsCombinationsMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testDetailsInfo = useSelector(getSHTestsDetailsInfo);
  const cbtInfo = useSelector(getSnPCbtInfo);
  const testId = useSelector(getShowSHTestsDetailsFor);
  const activeProject = useSelector(getActiveProject);

  const updatedMenuOptions = useMemo(() => {
    const menuOptions = [
      {
        label: 'All Combinations',
        value: 'all',
        data: {
          os: { name: '', version: '', key: '' },
          browser: { name: '', version: '', key: '' },
          device: { name: '', key: '' }
        }
      }
    ];
    const combinations = testDetailsInfo.data?.combinations;
    if (combinations?.length) {
      combinations.forEach((item) => {
        const combination = `${getShortOSName(item?.os?.name)} ${
          item?.os?.version
        } ${item?.browser?.device?.name || capitalize(item?.browser?.name)} ${
          item?.browser?.version
        }`;
        menuOptions.push({
          label: combination,
          value: combination,
          data: item
        });
      });
    }
    return menuOptions;
  }, [testDetailsInfo.data]);

  const getDefaultSelectedCombination = useMemo(() => {
    const defaultOption = { label: 'All Combinations', value: 'all', data: {} };
    if (
      cbtInfo.osName &&
      (cbtInfo.deviceName || cbtInfo.browserName) &&
      !isEmpty(updatedMenuOptions)
    ) {
      const combination = `${getShortOSName(cbtInfo.osName)} ${
        cbtInfo.osVersion
      } ${cbtInfo.deviceName || capitalize(cbtInfo.browserName)} ${
        cbtInfo.browserVersion
      }`;
      const option = updatedMenuOptions.find(
        (item) => item.label === combination
      );
      return option || defaultOption;
    }
    return defaultOption;
  }, [updatedMenuOptions, cbtInfo]);

  const handleCombinationChange = (value) => {
    dispatch(
      setSHTestDetailsChartBounds({
        lower: null,
        upper: null
      })
    );
    const selected = value.data;
    const searchParams = new URLSearchParams(window?.location?.search);
    dispatch(
      setSnPCbtInfo({
        osName: selected?.os?.name || '',
        osVersion: selected?.os?.version || '',
        browserName: selected?.browser?.name || '',
        browserVersion: selected?.browser?.version || '',
        deviceName: selected?.browser?.device?.name || '',
        osKey: selected?.os?.key || '',
        browserKey: selected?.browser?.key || '',
        deviceKey: selected?.browser?.device?.key || ''
      })
    );
    searchParams.set(SNP_PARAMS_MAPPING.snpTestDetails, testId);
    navigate({ search: searchParams.toString() });
    logOllyEvent({
      event: 'O11ySuiteHealthTestsTimelineInteracted',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id,
        interaction: 'filter'
      }
    });
  };

  return (
    <div>
      <CombinationsMenu
        defaultValue={getDefaultSelectedCombination}
        isLoading={testDetailsInfo.isLoading}
        menuOptions={updatedMenuOptions}
        onCombinationChange={handleCombinationChange}
      />
    </div>
  );
};

export default TestDetailsCombinationsMenu;
