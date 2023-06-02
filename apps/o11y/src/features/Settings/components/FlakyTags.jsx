import React, { useState } from 'react';
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

import { SMART_TAGS_DEFAULT_VALUES } from '../constants';
import {
  saveSmartTagsChanges,
  submitSmartTagsChanges
} from '../slices/smartTagsSettings';

const STATIC_RE_RUN_DROPDOWN_DATA = [
  ...Array(31)
    .fill(0)
    .map((_, i) => ({ name: i, value: i }))
];
const FLIPPING_COUNT = [
  ...Array(10)
    .fill(0)
    .map((_, i) => ({
      name: `${(i + 1) * 10}`,
      value: (i + 1) * 10
    }))
];
const FLIPPING_COUNT_CONSECUTIVE_RUNS = [
  ...Array(10)
    .fill(0)
    .map((_, i) => ({ name: i + 1, value: i + 1 }))
];

export const FlakyTags = ({ data, isActive }) => {
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);

  const { automaticFlaky, flakeInHistory, flakeInRerun } = data;
  const {
    flippingCount: flippingCountDefault,
    consecutiveRuns: consecutiveRunsDefault
  } = SMART_TAGS_DEFAULT_VALUES.flaky.flakeInHistory;
  const { consecutiveRuns: rerunDefault } =
    SMART_TAGS_DEFAULT_VALUES.flaky.flakeInRerun;

  const saveAndSubmitData = (payload) => {
    setIsSubmittingData(true);
    dispatch(saveSmartTagsChanges(payload));
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

  const updateAutomaticFlakyTags = (key, value) => {
    saveAndSubmitData({ flaky: { ...data, [key]: value } });
  };

  const setTestStatusFlippingSwitch = (value) => {
    saveAndSubmitData({
      flaky: {
        ...data,
        flakeInHistory: {
          ...flakeInHistory,
          enabled: value
        }
      }
    });
  };
  const setTestStatusFlipping = (item) => {
    dispatch(
      saveSmartTagsChanges({
        flaky: {
          ...data,
          flakeInHistory: {
            ...flakeInHistory,
            flippingCount: item.value
          }
        }
      })
    );
  };
  const setTestStatusFlippingTotal = (item) => {
    dispatch(
      saveSmartTagsChanges({
        flaky: {
          ...data,
          flakeInHistory: {
            ...flakeInHistory,
            testStatusFlippingTotal: item.value
          }
        }
      })
    );
  };
  const setFlakeInRerunSwitch = (value) => {
    saveAndSubmitData({
      flaky: {
        ...data,
        flakeInRerun: {
          ...flakeInRerun,
          enabled: value
        }
      }
    });
  };

  const setFlakeInRerun = (item) => {
    dispatch(
      saveSmartTagsChanges({
        flaky: {
          ...data,
          flakeInRerun: {
            ...flakeInRerun,
            flippingCount: item.value
          }
        }
      })
    );
  };

  return (
    <section className="p-6 pb-9">
      <div className="flex justify-between">
        <span className="text-lg font-medium">Flaky</span>
        <O11ySwitcher
          checked={automaticFlaky}
          onChange={(item) => updateAutomaticFlakyTags('automaticFlaky', item)}
          disabled={!isActive}
          loading={isSubmittingData}
        />
      </div>
      <div className="border-b-base-300 my-3 h-1 border-b" />
      <div className="flex flex-col">
        <>
          <div className="flex justify-between">
            <p className="text-base-900">Flake in history of test execution</p>
            <O11ySwitcher
              checked={flakeInHistory.enabled}
              onChange={setTestStatusFlippingSwitch}
              disabled={isActive ? !automaticFlaky : true}
              loading={isSubmittingData}
            />
          </div>
          <div className="text-base-500 flex flex-wrap items-center">
            Test status has flipped more than
            <span className="text-base-900 mx-1 w-16">
              <O11ySelectMenu
                value={{
                  label: flakeInHistory.flippingCount,
                  value: flakeInHistory.flippingCount
                }}
                onChange={setTestStatusFlipping}
                defaultValue={{
                  label: flippingCountDefault,
                  value: flippingCountDefault
                }}
                disabled={
                  !isActive || !flakeInHistory.enabled || !automaticFlaky
                }
              >
                <O11ySelectMenuTrigger placeholder="All Categories" value="" />
                <O11ySelectMenuOptionGroup>
                  {FLIPPING_COUNT.map((item) => (
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
            </span>
            times in the last
            <div className="text-base-900 mx-1 w-16">
              <O11ySelectMenu
                value={{
                  label: flakeInHistory.consecutiveRuns,
                  value: flakeInHistory.consecutiveRuns
                }}
                onChange={setTestStatusFlippingTotal}
                defaultValue={{
                  label: consecutiveRunsDefault,
                  value: consecutiveRunsDefault
                }}
                disabled={
                  !isActive || !flakeInHistory.enabled || !automaticFlaky
                }
              >
                <O11ySelectMenuTrigger placeholder="All Categories" value="" />
                <O11ySelectMenuOptionGroup>
                  {FLIPPING_COUNT_CONSECUTIVE_RUNS.map((item) => (
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
            consecutive runs
          </div>
        </>
        <p className="text-base-600 py-4">OR</p>
        <>
          <div className="flex justify-between">
            <p className="text-base-900">Flake in test re-runs</p>
            <O11ySwitcher
              checked={flakeInRerun.enabled}
              onChange={setFlakeInRerunSwitch}
              disabled={isActive ? !automaticFlaky : true}
              loading={isSubmittingData}
            />
          </div>
          <div className="text-base-500 flex items-center">
            Test passes on a retry within the last
            <div className="text-base-900 mx-1 w-16">
              <O11ySelectMenu
                value={{
                  label: flakeInRerun.consecutiveRuns,
                  value: flakeInRerun.consecutiveRuns
                }}
                onChange={setFlakeInRerun}
                defaultValue={{ label: rerunDefault, value: rerunDefault }}
                disabled={!isActive || !flakeInRerun.enabled || !automaticFlaky}
              >
                <O11ySelectMenuTrigger placeholder="Select" />
                <O11ySelectMenuOptionGroup>
                  {STATIC_RE_RUN_DROPDOWN_DATA.map((item) => (
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
            runs
          </div>
        </>
      </div>
    </section>
  );
};

FlakyTags.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isActive: PropTypes.bool.isRequired
};

FlakyTags.defaultProps = {
  data: {}
};
