import React from 'react';
import { Breadcrumb, Button, RadioTable } from '@browserstack/bifrost';

import useOnboarding from './useOnboarding';

const Onboarding = () => {
  const {
    continueClickHandler,
    headerText,
    onboardingState,
    radioGroupOptions,
    selectedOption,
    setSelectedOption,
    subHeaderText
  } = useOnboarding();

  return (
    <>
      <div className=" border-base-300 m-auto mt-28 w-4/6 max-w-4xl rounded-lg border">
        {/* Header Component */}
        <div className="bg-base-50 px-7 py-6 ">
          {onboardingState > 0 && (
            <Breadcrumb
              data={[
                {
                  current: false,

                  name: 'Setup Guide',
                  url: '/'
                },
                {
                  current: false,
                  name: 'Create complete Automation Grid from Scratch',
                  url: '/'
                }
              ]}
              size="full-width"
            />
          )}

          <div>
            <div className="flex justify-between">
              <p className="text-2xl font-bold">{headerText}</p>
              View Documentation
            </div>
            <p className="mt-2">{subHeaderText}</p>
          </div>
        </div>

        {/* Body of Onboarding */}
        <div className="border-base-300 border-y px-7 py-6">
          {onboardingState === 0 && (
            <div>
              <h3 className="mb-4">
                {' '}
                Do you have an existing Kubernetes setup?{' '}
              </h3>
              <RadioTable
                direction="vertical"
                options={radioGroupOptions}
                selectedOption={selectedOption}
                onChange={(e, selectedRadioButtonID) => {
                  const newlySelectedRadioButtonID = radioGroupOptions.find(
                    (elem) => elem.id === selectedRadioButtonID
                  );
                  setSelectedOption(newlySelectedRadioButtonID);
                }}
              />
            </div>
          )}
        </div>

        {/* Footer component */}
        <div className="bg-base-50 flex justify-end px-7 ">
          {onboardingState === 0 && (
            <div className="py-6">
              <Button
                colors="brand"
                onClick={continueClickHandler}
                size="default"
                type="button"
                variant="primary"
              >
                Continue
              </Button>
            </div>
          )}

          {onboardingState === 1 && (
            <div>
              {' '}
              Icon Waiting for you to complete the above steps to connect the
              grid...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Onboarding;
