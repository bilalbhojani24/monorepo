import React, { useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Alerts as BifrostAlerts,
  Button,
  MdErrorOutline,
  MdNotificationAdd,
  MdRocket
} from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { ROUTES } from 'constants/routes';
// import { setAppliedFiltersTagsViaURL } from 'testops/TestFilters/slices/dataSlice';
// import { setTestRuns } from 'testops/TestList/slices/dataSlice';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import { isEmpty } from 'lodash';

import { getBuildAlerts } from '../slices/selectors';
import { getBuildAlertsData } from '../slices/testInsightsSlice';

const ALERT_LEVEL = {
  WARNING: 'warning',
  WARN: 'warning',
  CRITICAL: 'error'
};

export default function Alerts() {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alerts = useSelector(getBuildAlerts);
  const buildId = useSelector(getBuildUUID);

  useEffect(() => {
    dispatch(getBuildAlertsData({ buildId }));
  }, [buildId, dispatch]);

  const handleFilterRedirect = (filterQuery) => {
    logInsightsInteractionEvent({ interaction: 'alerts_clicked' });
    // dispatch(setTestRuns([]));
    window.scroll(0, 0);
    let searchString = `?tab=tests`;
    if (filterQuery) {
      searchString += `&${filterQuery}`;
    }
    navigate({ search: searchString });
    // dispatch(setAppliedFiltersTagsViaURL());
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
        {/* <CardHeader title="Alerts" /> */}
        <div className="flex flex-1 items-center">
          <O11yLoader text="Fetching data" />
        </div>
      </div>
    );
  }
  if (alerts?.hasNetworkError) {
    return (
      <div className="flex h-full flex-col">
        {/* <CardHeader title="Alerts" /> */}
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
      <div className="flex h-full flex-col">
        {/* <CardHeader title="Alerts" /> */}
        {/* <PlaceHolder
          text="No alerts configured!"
          // metaText="Alerts not configured yet"
          illustration={
            <svg className="ti-placeholder__illustration">
              <use xlinkHref="#create_alert" />
            </svg>
          }
          ctaText="Configure"
          onClickCTA={handleClickConfigureAlerts}
        /> */}
        <O11yEmptyState
          title="No alerts configured!"
          description={null}
          buttonProps={{
            children: 'Configure',
            onClick: handleClickConfigureAlerts,
            size: 'default'
          }}
          mainIcon={
            <MdNotificationAdd className="text-brand-400 inline-block !h-12 !w-12" />
          }
        />
      </div>
    );
  }
  if (hasNoData) {
    return (
      <div className="flex h-full flex-col">
        {/* <CardHeader title="Alerts" /> */}
        <O11yEmptyState
          title="No alerts!"
          description="We found zero alerts in this build"
          buttonProps={null}
          mainIcon={
            <MdRocket className="text-brand-400 inline-block !h-12 !w-12" />
          }
        />
        {/* <PlaceHolder
          text="No alerts!"
          metaText="We found zero alerts in this build"
          illustration={
            <svg className="ti-placeholder__illustration">
              <use xlinkHref="#no-data-rocket" />
            </svg>
          }
        /> */}
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        {alerts?.data?.data.map((item) => (
          <BifrostAlerts
            title={item.text}
            linkText={null}
            modifier="primary"
            // wrapperClassName="ti-alerts__alert"
            key={item.id}
            action={
              <Button
                wrapperClassName="ti-alerts__alert-btn"
                onClick={() => handleFilterRedirect(item.filterQuery)}
              >
                {item.cta}
              </Button>
            }
            // modifier={ALERT_LEVEL[item?.level] || ''}
          />
          //   {item.text}
          // </BifrostAlerts>
        ))}
      </div>
    </div>
  );
}
