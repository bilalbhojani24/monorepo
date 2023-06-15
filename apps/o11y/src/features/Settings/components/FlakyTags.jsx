import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  O11ySelectMenu,
  O11ySelectMenuOptionGroup,
  O11ySelectMenuOptionItem,
  O11ySelectMenuTrigger,
  O11ySwitcher
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { SMART_TAGS_DEFAULT_VALUES } from '../constants';
import { saveSmartTagsChanges } from '../slices/smartTagsSettings';

const STATIC_RE_RUN_DROPDOWN_DATA = [
  ...Array(31)
    .fill(0)
    .map((_, i) => ({ name: i, value: i }))
];
const FLIPPING_COUNT = [
  ...Array(29)
    .fill(0)
    .map((_, i) => ({
      name: i + 1,
      value: i + 1
    }))
];
const FLIPPING_COUNT_CONSECUTIVE_RUNS = [
  ...Array(26)
    .fill(0)
    .map((_, i) => ({ name: i + 5, value: i + 5 }))
];

export const FlakyTags = ({ data, isActive }) => {
  const dispatch = useDispatch();
  const [flippingCountArray, setFlippingCountArray] = useState(FLIPPING_COUNT);
  const [consecutiveRunsArray, setConsecutiveRunsArray] = useState(
    FLIPPING_COUNT_CONSECUTIVE_RUNS
  );

  const { automaticFlaky, flakeInHistory, flakeInRerun } = data;
  const {
    flippingCount: flippingCountDefault,
    consecutiveRuns: consecutiveRunsDefault
  } = SMART_TAGS_DEFAULT_VALUES.flaky.flakeInHistory;
  const { consecutiveRuns: rerunDefault } =
    SMART_TAGS_DEFAULT_VALUES.flaky.flakeInRerun;

  const updateFlakyTagsSwitch = (key, value) => {
    dispatch(
      saveSmartTagsChanges({
        flaky: {
          ...data,
          [key]: value,
          flakeInHistory: {
            ...flakeInHistory,
            enabled: value
          },
          flakeInRerun: {
            ...flakeInRerun,
            enabled: value
          }
        }
      })
    );
  };

  const setTestStatusFlipping = (type, value) => {
    dispatch(
      saveSmartTagsChanges({
        flaky: {
          ...data,
          flakeInHistory: {
            ...flakeInHistory,
            [type]: value
          }
        }
      })
    );
  };

  const setFlakeInRerun = (type, value) => {
    dispatch(
      saveSmartTagsChanges({
        flaky: {
          ...data,
          flakeInRerun: {
            ...flakeInRerun,
            [type]: value
          }
        }
      })
    );
  };

  useEffect(() => {
    setConsecutiveRunsArray([
      ...Array(30 - Math.max(4, flakeInHistory.flippingCount))
        .fill(0)
        .map((_, i) => ({
          name: i + Math.max(4, flakeInHistory.flippingCount) + 1,
          value: i + Math.max(4, flakeInHistory.flippingCount) + 1
        }))
    ]);
  }, [flakeInHistory.flippingCount]);

  useEffect(() => {
    setFlippingCountArray([
      ...Array(flakeInHistory.consecutiveRuns - 1)
        .fill(0)
        .map((_, i) => ({
          name: i + 1,
          value: i + 1
        }))
    ]);
  }, [flakeInHistory.consecutiveRuns]);

  return (
    <section className="p-6 pb-9">
      <div className="flex justify-between">
        <span className="font-medium">Flaky</span>
        <O11ySwitcher
          checked={automaticFlaky}
          onChange={(item) => updateFlakyTagsSwitch('automaticFlaky', item)}
          disabled={!isActive}
        />
      </div>
      <div className="border-b-base-300 my-3 h-1 border-b" />
      <div className="flex flex-col text-sm">
        <>
          <div className="flex justify-between">
            <p className="text-base-900 font-medium">
              Flake in history of test execution
            </p>
            <O11ySwitcher
              checked={flakeInHistory.enabled}
              onChange={(value) => setTestStatusFlipping('enabled', value)}
              disabled={isActive ? !automaticFlaky : true}
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
                onChange={(item) =>
                  setTestStatusFlipping('flippingCount', item.value)
                }
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
                  {flippingCountArray.map((item) => (
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
                onChange={(item) =>
                  setTestStatusFlipping('consecutiveRuns', item.value)
                }
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
                  {consecutiveRunsArray.map((item) => (
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
          <div className="flex justify-between text-sm">
            <p className="text-base-900 font-medium">Flake in test re-runs</p>
            <O11ySwitcher
              checked={flakeInRerun.enabled}
              onChange={(item) => setFlakeInRerun('enabled', item)}
              disabled={isActive ? !automaticFlaky : true}
            />
          </div>
          <div className="text-base-500 flex items-center">
            Test passes on a retry within the last
            <div className="text-base-900 mx-1">
              <O11ySelectMenu
                value={{
                  label: `${flakeInRerun.consecutiveRuns ?? rerunDefault}`,
                  value: `${flakeInRerun.consecutiveRuns ?? rerunDefault}`
                }}
                onChange={(item) =>
                  setFlakeInRerun(
                    'consecutiveRuns',
                    item.value === 'zero' ? 0 : item.value
                  )
                }
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
                        label: `${item.name}`,
                        value: `${item.value}`
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
