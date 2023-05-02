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

export const NewFailureTags = ({ data, isActive }) => {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const { newFailureType, consecutiveRuns, enabled: newFailureEnabled } = data;

  const setNewFailureSwitch = (key, value) => {
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
        />
      </div>
      <div className="border-b-base-300 my-3 h-1 border-b" />
      <div className="flex flex-col">
        <>
          <div className="text-base-500 flex items-center">
            Any test failing with
            <div className="mx-1 w-20">
              <O11ySelectMenu
                value={{ label: newFailureType, value: newFailureType }}
                onChange={(item) =>
                  setNewFailureDropdowns('newFailureType', item.value)
                }
                defaultValue={{ label: 'new', value: 1 }}
                disabled={!isActive}
              >
                <O11ySelectMenuTrigger placeholder="All Categories" value="" />
                <O11ySelectMenuOptionGroup>
                  {[
                    { name: 'new', value: 'new' },
                    { name: 'any', value: 'any' }
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
            for the first time among last
            <div className="mx-1 w-16">
              <O11ySelectMenu
                value={{ label: consecutiveRuns, value: consecutiveRuns }}
                onChange={(item) =>
                  setNewFailureDropdowns('consecutiveRuns', item.value)
                }
                defaultValue={{ label: 5, value: 5 }}
                disabled={!isActive}
              >
                <O11ySelectMenuTrigger placeholder="All Categories" value="" />
                <O11ySelectMenuOptionGroup>
                  {[
                    ...Array(29)
                      .fill(0)
                      .map((_, i) => ({ name: i + 1, value: i + 2 }))
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

NewFailureTags.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isActive: PropTypes.bool.isRequired
};

NewFailureTags.defaultProps = {
  data: {}
};
