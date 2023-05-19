import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Loader,
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import { getUnixTime, subMonths } from 'date-fns';

import { getUsageSummaryThunk } from '../../../api';
import { LOADING_STATUS } from '../../../constants/loadingConstants';
import {
  activeConfigurationsSelector,
  usageSummaryLoadingSelector,
  usageSummarySelector
} from '../../../globalSlice';

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
  const activeConfigurationsIds = useSelector(activeConfigurationsSelector)
    ?.reduce((activeConfigurationIds, configuration) => {
      if (configuration.value !== 'All Configurations')
        activeConfigurationIds.push(configuration.value);
      return activeConfigurationIds;
    }, [])
    .join();

  const isUsageSummaryLoading =
    useSelector(usageSummaryLoadingSelector) === LOADING_STATUS.PENDING;
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
        configurationIds: activeConfigurationsIds
      })
    );
  }, [dispatch, activeConfigurationsIds, activeDateRange, to, from]);

  return (
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <div className="mb-6 h-[440px] flex-1 rounded-lg bg-white p-6 drop-shadow">
      <div className="mb-5 flex justify-between">
        <p className="text-lg font-semibold">Usage</p>
        <SelectMenu onChange={selectConfiguration} value={activeDateRange}>
          <SelectMenuTrigger wrapperClassName="w-48 ml-6" />
          <SelectMenuOptionGroup>
            {range?.map((item) => (
              <SelectMenuOptionItem key={item.value} option={item} />
            ))}
          </SelectMenuOptionGroup>
        </SelectMenu>
      </div>
      {isUsageSummaryLoading ? (
        <Loader height="h-6" width="w-6" wrapperStyle="text-base-400" />
      ) : (
        <UsageSummaryTable usageSummaryData={usageSummaryData} />
      )}
    </div>
  );
};

export default RequestsChart;
