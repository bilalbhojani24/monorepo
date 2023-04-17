import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11ySwitcher } from 'common/bifrostProxy';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';
import { o11yNotify } from 'utils/notification';

import SettingsCard from '../components/SettingsCard';
import { getReRunSettings, updateReRunSettings } from '../slices/reRunSettings';
import { getReRunSettingsState } from '../slices/selectors';

export default function ReRunSettings() {
  const data = useSelector(getReRunSettingsState);
  const activeProject = useSelector(getActiveProject);
  const [reRunViaCli, setReRunViaCli] = useState({
    state: false,
    loading: true
  });
  const [reRunViaDashboard, setReRunViaDashboard] = useState({
    state: false,
    loading: true
  });
  const dispatch = useDispatch();
  const mounted = useRef();

  useEffect(() => {
    mounted.current = true;
    if (activeProject.normalisedName) {
      dispatch(
        getReRunSettings({
          projectNormalisedName: activeProject.normalisedName
        })
      )
        .unwrap()
        .then((res) => {
          if (mounted.current) {
            setReRunViaCli({
              state: res.data.reRunViaCli === 'true',
              loading: false
            });
            setReRunViaDashboard({
              state: res.data.reRunViaDashboard === 'true',
              loading: false
            });
          }
        })
        .catch(() => {
          setReRunViaCli((prev) => ({
            state: prev.state,
            loading: false
          }));
          setReRunViaDashboard((prev) => ({
            state: prev.state,
            loading: false
          }));
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

  const handleUpdateSettings = (payload = {}) => {
    dispatch(
      updateReRunSettings({
        projectNormalisedName: activeProject.normalisedName,
        payload
      })
    )
      .unwrap()
      .then(() => {
        setReRunViaCli((prev) => ({
          state: prev.state,
          loading: false
        }));
        setReRunViaDashboard((prev) => ({
          state: prev.state,
          loading: false
        }));
        logOllyEvent({
          event: 'O11ySettingsPageInteracted',
          data: {
            project_name: activeProject.name,
            project_id: activeProject.id,
            interaction: 'rerun_config_changed'
          }
        });
        o11yNotify({
          title: 'Successfully updated!',
          description: 'Re-run settings were updated successfully',
          type: 'success'
        });
      })
      .catch(() => {
        setReRunViaCli({
          state: data.data.reRunViaCli,
          loading: false
        });
        setReRunViaDashboard({
          state: data.data.reRunViaDashboard,
          loading: false
        });
        o11yNotify({
          title: 'Something went wrong!',
          description: 'There was an error while updating settings',
          type: 'error'
        });
      });
  };
  const handleChangeReRunCli = (checked) => {
    setReRunViaCli({
      state: checked,
      loading: true
    });
    handleUpdateSettings({
      reRunViaCli: checked.toString()
    });
  };
  const handleChangeReRunDashboard = (checked) => {
    setReRunViaDashboard({
      state: checked,
      loading: true
    });
    handleUpdateSettings({
      reRunViaDashboard: checked.toString()
    });
  };
  return (
    <SettingsCard>
      <section className="p-6">
        <h2 className="text-lg font-medium leading-6">
          Re-run your builds using BrowserStack
        </h2>
        <p className="text-base-500 mt-1 text-sm leading-5">
          BrowserStack lets you re-trigger your CI builds directly from the
          dashboard, or merge build runs automatically through either of these
          modes.
        </p>
        <h3 className="mt-6 text-sm font-medium leading-5">
          Re-run from the command line
        </h3>
        <div className="flex gap-4">
          <p className="text-base-500 mt-1 text-sm leading-5">
            Automatically merge test data from re-run builds by setting
            &quot;BROWSERSTACK_RERUN&quot; env var to &quot;true&quot; in your
            runner environment before the start of the re-triggered build run.
          </p>
          <O11ySwitcher
            checked={reRunViaCli.state}
            disabled={reRunViaCli.loading}
            loading={reRunViaCli.loading}
            onChange={handleChangeReRunCli}
          />
        </div>
        <h3 className="mt-6 text-sm font-medium leading-5">
          Re-run from the Dashboard
        </h3>
        <div className="flex gap-4">
          <p className="text-base-500 mt-1 text-sm leading-5">
            Enable to add the functionality of triggering re-runs of selective
            tests on the CI, from the dashboard. Ensure that you have configured
            the CI integration for CI re-runs.
          </p>
          <O11ySwitcher
            checked={reRunViaDashboard.state}
            disabled={reRunViaDashboard.loading}
            loading={reRunViaDashboard.loading}
            onChange={handleChangeReRunDashboard}
          />
        </div>
      </section>
    </SettingsCard>
  );
}
