import React from 'react';
import {
  Breadcrumb,
  Button,
  Hyperlink,
  InformationCircleIcon,
  MdOutlineOpenInNew,
  RadioTable
} from '@browserstack/bifrost';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';

import useOnboarding from './useOnboarding';

const Onboarding = () => {
  const {
    continueClickHandler,
    headerText,
    onboardingState,
    radioGroupOptions,
    selectedOption,
    // setSelectedOption,
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
                  url: '/onboarding'
                },
                {
                  current: false,
                  name: 'Create complete Automation Grid from Scratch',
                  url: '/'
                }
              ]}
              size="default"
            />
          )}

          <div>
            <div className="flex justify-between">
              <p className="text-2xl font-bold">{headerText}</p>
              <Hyperlink wrapperClassName=" gap-x-2 text-sm">
                View Documentation <MdOutlineOpenInNew />
              </Hyperlink>
            </div>
            <p className="text-base-600 mt-2">{subHeaderText}</p>
          </div>
        </div>

        {/* Body of Onboarding */}
        <div className="border-base-300 border-y px-7 py-6">
          {onboardingState === 0 && (
            <div>
              <h3 className="mb-4 flex gap-x-2 text-lg font-semibold">
                Do you have an existing Kubernetes setup?{' '}
                <InformationCircleIcon className="text-base-700 h-5 w-5 shrink-0 cursor-pointer" />
              </h3>
              <RadioTable
                direction="vertical"
                options={radioGroupOptions}
                onChange={() => {
                  // console.log('Log: e:', e);
                  // const newlySelectedRadioButton = radioGroupOptions.find(
                  //   (elem) => elem.id === e.id
                  // );
                  // setSelectedOption(newlySelectedRadioButton);
                }}
                selectedOption={selectedOption}
              />
            </div>
          )}

          {onboardingState === 1 && (
            <p>Waiting for Central component here :) </p>
          )}
        </div>

        {/* Footer component */}
        {onboardingState === 0 && (
          <div className="bg-base-50 flex justify-end px-7 py-6">
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
          <div className="bg-base-50 text-base-700  flex px-7 py-3">
            <HourglassBottomOutlinedIcon /> Waiting for you to complete the
            above steps to connect the grid...
          </div>
        )}
      </div>
    </>
  );
};

export default Onboarding;
