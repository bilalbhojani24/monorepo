import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { getUnixTime, subMonths } from 'date-fns';
import { omit } from 'lodash';

import { getUsageSummaryThunk } from '../../../api';
import { GenericError } from '../../../common';
import {
  INTGLoader,
  INTGSelectMenu,
  INTGSelectMenuOptionGroup,
  INTGSelectMenuOptionItem,
  INTGSelectMenuTrigger
} from '../../../common/bifrostProxy';
import { LOADING_STATUS } from '../../../constants/loadingConstants';
import {
  activeConfigurationsSelector,
  usageSummaryLoadingSelector,
  usageSummarySelector
} from '../../../globalSlice';
import { getCleanedConfigurationIds } from '../../../utils/helpers';

import UsageSummaryTable from './UsageSummaryTable';

const RequestsChart = () => {
  const dispatch = useDispatch();
  const range = [
    { label: 'Last 1 month', value: '1' },
    { label: 'Last 3 months', value: '3' },
    { label: 'Last 6 months', value: '6' }
  ];
  const [activeDateRange, setActiveDateRange] = useState(range?.[0] || {});
  const selectConfiguration = (val) => {
    setActiveDateRange(val);
  };
  const activeConfigurationsIds = getCleanedConfigurationIds(
    useSelector(activeConfigurationsSelector)
  );

  const usageSummaryLoadingStatus = useSelector(usageSummaryLoadingSelector);

  const isUsageSummaryLoading =
    usageSummaryLoadingStatus === LOADING_STATUS.PENDING;
  const isUsageSummaryLoaded =
    usageSummaryLoadingStatus === LOADING_STATUS.SUCCEEDED;
  const isUsageSummaryFailure =
    usageSummaryLoadingStatus === LOADING_STATUS.FAILED;
  const usageSummaryData = useSelector(usageSummarySelector);

  const to = useMemo(() => new Date(), []);
  const from = useMemo(
    () => subMonths(to, activeDateRange.value),
    [to, activeDateRange]
  );

  useEffect(() => {
    dispatch(
      getUsageSummaryThunk({
        to: getUnixTime(to),
        from: getUnixTime(from),
        ...omit({ configurationIds: activeConfigurationsIds }, [
          !activeConfigurationsIds.length ? 'configurationIds' : ''
        ])
      })
    );
  }, [dispatch, activeConfigurationsIds, activeDateRange, to, from]);

  const handleTryAgain = useCallback(() => {
    dispatch(
      getUsageSummaryThunk({
        to: getUnixTime(to),
        from: getUnixTime(from),
        ...omit({ configurationIds: activeConfigurationsIds }, [
          !activeConfigurationsIds.length ? 'configurationIds' : ''
        ])
      })
    );
  }, [activeConfigurationsIds, dispatch, from, to]);

  return (
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <div className="mb-6 h-[440px] flex-1 rounded-lg bg-white p-6 drop-shadow">
      <div
        className={twClassNames('flex justify-between', {
          'mb-5': !isUsageSummaryFailure
        })}
      >
        <p className="text-lg font-semibold">Usage</p>
        {isUsageSummaryLoaded && (
          <INTGSelectMenu
            onChange={selectConfiguration}
            value={activeDateRange}
          >
            <INTGSelectMenuTrigger wrapperClassName="w-48 ml-6" />
            <INTGSelectMenuOptionGroup>
              {range?.map((item) => (
                <INTGSelectMenuOptionItem key={item.value} option={item} />
              ))}
            </INTGSelectMenuOptionGroup>
          </INTGSelectMenu>
        )}
      </div>
      {isUsageSummaryLoading && <INTGLoader wrapperClassName="h-80" />}
      {isUsageSummaryLoaded && (
        <UsageSummaryTable usageSummaryData={usageSummaryData} />
      )}
      {isUsageSummaryFailure && (
        <GenericError handleTryAgain={handleTryAgain} />
      )}
    </div>
  );
};

export default RequestsChart;
