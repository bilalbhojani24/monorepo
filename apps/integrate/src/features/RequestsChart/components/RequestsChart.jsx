import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { fromUnixTime, getUnixTime, subMonths } from 'date-fns';
import { omit } from 'lodash';

import { getRequestCountThunk } from '../../../api';
import { GenericError } from '../../../common';
import { INTGLoader } from '../../../common/bifrostProxy';
import { LOADING_STATUS } from '../../../constants/loadingConstants';
import {
  activeConfigurationsSelector,
  requestCountLoadingSelector,
  requestCountSelector
} from '../../../globalSlice';
import { getCleanedConfigurationIds } from '../../../utils/helpers';

import Chart from './Chart';

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
  const requestCountLoadingStatus = useSelector(requestCountLoadingSelector);
  const isRequesCountDataLoading =
    requestCountLoadingStatus === LOADING_STATUS.PENDING;
  const isRequestCountDataLoaded =
    requestCountLoadingStatus === LOADING_STATUS.SUCCEEDED;
  const isRequestCountDataFailure =
    requestCountLoadingStatus === LOADING_STATUS.FAILED;
  const { total, requests } = useSelector(requestCountSelector) ?? {};

  const from = useMemo(
    () => subMonths(new Date(), activeDateRange.value),
    [activeDateRange]
  );

  useEffect(() => {
    dispatch(
      getRequestCountThunk({
        from: getUnixTime(from),
        frequency: 'DAY',
        ...omit({ configurationIds: activeConfigurationsIds }, [
          !activeConfigurationsIds.length ? 'configurationIds' : ''
        ])
      })
    );
  }, [dispatch, activeConfigurationsIds, activeDateRange, from]);

  const getXYCoordsForRequests = () =>
    requests.map(({ timestamp, request_count: count }) => ({
      x: fromUnixTime(timestamp),
      y: count
    }));

  const handleTryAgain = useCallback(() => {
    dispatch(
      getRequestCountThunk({
        from: getUnixTime(from),
        frequency: 'DAY',
        ...omit({ configurationIds: activeConfigurationsIds }, [
          !activeConfigurationsIds.length ? 'configurationIds' : ''
        ])
      })
    );
  }, [activeConfigurationsIds, dispatch, from]);

  return (
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <div className="mb-6 h-[440px] flex-1 rounded-lg bg-white p-6 drop-shadow lg:mr-5">
      <div
        className={twClassNames('flex justify-between', {
          'mb-5': !isRequestCountDataFailure
        })}
      >
        <p className="text-lg font-semibold">API Requests</p>
        {isRequestCountDataLoaded && (
          <SelectMenu onChange={selectConfiguration} value={activeDateRange}>
            <SelectMenuTrigger wrapperClassName="w-48 ml-6" />
            <SelectMenuOptionGroup>
              {range?.map((item) => (
                <SelectMenuOptionItem key={item.value} option={item} />
              ))}
            </SelectMenuOptionGroup>
          </SelectMenu>
        )}
      </div>
      {isRequesCountDataLoading && (
        <div className="w-full">
          <INTGLoader wrapperClassName="h-80" />
        </div>
      )}
      {isRequestCountDataLoaded && (
        <>
          <p className="text-base-900 mb-10 text-3xl font-semibold">{total}</p>
          <Chart
            pointStart={getUnixTime(from)}
            data={getXYCoordsForRequests()}
          />
        </>
      )}
      {isRequestCountDataFailure && (
        <GenericError handleTryAgain={handleTryAgain} />
      )}
    </div>
  );
};

export default RequestsChart;
