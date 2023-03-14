import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineAdd } from '@browserstack/bifrost';
import createAlertSvg from 'assets/illustrations/create_alert.svg';
import {
  O11yButton,
  O11yTable,
  O11yTableBody,
  O11yTableCell,
  O11yTableHead,
  O11yTableRow
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import O11yLoader from 'common/O11yLoader';
import { MODAL_TYPES } from 'constants/modalTypes';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';

import AlertTypeGroup from '../components/AlertTypeGroup';
import Initiator from '../components/Initiator';
import SettingsCard from '../components/SettingsCard';
import { ALERT_TYPES } from '../constants';
import { getAlertsState } from '../slices/selectors';
import { getAlertsSettings } from '../slices/settingsSlice';

export default function AlertsSettings() {
  const data = useSelector(getAlertsState);
  const activeProject = useSelector(getActiveProject);
  const dispatch = useDispatch();
  useEffect(() => {
    if (activeProject.normalisedName) {
      dispatch(
        getAlertsSettings({
          projectNormalisedName: activeProject.normalisedName
        })
      );
    }
  }, [activeProject.normalisedName, dispatch]);

  const handleClickAddAlert = () => {
    dispatch(toggleModal({ version: MODAL_TYPES.add_alert }));
  };

  if (data?.isLoading) {
    return (
      <SettingsCard>
        <div className="m-auto flex h-72 w-72 flex-col items-center justify-center p-6">
          <O11yLoader
            wrapperClassName="flex-1"
            loaderClass="text-base-200 fill-base-400 w-8 h-8"
            text="Fetching alerts"
            textClass="text-sm"
          />
        </div>
      </SettingsCard>
    );
  }
  if (!data?.isLoading && isEmpty(data?.data)) {
    return (
      <SettingsCard>
        <div className="p-6">
          <Initiator
            btnText="Create Alert"
            desc="Alerts allow you to define thresholds for different build criteria, such as build performance, stability, etc and monitor the overall health of your builds or projects."
            onClick={handleClickAddAlert}
            title="Configure alerts"
            illustration={createAlertSvg}
          />
        </div>
      </SettingsCard>
    );
  }
  return (
    <SettingsCard>
      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium leading-6">Active alerts</h2>
            <p className="text-base-500 mt-1 text-sm font-normal leading-5">
              BrowserStack Test Observability registers activities in your test
              runs and represents it.
            </p>
          </div>
          <O11yButton
            icon={<MdOutlineAdd className="text-lg" />}
            onClick={handleClickAddAlert}
          >
            Add alert
          </O11yButton>
        </div>
        <div className="mt-6">
          <O11yTable containerWrapperClass="overflow-visible overflow-x-visible md:rounded-none">
            <O11yTableHead wrapperClassName="bg-white sticky top-0">
              <O11yTableRow>
                <O11yTableCell variant="header">Alert name</O11yTableCell>
                <O11yTableCell variant="header">Warning</O11yTableCell>
                <O11yTableCell variant="header">Critical</O11yTableCell>
                <O11yTableCell variant="header">Applicable to</O11yTableCell>
              </O11yTableRow>
            </O11yTableHead>
            <O11yTableBody>
              {Object.values(ALERT_TYPES).map((key) => (
                <AlertTypeGroup key={key} type={key} />
              ))}
            </O11yTableBody>
          </O11yTable>
        </div>
      </div>
    </SettingsCard>
  );
}
