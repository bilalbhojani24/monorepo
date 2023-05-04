import React from 'react';
import { Button, RadioGroup } from '@browserstack/bifrost';

const Onboarding = () => {
  const headerText = 'Hey John Doe, Welcome to High Scale Testing';
  const subHeaderText =
    'Create your own Automation Grid to support functional testing at scale';

  const radioGroupOptions = [
    {
      description: 'Create complete Automation Grid from scratch',
      disabled: false,
      id: 'radio-1',
      name: "No, I don't have a setup"
    },
    {
      description: 'Create Automation Grid in my existing Kubernetes setup',
      disabled: false,
      id: 'radio-2',
      name: 'Yes, I have a setup'
    }
  ];

  return (
    <>
      <div className=" border-base-300 m-auto mt-28 w-4/6 max-w-4xl rounded-lg border">
        <div className="bg-base-50 px-7 py-6 ">
          <div className="flex justify-between">
            <p className="text-2xl font-bold">{headerText}</p>
            View Documentation
          </div>
          <p className="mt-2">{subHeaderText}</p>
        </div>
        <div className="border-base-300 border-y px-7 py-6">
          <h3 className="mb-4"> Do you have an existing Kubernetes setup? </h3>
          <RadioGroup
            direction="vertical"
            options={radioGroupOptions}
            selectedOption={{
              description: 'Create complete Automation Grid from scratch',
              disabled: false,
              id: 'radio-1',
              name: "No, I don't have a setup"
            }}
          />
        </div>
        <div className="bg-base-50 flex justify-end px-7 py-6">
          <Button variant="primary" type="button" colors="brand" size="default">
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
