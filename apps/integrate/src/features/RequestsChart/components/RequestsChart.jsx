import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import { fromUnixTime, getUnixTime, subMonths } from 'date-fns';

import { getRequestCountThunk } from '../../../api';
import { INTGLoader } from '../../../common/bifrostProxy';
import { LOADING_STATUS } from '../../../constants/loadingConstants';
import {
  activeConfigurationsSelector,
  requestCountLoadingSelector,
  requestCountSelector
} from '../../../globalSlice';

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
  const activeConfigurationsIds = useSelector(activeConfigurationsSelector)
    ?.reduce((activeConfigurationIds, configuration) => {
      if (configuration.value !== 'All Configurations')
        activeConfigurationIds.push(configuration.value);
      return activeConfigurationIds;
    }, [])
    .join();
  const isrequesCountDataLoading =
    useSelector(requestCountLoadingSelector) === LOADING_STATUS.PENDING;
  const { total, requests } = useSelector(requestCountSelector) ?? {};

  const to = useMemo(() => new Date(), []);
  const from = useMemo(
    () => subMonths(to, activeDateRange.value),
    [to, activeDateRange]
  );

  useEffect(() => {
    dispatch(
      getRequestCountThunk({
        to: getUnixTime(to),
        from: getUnixTime(from),
        frequency: '1Y',
        configurationIds: activeConfigurationsIds
      })
    );
  }, [dispatch, activeConfigurationsIds, activeDateRange, to, from]);

  const getXYCoordsForRequests = () =>
    requests.map(({ timestamp, request_count: count }) => ({
      x: fromUnixTime(timestamp),
      y: count
    }));
  return (
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <div className="mb-6 h-[440px] flex-1 rounded-lg bg-white p-6 drop-shadow lg:mr-5">
      <div className="mb-5 flex justify-between">
        <p className="text-lg font-semibold">API Requests</p>
        <SelectMenu onChange={selectConfiguration} value={activeDateRange}>
          <SelectMenuTrigger wrapperClassName="w-48 ml-6" />
          <SelectMenuOptionGroup>
            {range?.map((item) => (
              <SelectMenuOptionItem key={item.value} option={item} />
            ))}
          </SelectMenuOptionGroup>
        </SelectMenu>
      </div>
      {isrequesCountDataLoading ? (
        <div className="w-full">
          <INTGLoader wrapperClassName="h-80" />
        </div>
      ) : (
        <>
          <p className="text-base-900 mb-10 text-3xl font-semibold">{total}</p>
          <Chart
            pointStart={getUnixTime(from)}
            data={getXYCoordsForRequests()}
          />
        </>
      )}
    </div>
  );
};

export default RequestsChart;
