/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import {
  Alerts,
  Badge,
  Breadcrumb,
  Button,
  Hyperlink,
  InformationCircleIcon,
  ListFeedsNode,
  MdOutlineOpenInNew,
  RadioGroup,
  RadioStackedCard,
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';

import useOnboarding from './useOnboarding';

const Onboarding = () => {
  const {
    continueClickHandler,
    headerText,
    onboardingState,
    onboardingType,
    STEP_1_RADIO_GROUP_OPTIONS,
    SELECT_OPTIONS,
    selectedOption,
    setSelectedOption,
    subHeaderText
  } = useOnboarding();

  const ListFeedProps = {
    feedIconColor: 'grey',
    feedIconSize: 'sm'
  };

  const CreateGridOnboardingSteps = (
    <div>
      <ol className="text-base-500 list-disc">
        <li className="py-2">
          <div>
            <p>Download CLI.</p>
            CODE BLOCK HERE
          </div>
        </li>
        <li className="py-2">
          <div>
            <p>Setup CLI with AWS credentials.</p>
            CODE BLOCK HERE
          </div>
        </li>
        <li className="py-2"> Execute grid creation command.</li>
        <Alerts
          accentBorder={false}
          alertIcon={<InformationCircleIcon iconClass="h-5 w-5" />}
          alphaActionFn={() => {}}
          alphaActionTitle="View Status"
          dismissButton={false}
          handleLinkClick={() => {}}
          linkText=""
          modifier="primary"
          title="This command will create an EKS cluster ‘high-scale-grid-cluster’ with a grid named ‘high-scale-grid’ that supports a concurrency of ‘50’ browsers sessions. The instance type for worker nodes will be ‘m7g.medium (vCPU-1, memory-8GB)’."
        />
        CODE BLOCK HERE
      </ol>
    </div>
  );
  const listFeedStepValue = (number) => <span>{number}</span>;

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
                  name: 'Create Automation Grid from Scratch',
                  url: '/'
                }
              ]}
              size="default"
            />
          )}

          <div className="flex justify-between">
            <p className="text-2xl font-bold leading-7">{headerText}</p>
            <Hyperlink wrapperClassName=" gap-x-2 text-sm font-medium">
              View Documentation <MdOutlineOpenInNew />
            </Hyperlink>
          </div>
          <p className="text-base-600 mt-2 text-sm">{subHeaderText}</p>
        </div>

        {/* Body of Onboarding */}
        <div className="border-base-300 border-y px-7 py-6">
          {onboardingState === 0 && (
            <>
              <h3 className="mb-4 flex gap-x-2 text-lg font-semibold leading-6">
                Do you have an existing Kubernetes setup?
              </h3>
              <RadioStackedCard
                placement="vertical"
                data={STEP_1_RADIO_GROUP_OPTIONS}
                onChange={(e) => {
                  const newlySelectedRadioButton =
                    STEP_1_RADIO_GROUP_OPTIONS.find((elem) => elem.id === e.id);
                  setSelectedOption(newlySelectedRadioButton);
                }}
              />
            </>
          )}

          {onboardingState === 1 && onboardingType === 'scratch' && (
            <>
              <ListFeedsNode
                key="1"
                descriptionNode={
                  <>
                    <RadioGroup
                      onChange={() => {}}
                      options={[
                        {
                          disabled: false,
                          id: 'radio-1',
                          name: 'Amazon Cloud'
                        },
                        {
                          disabled: true,
                          id: 'radio-2',
                          name: 'Google Cloud'
                        },
                        {
                          disabled: true,
                          id: 'radio-3',
                          name: 'Microsoft Azure'
                        }
                      ]}
                      selectedOption={{
                        disabled: false,
                        id: 'radio-1',
                        name: 'Amazon Cloud'
                      }}
                    />
                  </>
                }
                feedIcon={listFeedStepValue('1')}
                feedIconColor={ListFeedProps.feedIconColor}
                feedIconSize={ListFeedProps.feedIconSize}
                headerNode={
                  <div className="flex">
                    <p className="text-base-500 text-sm">
                      <b className="text-base-800">Choose Cloud Provider</b>
                    </p>
                  </div>
                }
              />
              <ListFeedsNode
                key="2"
                descriptionNode={
                  <>
                    <SelectMenu onChange={() => {}} value="">
                      <SelectMenuLabel>Select Region:</SelectMenuLabel>
                      <SelectMenuTrigger placeholder="Select Region" />
                      <SelectMenuOptionGroup>
                        {SELECT_OPTIONS.map((item) => (
                          <SelectMenuOptionItem
                            key={item.value}
                            option={item}
                          />
                        ))}
                      </SelectMenuOptionGroup>
                    </SelectMenu>
                  </>
                }
                feedIcon={listFeedStepValue(2)}
                feedIconColor={ListFeedProps.feedIconColor}
                feedIconSize={ListFeedProps.feedIconSize}
                headerNode={
                  <>
                    <div className="flex">
                      <p className="text-base-500 text-sm">
                        <b className="text-base-800">Grid Profile Details </b>
                      </p>
                      <Badge
                        hasRemoveButton={false}
                        modifier="warn"
                        text="Default"
                      />
                    </div>
                    <p className="text-base-500 text-sm">
                      The selected region is based on the default grid profile.
                      Select an AWS region nearest to your staging components.
                    </p>
                  </>
                }
              />
              <ListFeedsNode
                key="3"
                descriptionNode={
                  <p className="text-base-700 mt-2 text-sm">
                    Set up a new IAM role via the CloudFormation link and
                    generate the AWS access key and secret to create and manage
                    the Automation Grid. Read more about this here.
                  </p>
                }
                feedIcon={listFeedStepValue(3)}
                feedIconColor={ListFeedProps.feedIconColor}
                feedIconSize={ListFeedProps.feedIconSize}
                headerNode={
                  <div className="flex">
                    <p className="text-base-500 text-sm">
                      <b className="text-base-800">Setup IAM Role</b>
                    </p>
                  </div>
                }
              />
              <ListFeedsNode
                key="4"
                descriptionNode={CreateGridOnboardingSteps}
                feedIcon={listFeedStepValue(4)}
                feedIconColor={ListFeedProps.feedIconColor}
                feedIconSize={ListFeedProps.feedIconSize}
                headerNode={
                  <>
                    <div className="flex">
                      <p className="text-base-500 text-sm">
                        <b className="text-base-800">Create Grid</b>
                      </p>
                    </div>
                    <p>
                      Execute the below commands to setup the BrowserStack CLI
                      and create an Automation Grid.
                    </p>
                  </>
                }
              />
            </>
          )}

          {onboardingState === 1 && onboardingType === 'existing' && (
            <>
              <p>Grid Setup</p>
              <p>Execute the below commands to initialise grid creation.</p>
              CODE BLOCK HERE
            </>
          )}
        </div>
        {/* --X-- Body of Onboarding --X-- */}

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

        {onboardingState === 1 && onboardingType === 'scratch' && (
          <div className="bg-base-50 text-base-700  flex px-7 py-3">
            <HourglassBottomOutlinedIcon /> Waiting for you to complete the
            above steps to connect the grid...
          </div>
        )}

        {onboardingState === 1 && onboardingType === 'existing' && (
          <div className="bg-base-50 text-base-700  flex px-7 py-3">
            <HourglassBottomOutlinedIcon /> Waiting for you to complete the
            above steps to connect the grid...
          </div>
        )}
        {/* --X-- Footer component --X-- */}
      </div>
    </>
  );
};

export default Onboarding;
