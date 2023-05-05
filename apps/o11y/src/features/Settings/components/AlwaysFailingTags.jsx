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

const ALWAYS_FAILING_TAGS_DATA = [
  { label: 'same error', value: 'same error' },
  { label: 'any error', value: 'any error' }
];

const STATIC_DROPDOWN_DATA = [
  ...Array(29)
    .fill(0)
    .map((_, i) => ({ name: i + 2, value: i + 2 }))
];

export const AlwaysFailingTags = ({ data, isActive }) => {
  const [isSubmittingData, setIsSubmittingData] = useState(false);

  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);

  const {
    errorType,
    consecutiveRuns,
    enabled: alwaysFailingSwitchEnabled
  } = data;
  const {
    errorType: errorTypeDefault,
    consecutiveRuns: consecutiveRunsDefault
  } = SMART_TAGS_DEFAULT_VALUES.alwaysFailing;

  const setAlwaysFailingSwitch = (key, value) => {
    setIsSubmittingData(true);
    dispatch(
      saveSmartTagsChanges({
        alwaysFailing: {
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

  const setAlwaysFailingDropdowns = (key, value) => {
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
          onChange={(value) => setAlwaysFailingSwitch('enabled', value)}
          disabled={!isActive}
          loading={isSubmittingData}
        />
      </div>
      <div className="border-b-base-300 my-3 h-1 border-b" />
      <div className="flex flex-col">
        <>
          <div className="text-base-500 flex items-center">
            The test has been failing with
            <div className="text-base-900 mx-1 w-20">
              <O11ySelectMenu
                value={{ label: errorType, value: errorType }}
                defaultValue={{
                  label: errorTypeDefault,
                  value: errorTypeDefault
                }}
                onChange={(item) =>
                  setAlwaysFailingDropdowns('errorType', item.value)
                }
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
            for last
            <div className="text-base-900 mx-1 w-16">
              <O11ySelectMenu
                value={{ label: consecutiveRuns, value: consecutiveRuns }}
                onChange={(item) =>
                  setAlwaysFailingDropdowns('consecutiveRuns', item.value)
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
