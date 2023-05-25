import React from 'react';
import {
  InputField,
  PageHeadings,
  RadioGroup,
  Steps
} from '@browserstack/bifrost';
import { SCRATCH_RADIO_GROUP_OPTIONS } from 'constants/index';

import useCreateGrid from './useCreateGrid';

const CreateGrid = () => {
  const { currentSelectedCloudProvider, setCurrentCloudProvider } =
    useCreateGrid();

  const breadcrumbsData = [
    {
      current: false,
      name: 'Automation Console',
      url: '/grid-console',
      goToStep: 0
    },
    {
      current: false,
      name: 'Create automation grid',
      url: '#',
      goToStep: 1
    }
  ];

  return (
    <div className="w-full">
      <PageHeadings
        breadcrumbs={breadcrumbsData}
        heading="Create Automation Grid"
        onBreadcrumbClick={() => {}}
        wrapperClassName="bg-white p-6"
      />
      <div className="flex">
        <Steps
          format="bullets-and-text"
          label="label"
          onClick={() => {}}
          steps={[
            {
              id: '1',
              name: 'Choose Cloud Provider',
              status: 'complete'
            },
            {
              id: '2',
              name: 'Configure Grid Profile',
              status: 'current_completed'
            },
            {
              id: '3',
              name: 'Setup IAM Role',
              status: 'current'
            },
            {
              id: '4',
              name: 'Create Grid',
              status: 'upcoming'
            }
          ]}
        />
        <div className="w-full">
          <div className="border-base-300 m-6 rounded-lg border bg-white p-6">
            Grid Console
            {/* Choose Cloud Provider */}
            <div>
              <p>Choose Cloud Provider</p>
              <p>
                Currently we support only AWS but GCP and Azure will be
                supported soon.
              </p>
              <div className="my-4">
                <RadioGroup
                  onChange={(e, option) => {
                    const newOption = SCRATCH_RADIO_GROUP_OPTIONS.find(
                      (item) => item.id === option
                    );

                    setCurrentCloudProvider(newOption);
                  }}
                  options={SCRATCH_RADIO_GROUP_OPTIONS}
                  selectedOption={currentSelectedCloudProvider}
                />
              </div>
            </div>
            {/* ----- */}
            {/* Configure Grid Profile */}
            <div>
              <p>Configure Grid Profile</p>
              <p>
                The current settings are based on the default grid profile. You
                can make the changes and save it as a new profile.
              </p>

              <div>
                <InputField
                  id="test-id"
                  label="Grid Name"
                  onBlur={null}
                  onChange={null}
                  onFocus={null}
                  onKeyDown={null}
                  placeholder="high-scale-grid"
                />

                <InputField
                  id="test-id"
                  label="Concurrency"
                  onBlur={null}
                  onChange={null}
                  onFocus={null}
                  onKeyDown={null}
                  placeholder="high-scale-grid"
                />

                <InputField
                  id="test-id"
                  label="Cluster"
                  onBlur={null}
                  onChange={null}
                  onFocus={null}
                  onKeyDown={null}
                  placeholder="high-scale-grid"
                />
              </div>
            </div>
            {/* ----- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGrid;
