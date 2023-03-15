import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdErrorOutline, Notifications, notify } from '@browserstack/bifrost';
import { O11yButton, O11yInputField, O11ySwitcher } from 'common/bifrostProxy';
import { getActiveProject } from 'globalSlice/selectors';
import { getNumericValue, logOllyEvent } from 'utils/common';

import SettingsCard from '../components/SettingsCard';
import { getAutoAnalyzerSettingsState } from '../slices/selectors';
import {
  getAutoAnalyserSettingsData,
  updateAutoAnalyserSettingsData
} from '../slices/settingsSlice';

export default function AutoAnalysisSettings() {
  const data = useSelector(getAutoAnalyzerSettingsState);
  const activeProject = useSelector(getActiveProject);
  const [failureCategoryDetectionEnabled, setFailureCategoryDetectionEnabled] =
    useState({
      state: false,
      loading: true
    });
  const [uniqueErrorDetectionEnabled, setUniqueErrorDetectionEnabled] =
    useState({
      state: false,
      loading: true
    });
  const [thresholdPercentage, setThresholdPercentage] = useState(0);

  const dispatch = useDispatch();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    if (activeProject.normalisedName) {
      dispatch(
        getAutoAnalyserSettingsData({
          projectNormalisedName: activeProject.normalisedName
        })
      )
        .unwrap()
        .then((res) => {
          if (mounted.current) {
            setFailureCategoryDetectionEnabled({
              state: res.data.failureCategoryDetectionEnabled,
              loading: false
            });
            setUniqueErrorDetectionEnabled({
              state: res.data.uniqueErrorDetectionEnabled,
              loading: false
            });
            setThresholdPercentage(res.data.thresholdPercentage);
          }
        })
        .catch(() => {
          setFailureCategoryDetectionEnabled((prev) => ({
            state: prev.state,
            loading: false
          }));
          setUniqueErrorDetectionEnabled((prev) => ({
            state: prev.state,
            loading: false
          }));
          notify(
            <Notifications
              id="update-auto-analyzer-failed"
              title="Something went wrong!"
              description="There was an error while loading settings"
              headerIcon={
                <MdErrorOutline className="text-danger-500 text-lg leading-5" />
              }
              handleClose={(toastData) => {
                notify.remove(toastData.id);
              }}
            />,
            {
              position: 'top-right',
              duration: 3000
            }
          );
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [activeProject.normalisedName, dispatch]);

  const handleUpdateSettings = (payload = {}) => {
    dispatch(
      updateAutoAnalyserSettingsData({
        projectNormalisedName: activeProject.normalisedName,
        payload
      })
    )
      .unwrap()
      .then(() => {
        setFailureCategoryDetectionEnabled((prev) => ({
          state: prev.state,
          loading: false
        }));
        setUniqueErrorDetectionEnabled((prev) => ({
          state: prev.state,
          loading: false
        }));
        logOllyEvent({
          event: 'O11ySettingsPageInteracted',
          data: {
            project_name: activeProject.name,
            project_id: activeProject.id,
            interaction: 'auto_failure_analysis_config_changed'
          }
        });
      })
      .catch(() => {
        setFailureCategoryDetectionEnabled({
          state: data.data.failureCategoryDetectionEnabled,
          loading: false
        });
        setUniqueErrorDetectionEnabled({
          state: data.data.uniqueErrorDetectionEnabled,
          loading: false
        });
        setThresholdPercentage(data.data.thresholdPercentage);
        notify(
          <Notifications
            id="update-auto-analyzer-failed"
            title="Something went wrong!"
            description="There was an error while updating settings"
            headerIcon={
              <MdErrorOutline className="text-danger-500 text-lg leading-5" />
            }
            handleClose={(toastData) => {
              notify.remove(toastData.id);
            }}
          />,
          {
            position: 'top-right',
            duration: 3000
          }
        );
      });
  };
  const handleChangeFailureCatSwitch = (checked) => {
    setFailureCategoryDetectionEnabled({
      state: checked,
      loading: true
    });
    handleUpdateSettings({
      failureCategoryDetectionEnabled: checked
    });
  };
  const handleChangeUniqueErrorSwitch = (checked) => {
    setUniqueErrorDetectionEnabled({
      state: checked,
      loading: true
    });
    handleUpdateSettings({
      uniqueErrorDetectionEnabled: checked
    });
  };
  const handleChangeThreshold = ({ target: { value } }) => {
    const val = getNumericValue(value);
    if (val > 100) {
      return;
    }
    setThresholdPercentage(val);
  };

  return (
    <SettingsCard>
      <section className="border-b-base-200 border-b p-6">
        <h2 className="text-lg font-medium leading-6">Auto Failure Analysis</h2>
        <p className="text-base-500 mt-1 text-sm leading-5">
          Automatic analysis of failed tests depends on manual tagging with
          failure categories of tests for few initial runs, based on which it
          starts to automatically identify future tests that fail with similar
          issues.
        </p>
        <h3 className="mt-6 text-sm font-medium leading-5">
          Automatic failure category detection
        </h3>
        <div className="flex gap-4">
          <p className="text-base-500 mt-1 text-sm leading-5">
            Enable to auto-identify failure categories for tests with similar
            failure patterns. If disabled, all tests will be tagged as “To be
            investigated” and require manual categorization.
          </p>
          <O11ySwitcher
            checked={failureCategoryDetectionEnabled.state}
            disabled={failureCategoryDetectionEnabled.loading}
            loading={failureCategoryDetectionEnabled.loading}
            onChange={handleChangeFailureCatSwitch}
          />
        </div>
        <h3 className="mt-6 text-sm font-medium leading-5">
          Automatic unique error detection
        </h3>
        <div className="flex gap-4">
          <p className="text-base-500 mt-1 text-sm leading-5">
            Enable to auto detect unique errors that occurred across various
            tests in a build resulting in test failures. This analysis helps in
            consolidating multiple common cause test failures.
          </p>
          <O11ySwitcher
            checked={uniqueErrorDetectionEnabled.state}
            disabled={uniqueErrorDetectionEnabled.loading}
            loading={uniqueErrorDetectionEnabled.loading}
            onChange={handleChangeUniqueErrorSwitch}
          />
        </div>
      </section>
      <section className="p-6">
        <h2 className="text-lg font-medium leading-6">Threshold</h2>
        <h3 className="mt-6 text-sm font-medium leading-5">
          Threshold percentage match for automatic failure analysis (in
          percentage)
        </h3>
        <p className="text-base-500 mt-1 text-sm leading-5">
          Set a threshold percentage that guides the automatic failure category
          detection algorithms to ensure that tagging of failure category is
          accurate. It is set at 95% by default. You can adjust this number
          based on the accuracy of test tagging.
        </p>
        <O11yInputField
          id="auto-threshold-percentage"
          disabled={data.isLoading}
          value={thresholdPercentage}
          onChange={handleChangeThreshold}
          wrapperClassName="w-16 mt-3"
        />
      </section>
      <div className="bg-base-50 sticky bottom-0 flex justify-end py-3 px-6">
        <O11yButton
          loading={data.isLoading}
          isIconOnlyButton={data.isLoading}
          disabled={data?.data?.thresholdPercentage === thresholdPercentage}
          onClick={() =>
            handleUpdateSettings({
              thresholdPercentage
            })
          }
        >
          Save Changes
        </O11yButton>
      </div>
    </SettingsCard>
  );
}
