import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  O11ySelectMenu,
  O11ySelectMenuOptionGroup,
  O11ySelectMenuOptionItem,
  O11ySelectMenuTrigger,
  O11ySwitcher
} from 'common/bifrostProxy';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import {
  saveSmartTagsChanges,
  submitSmartTagsChanges
} from '../slices/smartTagsSettings';

export const PerformanceAnomaliesTags = ({ data, isActive }) => {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const {
    duration,
    lastExecution,
    enabled: performanceAnomaliesEnabled
  } = data;

  const setPerformanceAnomaliesSwitch = (key, value) => {
    dispatch(
      submitSmartTagsChanges({
        projectNormalisedName: activeProject.normalisedName,
        newFailure: {
          ...data,
          [key]: value
        }
      })
    );
  };

  const setPerformanceAnomaliesDropdowns = (key, value) => {
    dispatch(
      saveSmartTagsChanges({
        newFailure: {
          ...data,
          [key]: value
        }
      })
    );
  };

  return (
    <section className="p-6 pb-9">
      <div className="flex justify-between">
        <span className="text-lg font-medium">Performance anomalies</span>
        <O11ySwitcher
          checked={performanceAnomaliesEnabled}
          onChange={(value) => setPerformanceAnomaliesSwitch('enabled', value)}
          disabled={!isActive}
        />
      </div>
      <div className="border-b-base-300 my-3 h-1 border-b" />
      <div className="flex flex-col">
        <>
          <div className="text-base-500 flex items-center">
            Detect as anomaly when duration
            <div className="mx-1 w-20">
              <O11ySelectMenu
                value={{ label: duration, value: duration }}
                onChange={(item) =>
                  setPerformanceAnomaliesDropdowns('duration', item.value)
                }
                defaultValue={{ label: '80%', value: '80%' }}
                disabled={!isActive}
              >
                <O11ySelectMenuTrigger placeholder="All Categories" />
                <O11ySelectMenuOptionGroup>
                  {[
                    ...Array(19)
                      .fill(0)
                      .map((_, i) => ({
                        name: `${i + 80}%`,
                        value: `${i + 80}%`
                      }))
                  ].map((integration) => (
                    <O11ySelectMenuOptionItem
                      checkPosition="right"
                      wrapperClassName="text-sm"
                      option={{
                        label: integration.name,
                        value: integration.value
                      }}
                    />
                  ))}
                </O11ySelectMenuOptionGroup>
              </O11ySelectMenu>{' '}
            </div>
            percentile among last
            <div className="mx-1 w-16">
              <O11ySelectMenu
                value={{ label: lastExecution, value: lastExecution }}
                onChange={(item) =>
                  setPerformanceAnomaliesDropdowns('lastExecution', item.value)
                }
                disabled={!isActive}
                defaultValue={{ label: 30, value: 30 }}
              >
                <O11ySelectMenuTrigger placeholder="All Categories" />
                <O11ySelectMenuOptionGroup>
                  {[
                    ...Array(471)
                      .fill(0)
                      .map((_, i) => ({
                        name: i + 30,
                        value: i + 30
                      }))
                  ].map((integration) => (
                    <O11ySelectMenuOptionItem
                      checkPosition="right"
                      wrapperClassName="text-sm"
                      option={{
                        label: integration.name,
                        value: integration.value
                      }}
                    />
                  ))}
                </O11ySelectMenuOptionGroup>
              </O11ySelectMenu>{' '}
            </div>{' '}
            executions
          </div>
        </>
      </div>
    </section>
  );
};

PerformanceAnomaliesTags.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isActive: PropTypes.bool.isRequired
};

PerformanceAnomaliesTags.defaultProps = {
  data: {}
};
