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

const NEW_FAILURE_TYPES_DATA = [
  { name: 'new', value: 'NEW' },
  { name: 'any', value: 'ANY' }
];
const NEW_FAILURE_TYPES_ENUM = {
  NEW: 'new',
  ANY: 'any'
};
const STATIC_DROPDOWN_DATA = [
  ...Array(29)
    .fill(0)
    .map((_, i) => ({ name: i + 2, value: i + 2 }))
];

export const NewFailureTags = ({ data, isActive }) => {
  const [isSubmittingData, setIsSubmittingData] = useState(false);

  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const { failureType, consecutiveRuns, enabled: newFailureEnabled } = data;
  const {
    failureType: failureTypeDefault,
    consecutiveRuns: consecutiveRunsDefault
  } = SMART_TAGS_DEFAULT_VALUES.newFailure;

  const setNewFailureSwitch = (key, value) => {
    setIsSubmittingData(true);
    dispatch(
      saveSmartTagsChanges({
        newFailure: {
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

  const setNewFailureDropdowns = (key, value) => {
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
        <span className="text-lg font-medium">New failures</span>
        <O11ySwitcher
          checked={newFailureEnabled}
          onChange={(value) => setNewFailureSwitch('enabled', value)}
          disabled={!isActive}
          loading={isSubmittingData}
        />
      </div>
      <div className="border-b-base-300 my-3 h-1 border-b" />
      <div className="flex flex-col">
        <>
          <div className="text-base-500 flex items-center">
            The test has failed with a
            <div className="text-base-900 mx-1">
              <O11ySelectMenu
                value={{
                  label: NEW_FAILURE_TYPES_ENUM[failureType],
                  value: failureType
                }}
                onChange={(item) =>
                  setNewFailureDropdowns('failureType', item.value)
                }
                defaultValue={{
                  label: failureTypeDefault,
                  value: failureTypeDefault
                }}
                disabled={!isActive || !newFailureEnabled}
              >
                <O11ySelectMenuTrigger placeholder="All Categories" value="" />
                <O11ySelectMenuOptionGroup>
                  {NEW_FAILURE_TYPES_DATA.map((item) => (
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
            for the first time among the last
            <div className="text-base-900 mx-1">
              <O11ySelectMenu
                value={{ label: consecutiveRuns, value: consecutiveRuns }}
                onChange={(item) =>
                  setNewFailureDropdowns('consecutiveRuns', item.value)
                }
                defaultValue={{
                  label: consecutiveRunsDefault,
                  value: consecutiveRunsDefault
                }}
                disabled={!isActive || !newFailureEnabled}
              >
                <O11ySelectMenuTrigger placeholder="All Categories" value="" />
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
            runs
          </div>
        </>
      </div>
    </section>
  );
};

NewFailureTags.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isActive: PropTypes.bool.isRequired
};

NewFailureTags.defaultProps = {
  data: {}
};
