import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  O11ySelectMenu,
  O11ySelectMenuOptionGroup,
  O11ySelectMenuOptionItem,
  O11ySelectMenuTrigger,
  O11ySwitcher
} from 'common/bifrostProxy';
import { PAYWALL_FEATURES } from 'constants/paywall';
import { PaywallTooltip } from 'features/Paywall';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import { SMART_TAGS_DEFAULT_VALUES } from '../constants';
import {
  saveSmartTagsChanges,
  submitSmartTagsChanges
} from '../slices/smartTagsSettings';

const STATIC_DURATION_DROPDOWN_DATA = [
  ...Array(20)
    .fill(0)
    .map((_, i) => ({
      name: i + 80,
      value: i + 80
    }))
];

const STATIC_EXECUTION_DROPDOWN_DATA = [
  ...Array(71)
    .fill(0)
    .map((_, i) => ({
      name: i + 30,
      value: i + 30
    }))
];

export const PerformanceAnomaliesTags = ({ data, isActive }) => {
  const [isSubmittingData, setIsSubmittingData] = useState(false);

  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const {
    durationPercentile,
    consecutiveRuns,
    enabled: performanceAnomaliesEnabled
  } = data;
  const {
    durationPercentile: durationPercentileDefault,
    consecutiveRuns: consecutiveRunsDefault
  } = SMART_TAGS_DEFAULT_VALUES.performanceAnomalies;

  const setPerformanceAnomaliesSwitch = (key, value) => {
    setIsSubmittingData(true);
    dispatch(
      saveSmartTagsChanges({
        performanceAnomalies: {
          ...data,
          [key]: value
        }
      })
    );
    dispatch(
      submitSmartTagsChanges({
        projectNormalisedName: activeProject.normalisedName
      })
    )
      .unwrap()
      .finally(() => {
        setIsSubmittingData(false);
      });
  };

  const setPerformanceAnomaliesDropdowns = (key, value) => {
    dispatch(
      saveSmartTagsChanges({
        performanceAnomalies: {
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
        <PaywallTooltip
          title="Configuring Smart tags is a pro feature."
          content="Configure your personalized definition of tests to be considered under performance anomaly."
          featureKey={PAYWALL_FEATURES.SMART_TAGS}
        >
          <O11ySwitcher
            checked={performanceAnomaliesEnabled}
            onChange={(value) =>
              setPerformanceAnomaliesSwitch('enabled', value)
            }
            disabled={!isActive}
            loading={isSubmittingData}
          />
        </PaywallTooltip>
      </div>
      <div className="border-b-base-300 my-3 h-1 border-b" />
      <div className="flex flex-col">
        <>
          <div className="text-base-500 flex items-center">
            Detect as anomaly when durationPercentile
            <div className="text-base-900 mx-1 w-20">
              <O11ySelectMenu
                value={{ label: durationPercentile, value: durationPercentile }}
                onChange={(item) =>
                  setPerformanceAnomaliesDropdowns(
                    'durationPercentile',
                    item.value
                  )
                }
                defaultValue={{
                  label: durationPercentileDefault,
                  value: durationPercentileDefault
                }}
                disabled={!isActive || !performanceAnomaliesEnabled}
              >
                <O11ySelectMenuTrigger placeholder="All Categories" />
                <O11ySelectMenuOptionGroup>
                  {STATIC_DURATION_DROPDOWN_DATA.map((item) => (
                    <O11ySelectMenuOptionItem
                      key={item.value}
                      checkPosition="right"
                      wrapperClassName="text-sm"
                      option={{
                        label: item.name,
                        value: item.value
                      }}
                    />
                  ))}
                </O11ySelectMenuOptionGroup>
              </O11ySelectMenu>{' '}
            </div>
            percentile among last
            <div className="text-base-900 mx-1 w-16">
              <O11ySelectMenu
                value={{ label: consecutiveRuns, value: consecutiveRuns }}
                onChange={(item) =>
                  setPerformanceAnomaliesDropdowns(
                    'consecutiveRuns',
                    item.value
                  )
                }
                disabled={!isActive || !performanceAnomaliesEnabled}
                defaultValue={{
                  label: consecutiveRunsDefault,
                  value: consecutiveRunsDefault
                }}
              >
                <O11ySelectMenuTrigger placeholder="All Categories" />
                <O11ySelectMenuOptionGroup>
                  {STATIC_EXECUTION_DROPDOWN_DATA.map((item) => (
                    <O11ySelectMenuOptionItem
                      key={item.value}
                      checkPosition="right"
                      wrapperClassName="text-sm"
                      option={{
                        label: item.name,
                        value: item.value
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
