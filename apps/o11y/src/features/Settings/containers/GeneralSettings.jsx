import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yButton, O11yInputField } from 'common/bifrostProxy';
import { getActiveProject } from 'globalSlice/selectors';
import { getNumericValue, logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

import SettingsCard from '../components/SettingsCard';
import {
  getGeneralSettingsData,
  submitGeneralSettingsChanges
} from '../slices/generalSettings';
import { getGeneralSettingsState } from '../slices/selectors';

export default function GeneralSettings() {
  const data = useSelector(getGeneralSettingsState);
  const activeProject = useSelector(getActiveProject);
  const [buildTimeout, setBuildTimeout] = useState(0);
  const [buildTimeoutError, setBuildTimeoutError] = useState('');

  const dispatch = useDispatch();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    if (activeProject.normalisedName) {
      dispatch(
        getGeneralSettingsData({
          projectNormalisedName: activeProject.normalisedName
        })
      )
        .unwrap()
        .then((res) => {
          if (res?.data?.buildTimeout && mounted.current) {
            setBuildTimeout(res.data.buildTimeout);
          }
        })
        .catch(() => {
          o11yNotify({
            title: 'Something went wrong!',
            description: 'There was an error while loading settings',
            type: 'error'
          });
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [activeProject.normalisedName, dispatch]);

  const handleBuildTimeoutChange = ({ target: { value } }) => {
    const val = getNumericValue(value);
    if (val > 1800) {
      setBuildTimeoutError('Build timeout must be less than 1800 seconds');
    } else if (val < 1800 && buildTimeoutError) {
      setBuildTimeoutError('');
    }
    setBuildTimeout(val);
  };

  const handleSubmitChanges = () => {
    dispatch(
      submitGeneralSettingsChanges({
        projectNormalisedName: activeProject.normalisedName,
        payload: {
          buildTimeout
        }
      })
    )
      .unwrap()
      .then(() => {
        logOllyEvent({
          event: 'O11ySettingsPageInteracted',
          data: {
            project_name: activeProject.name,
            project_id: activeProject.id,
            interaction: 'timeout_value_changed'
          }
        });
        o11yNotify({
          title: 'Successfully updated!',
          description: 'Settings were updated successfully',
          type: 'success'
        });
      })
      .catch(() => {
        setBuildTimeout(data?.data?.buildTimeout);
        o11yNotify({
          title: 'Something went wrong!',
          description: 'There was an error while updating settings',
          type: 'error'
        });
      });
  };

  return (
    <SettingsCard>
      <div className="p-6">
        <p className="text-lg font-medium leading-6">Inactivity timeout</p>
        <p className="text-base-500 mt-1 text-sm font-normal leading-5">
          BrowserStack Test Observability registers activities in your test runs
          and represents it. Set an inactivity timeout to force-terminate
          running builds on account of not receiving events from your test
          framework.
        </p>
        <p className="mt-6 text-sm font-medium leading-5">
          Timeout for build (in seconds)
        </p>
        <p className="text-base-500 mt-1 mb-3 text-sm font-normal leading-5">
          Set a larger build timeout if you have non-test related activities
          consuming a considerable amount of time as part of your build.
        </p>
        <div className="w-16">
          <O11yInputField
            id="general-build-timeout"
            disabled={data?.isLoading}
            value={buildTimeout}
            onChange={handleBuildTimeoutChange}
            errorText={buildTimeoutError}
            type="number"
            wrapperClassName="w-full [&>input]:w-full"
          />
        </div>
      </div>
      <div className="bg-base-50 sticky bottom-0 flex justify-end py-3 px-6">
        <O11yButton
          loading={data.isLoading}
          isIconOnlyButton={data.isLoading}
          disabled={
            data?.data?.buildTimeout === buildTimeout || !!buildTimeoutError
          }
          onClick={handleSubmitChanges}
        >
          Save Changes
        </O11yButton>
      </div>
    </SettingsCard>
  );
}
