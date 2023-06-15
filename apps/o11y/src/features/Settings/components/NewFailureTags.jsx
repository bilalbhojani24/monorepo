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
  const dispatch = useDispatch();
  const { failureType, consecutiveRuns, enabled: newFailureEnabled } = data;
  const {
    failureType: failureTypeDefault,
    consecutiveRuns: consecutiveRunsDefault
  } = SMART_TAGS_DEFAULT_VALUES.newFailure;

  const setNewFailure = (key, value) => {
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
        <span className="font-medium">New failures</span>
        <O11ySwitcher
          checked={newFailureEnabled}
          onChange={(value) => setNewFailure('enabled', value)}
          disabled={!isActive}
        />
      </div>
      <div className="border-b-base-300 my-3 h-1 border-b" />
      <div className="flex flex-col text-sm">
        <>
          <div className="text-base-500 flex items-center">
            The test has failed with a
            <div className="text-base-900 mx-1">
              <O11ySelectMenu
                value={{
                  label: NEW_FAILURE_TYPES_ENUM[failureType],
                  value: failureType
                }}
                onChange={(item) => setNewFailure('failureType', item.value)}
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
                  setNewFailure('consecutiveRuns', item.value)
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
