import React from 'react';
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

const ALWAYS_FAILING_TAGS_DATA = [
  { label: 'same', value: 'SAME' },
  { label: 'any', value: 'ANY' }
];

const ALWAYS_FAILING_TAGS_ENUM = {
  SAME: 'same',
  ANY: 'any'
};

const STATIC_DROPDOWN_DATA = [
  ...Array(29)
    .fill(0)
    .map((_, i) => ({ name: i + 2, value: i + 2 }))
];

export const AlwaysFailingTags = ({ data, isActive }) => {
  const dispatch = useDispatch();

  const {
    failureType,
    consecutiveRuns,
    enabled: alwaysFailingSwitchEnabled
  } = data;
  const {
    failureType: errorTypeDefault,
    consecutiveRuns: consecutiveRunsDefault
  } = SMART_TAGS_DEFAULT_VALUES.alwaysFailing;

  const setAlwaysFailing = (key, value) => {
    dispatch(
      saveSmartTagsChanges({
        alwaysFailing: {
          ...data,
          [key]: value
        }
      })
    );
  };

  return (
    <section className="p-6 pb-9">
      <div className="flex justify-between">
        <span className="text-lg font-medium">Always Failing</span>
        <O11ySwitcher
          checked={alwaysFailingSwitchEnabled}
          onChange={(value) => setAlwaysFailing('enabled', value)}
          disabled={!isActive}
        />
      </div>
      <div className="border-b-base-300 my-3 h-1 border-b" />
      <div className="flex flex-col">
        <>
          <div className="text-base-500 flex items-center">
            The test has been failing with the
            <div className="text-base-900 mx-1">
              <O11ySelectMenu
                value={{
                  label: ALWAYS_FAILING_TAGS_ENUM[failureType],
                  value: failureType
                }}
                defaultValue={{
                  label: errorTypeDefault,
                  value: errorTypeDefault
                }}
                onChange={(item) => setAlwaysFailing('failureType', item.value)}
                disabled={isActive ? !alwaysFailingSwitchEnabled : true}
              >
                <O11ySelectMenuTrigger />
                <O11ySelectMenuOptionGroup>
                  {ALWAYS_FAILING_TAGS_DATA.map((item) => (
                    <O11ySelectMenuOptionItem
                      key={item.value}
                      checkPosition="right"
                      wrapperClassName="text-sm"
                      option={{
                        label: item.label,
                        value: item.value
                      }}
                    />
                  ))}
                </O11ySelectMenuOptionGroup>
              </O11ySelectMenu>{' '}
            </div>
            error for the last
            <div className="text-base-900 mx-1">
              <O11ySelectMenu
                value={{ label: consecutiveRuns, value: consecutiveRuns }}
                onChange={(item) =>
                  setAlwaysFailing('consecutiveRuns', item.value)
                }
                disabled={isActive ? !alwaysFailingSwitchEnabled : true}
                defaultValue={{
                  label: consecutiveRunsDefault,
                  value: consecutiveRunsDefault
                }}
              >
                <O11ySelectMenuTrigger placeholder="All Categories" />
                <O11ySelectMenuOptionGroup>
                  {STATIC_DROPDOWN_DATA.map((item) => (
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
      </div>
    </section>
  );
};

AlwaysFailingTags.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isActive: PropTypes.bool.isRequired
};

AlwaysFailingTags.defaultProps = {
  data: {}
};
