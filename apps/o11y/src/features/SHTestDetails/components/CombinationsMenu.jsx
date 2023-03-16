import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import {
  O11ySelectMenu,
  O11ySelectMenuOptionGroup,
  O11ySelectMenuOptionItem,
  O11ySelectMenuTrigger
} from 'common/bifrostProxy';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { capitalize, getShortOSName, logOllyEvent } from 'utils/common';

import {
  setSHTestDetailsChartBounds,
  setSnPCbtInfo
} from '../slices/dataSlice';
import {
  getShowSnPDetailsFor,
  getSnPCbtInfo,
  getTestDetailsInfo
} from '../slices/selectors';

const CombinationsMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testDetailsInfo = useSelector(getTestDetailsInfo);
  const cbtInfo = useSelector(getSnPCbtInfo);
  const testId = useSelector(getShowSnPDetailsFor);
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
        deviceName: selected?.browser?.device.name || '',
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
      <O11ySelectMenu
        defaultValue={getDefaultSelectedCombination}
        onChange={handleCombinationChange}
      >
        <O11ySelectMenuTrigger
          placeholder="Select.."
          wrapperClassName={twClassNames('max-w-[300px]', {
            'pointer-events-none opacity-50': testDetailsInfo.isLoading
          })}
        />
        <O11ySelectMenuOptionGroup>
          {updatedMenuOptions.map((item) => (
            <O11ySelectMenuOptionItem
              key={item.value}
              option={item}
              wrapperClassName="text-xs"
            />
          ))}
        </O11ySelectMenuOptionGroup>
      </O11ySelectMenu>
    </div>
  );
};

export default CombinationsMenu;
