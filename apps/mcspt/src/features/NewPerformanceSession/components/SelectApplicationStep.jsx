import React from 'react';
import {
  Button,
  InputField,
  MdClose,
  MdHourglassEmpty,
  MdSearch,
  Radio
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { twClassNames } from '../../../utils';

import useSelectApplicationStep from './useSelectApplicationStep';

const SelectApplicationStep = ({ setShowNewSessionModal }) => {
  const {
    areApplicationsStillLoading,
    searchTerm,
    searchResults,
    performSearch,
    selectedApplication,
    applicationSelected,
    navigateToStep
  } = useSelectApplicationStep();

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-base-300 border-b py-5 px-4">
        <div className="flex justify-between">
          <div className="text-xl font-bold">Select Application</div>
          <div className="text-base-600 text-2xl">
            <MdClose
              onClick={() => setShowNewSessionModal((value) => !value)}
            />
          </div>
        </div>

        <div className="text-base-500 mt-1">
          Select an application to test on
        </div>
      </div>

      {!!areApplicationsStillLoading && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="bg-base-100 text-base-600 flex h-12 w-12 items-center justify-center rounded-full text-2xl">
            <MdHourglassEmpty />
          </div>

          <div className="mt-6 text-lg font-medium">
            Devices you connect will appear here
          </div>

          <div className="text-base-500 mt-1">
            Connect a device with a USB cable to start testing
          </div>
        </div>
      )}

      {!areApplicationsStillLoading && (
        <div className="relative flex flex-1 flex-col">
          <div id="searchContainer" className="border-base-200 border-b p-2">
            <InputField
              leadingIcon={
                <div className="text-base-400">
                  <MdSearch />
                </div>
              }
              value={searchTerm}
              onChange={performSearch}
              id="existingUserSessionSearch"
              placeholder="Search Applications"
            />
          </div>

          {searchResults?.length > 0 && (
            <div className="flex max-h-[342px] flex-1 flex-col overflow-y-auto">
              {searchResults.map((result) => (
                <div
                  className={twClassNames(
                    'flex items-center justify-between rounded-0 border-b p-4',
                    {
                      'border-base-200':
                        result.packageName !== selectedApplication?.packageName,
                      'border-brand-200 bg-brand-50':
                        result.packageName === selectedApplication?.packageName
                    }
                  )}
                  key={result.packageName}
                  role="presentation"
                  onClick={() => {
                    applicationSelected(result);
                  }}
                >
                  <Radio
                    id={`radio-${result.packageName}`}
                    name={result.name}
                    description={null}
                    checked={
                      result.packageName === selectedApplication?.packageName
                    }
                  />

                  <div
                    className={twClassNames('flex items-center', {
                      'text-base-500':
                        result.packageName !== selectedApplication?.packageName,
                      'text-brand-600':
                        result.packageName === selectedApplication?.packageName
                    })}
                  >
                    <div className="text-sm font-normal leading-5">
                      {result.packageName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-base-200 absolute bottom-0 flex w-full justify-between border-t bg-white p-3">
            <Button
              size="large"
              colors="white"
              variant="primary"
              onClick={() => navigateToStep(1)}
            >
              Back
            </Button>

            <Button
              size="large"
              colors="brand"
              variant="primary"
              onClick={() => navigateToStep(3)}
              disabled={!selectedApplication}
            >
              Test with selected application
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

SelectApplicationStep.propTypes = {
  setShowNewSessionModal: PropTypes.func
};

SelectApplicationStep.defaultProps = {
  setShowNewSessionModal: () => {}
};

export default SelectApplicationStep;
