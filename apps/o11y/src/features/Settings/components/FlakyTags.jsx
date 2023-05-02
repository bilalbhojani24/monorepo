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

export const FlakyTags = ({ data, isActive, isLoading }) => {
  const dispatch = useDispatch();
  const { automaticFlaky, flakeInHistory, flakeInRerun } = data;
  const activeProject = useSelector(getActiveProject);

  const updateAutomaticFlakyTags = (key, value) => {
    dispatch(
      submitSmartTagsChanges({
        projectNormalisedName: activeProject.normalisedName,
        flaky: { ...data, [key]: value }
      })
    );
  };

  const setTestStatusFlippingSwitch = (value) => {
    dispatch(
      submitSmartTagsChanges({
        projectNormalisedName: activeProject.normalisedName,
        flaky: {
          ...data,
          flakeInHistory: {
            ...flakeInHistory,
            enabled: value
          }
        }
      })
    );
  };
  const setTestStatusFlipping = (item) => {
    dispatch(
      saveSmartTagsChanges({
        projectNormalisedName: activeProject.normalisedName,
        flaky: {
          ...data,
          flakeInHistory: {
            ...flakeInHistory,
            testStatusFlipping: item.value
          }
        }
      })
    );
  };
  const setTestStatusFlippingTotal = (item) => {
    dispatch(
      saveSmartTagsChanges({
        projectNormalisedName: activeProject.normalisedName,
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
    dispatch(
      submitSmartTagsChanges({
        projectNormalisedName: activeProject.normalisedName,
        flaky: {
          ...data,
          flakeInRerun: {
            ...flakeInRerun,
            enabled: value
          }
        }
      })
    );
  };

  const setFlakeInRerun = (item) => {
    dispatch(
      saveSmartTagsChanges({
        projectNormalisedName: activeProject.normalisedName,
        flaky: {
          ...data,
          flakeInRerun: {
            ...flakeInRerun,
            testStatusFlipping: item.value
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
          loading={isLoading}
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
              loading={isLoading}
            />
          </div>
          <div className="text-base-500 flex flex-wrap items-center">
            Test status flipping (pass to fail or vice-versa) more than{' '}
            <span className="mx-1 w-16">
              <O11ySelectMenu
                value={{
                  label: flakeInHistory.testStatusFlipping,
                  value: flakeInHistory.testStatusFlipping
                }}
                onChange={setTestStatusFlipping}
                defaultValue={{ label: 10, value: 10 }}
                disabled={isActive ? !automaticFlaky : true}
              >
                <O11ySelectMenuTrigger placeholder="All Categories" value="" />
                <O11ySelectMenuOptionGroup>
                  {[
                    ...Array(10)
                      .fill(0)
                      .map((_, i) => ({
                        name: `${(i + 1) * 10}%`,
                        value: (i + 1) * 10
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
            </span>
            times out of{' '}
            <div className="mx-1 w-16">
              <O11ySelectMenu
                value={{
                  label: flakeInHistory.testStatusFlippingTotal,
                  value: flakeInHistory.testStatusFlippingTotal
                }}
                onChange={setTestStatusFlippingTotal}
                defaultValue={{ label: 10, value: 10 }}
                disabled={isActive ? !automaticFlaky : true}
              >
                <O11ySelectMenuTrigger placeholder="All Categories" value="" />
                <O11ySelectMenuOptionGroup>
                  {[
                    ...Array(10)
                      .fill(0)
                      .map((_, i) => ({ name: i + 1, value: i + 1 }))
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
            across consecutive runs
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
              loading={isLoading}
            />
          </div>
          <div className="text-base-500 flex items-center">
            Test passing on a retry attempt in the same run across last
            <div className="mx-1 w-16">
              <O11ySelectMenu
                value={{ label: flakeInRerun.rerun, value: flakeInRerun.rerun }}
                onChange={setFlakeInRerun}
                defaultValue={{ label: 10, value: 10 }}
                disabled={isActive ? !automaticFlaky : true}
              >
                <O11ySelectMenuTrigger placeholder="Select" />
                <O11ySelectMenuOptionGroup>
                  {[
                    ...Array(30)
                      .fill(0)
                      .map((_, i) => ({ name: i + 1, value: i + 1 }))
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
            consecutive runs
          </div>
        </>
      </div>
    </section>
  );
};

FlakyTags.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isActive: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool
};

FlakyTags.defaultProps = {
  data: {},
  isLoading: false
};
