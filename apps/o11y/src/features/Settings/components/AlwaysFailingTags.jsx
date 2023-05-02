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

const ALWAYS_FAILING_TAGS_DATA = [
  { label: 'same error', value: 'same error' },
  { label: 'any error', value: 'any error' }
];

export const AlwaysFailingTags = ({ data, isActive, isLoading }) => {
  const dispatch = useDispatch();
  const {
    errorType,
    consecutiveRuns,
    enabled: alwaysFailingSwitchEnabled
  } = data;
  const activeProject = useSelector(getActiveProject);

  const setAlwaysFailingSwitch = (key, value) => {
    dispatch(
      submitSmartTagsChanges({
        projectNormalisedName: activeProject.normalisedName,
        alwaysFailing: {
          ...data,
          [key]: value
        }
      })
    );
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
          loading={isLoading}
        />
      </div>
      <div className="border-b-base-300 my-3 h-1 border-b" />
      <div className="flex flex-col">
        <>
          <div className="text-base-500 flex items-center">
            The test has been failing with
            <div className="mx-1 w-20">
              <O11ySelectMenu
                value={{ label: errorType, value: errorType }}
                defaultValue={ALWAYS_FAILING_TAGS_DATA[0]}
                onChange={(item) =>
                  setAlwaysFailingDropdowns('errorType', item.value)
                }
                disabled={isActive ? !alwaysFailingSwitchEnabled : true}
              >
                <O11ySelectMenuTrigger />
                <O11ySelectMenuOptionGroup>
                  {ALWAYS_FAILING_TAGS_DATA.map((integration) => (
                    <O11ySelectMenuOptionItem
                      checkPosition="right"
                      wrapperClassName="text-sm"
                      option={{
                        label: integration.label,
                        value: integration.value
                      }}
                    />
                  ))}
                </O11ySelectMenuOptionGroup>
              </O11ySelectMenu>{' '}
            </div>
            for last
            <div className="mx-1 w-16">
              <O11ySelectMenu
                value={{ label: consecutiveRuns, value: consecutiveRuns }}
                onChange={(item) =>
                  setAlwaysFailingDropdowns('consecutiveRuns', item.value)
                }
                disabled={isActive ? !alwaysFailingSwitchEnabled : true}
                defaultValue={{ label: 5, value: 5 }}
              >
                <O11ySelectMenuTrigger placeholder="All Categories" />
                <O11ySelectMenuOptionGroup>
                  {[
                    ...Array(29)
                      .fill(0)
                      .map((_, i) => ({ name: i + 2, value: i + 2 }))
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
            consecutive runs
          </div>
        </>
      </div>
    </section>
  );
};

AlwaysFailingTags.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isActive: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool
};

AlwaysFailingTags.defaultProps = {
  data: {},
  isLoading: false
};
