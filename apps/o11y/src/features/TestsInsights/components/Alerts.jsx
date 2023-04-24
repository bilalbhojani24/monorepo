import React, { useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  MdError,
  MdErrorOutline,
  MdOutlineAddAlert,
  MdOutlineTask,
  MdWarning,
  StackedListCommon,
  StackedListGroup,
  StackedListItem
} from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { ROUTES } from 'constants/routes';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import isEmpty from 'lodash/isEmpty';

import { getBuildAlerts } from '../slices/selectors';
import { getBuildAlertsData } from '../slices/testInsightsSlice';

const ALERT_LEVEL = {
  WARNING: <MdWarning className="text-attention-300 inline-block !h-7 !w-7" />,
  WARN: <MdWarning className="text-attention-300 inline-block !h-7 !w-7" />,
  CRITICAL: <MdError className="text-attention-500 inline-block !h-7 !w-7" />
};

export default function Alerts() {
  const { logInsightsInteractionEvent, applyTestListFilter } =
    useContext(TestInsightsContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alerts = useSelector(getBuildAlerts);
  const buildId = useSelector(getBuildUUID);

  useEffect(() => {
    dispatch(getBuildAlertsData({ buildId }));
  }, [buildId, dispatch]);

  const handleFilterRedirect = (filterQuery) => {
    logInsightsInteractionEvent({ interaction: 'alerts_clicked' });
    applyTestListFilter({ query: filterQuery || '' });
  };

  const handleClickConfigureAlerts = () => {
    logInsightsInteractionEvent({ interaction: 'alerts_configure_clicked' });
    navigate(ROUTES.settings_alerts);
  };

  const hasNoData = useMemo(
    () => isEmpty(alerts?.data?.data) && !alerts?.isLoading,
    [alerts?.data?.data, alerts?.isLoading]
  );

  if (alerts?.isLoading) {
    return (
      <div className="">
        <div className="flex flex-1 items-center">
          <O11yLoader text="Fetching data" />
        </div>
      </div>
    );
  }
  if (alerts?.hasNetworkError) {
    return (
      <div className="flex h-full flex-col justify-center">
        <O11yEmptyState
          title="Something went wrong"
          description={null}
          buttonProps={{
            children: 'Reload',
            onClick: () => dispatch(getBuildAlertsData({ buildId })),
            size: 'default'
          }}
          mainIcon={
            <MdErrorOutline className="text-danger-600 inline-block !h-12 !w-12" />
          }
        />
      </div>
    );
  }
  if (hasNoData && !alerts?.data?.alertsConfigured) {
    return (
      <div className="flex h-full flex-col justify-center">
        <O11yEmptyState
          title="Configure alerts!"
          description="You have not configured any alerts"
          buttonProps={{
            children: 'Get Started',
            onClick: handleClickConfigureAlerts,
            size: 'default'
          }}
          mainIcon={
            <MdOutlineAddAlert className="text-base-400 inline-block !h-12 !w-12" />
          }
        />
      </div>
    );
  }
  if (hasNoData) {
    return (
      <div className="flex h-full flex-col justify-center">
        <O11yEmptyState
          title="No alerts!"
          description="We found zero alerts in this build"
          buttonProps={null}
          mainIcon={
            <MdOutlineTask className="text-base-400 inline-block !h-12 !w-12" />
          }
        />
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <StackedListGroup isCard={false}>
          {alerts?.data?.data.map((item) => (
            <StackedListItem
              wrapperClassName="px-0 py-3 sm:px-0"
              actions={
                <Button
                  variant="rounded"
                  colors="white"
                  onClick={() => handleFilterRedirect(item.filterQuery)}
                >
                  {item.cta}
                </Button>
              }
            >
              <StackedListCommon
                icon={ALERT_LEVEL[item?.level]}
                title={item.text}
                subTitle={null}
              />
            </StackedListItem>
          ))}
        </StackedListGroup>
      </div>
    </div>
  );
}