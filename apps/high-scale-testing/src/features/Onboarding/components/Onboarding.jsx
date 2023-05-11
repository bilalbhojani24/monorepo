/* eslint-disable react/jsx-boolean-value */
/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import {
  Alerts,
  Badge,
  Breadcrumb,
  Button,
  CodeSnippet,
  CodeSnippetToolbar,
  Hyperlink,
  InformationCircleIcon,
  ListFeedsNode,
  MdOutlineInsertDriveFile,
  MdOutlineOpenInNew,
  RadioGroup,
  RadioStackedCard,
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  Tabs
} from '@browserstack/bifrost';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';

// import EventLogs from './EventLogs';
import useOnboarding from './useOnboarding';

const Onboarding = () => {
  const {
    LIST_FEED_PROPS,
    SHOW_LINE_NUMBERS,
    SHOW_SINGLE_LINE,
    STEP_1_RADIO_GROUP_OPTIONS,
    SELECT_OPTIONS,
    breadcrumbDataTrace,
    continueClickHandler,
    headerText,
    onboardingState,
    onboardingType,
    selectedOption,
    setSelectedOption,
    subHeaderText
  } = useOnboarding();

  const listFeedStepValue = (number) => <span>{number}</span>;

  const DescriptionNodeStep1 = (
    <div className="mt-4">
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
    </div>
  );

  const DescriptionNodeStep2 = (
    <div className="mt-4">
      <SelectMenu onChange={() => {}} value="">
        <SelectMenuLabel>Select Region:</SelectMenuLabel>
        <SelectMenuTrigger placeholder="Select Region" />
        <SelectMenuOptionGroup>
          {SELECT_OPTIONS.map((item) => (
            <SelectMenuOptionItem key={item.value} option={item} />
          ))}
        </SelectMenuOptionGroup>
      </SelectMenu>
    </div>
  );

  const DescriptionNodeStep3 = (
    <p className="text-base-700 mt-1 text-sm">
      Set up a <a href="/">new IAM role</a> via the CloudFormation link and
      generate the AWS access key and secret to create and manage the Automation
      Grid. Read more about this <a href="/">here</a>.
    </p>
  );

  const DescriptionNodeStep4 = (
    <div className="mt-4">
      <ol className="text-base-500 list-disc text-sm">
        <li className="py-2">
          <div>
            <p>Download CLI.</p>
            <CodeSnippet
              code="npm install @browserstack/browserstack-cli"
              singleLine
            />
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

  const HeaderNodeStep1 = (
    <div className="flex">
      <p className="text-base-500 text-sm">
        <b className="text-base-800">Choose Cloud Provider</b>
      </p>
    </div>
  );

  const HeaderNodeStep2 = (
    <>
      <div className="flex gap-1">
        <p className="text-base-500 text-sm">
          <b className="text-base-800">Grid Profile Details </b>
        </p>
        <Badge hasRemoveButton={false} modifier="warn" text="Default" />
      </div>
      <p className="text-base-900 mt-1 text-sm">
        The selected region is based on the default grid profile. Select an AWS
        region nearest to your staging components.
      </p>
    </>
  );

  const HeaderNodeStep3 = (
    <div className="flex">
      <p className="text-base-500 text-sm">
        <b className="text-base-800">Setup IAM Role</b>
      </p>
    </div>
  );

  const HeaderNodeStep4 = (
    <>
      <div className="flex">
        <p className="text-base-500 text-sm">
          <b className="text-base-800">Create Grid</b>
        </p>
      </div>
      <p className="text-base-700 mt-1 text-sm">
        Execute the below commands to setup the BrowserStack CLI and create an
        Automation Grid.
      </p>
    </>
  );

  const ListFeedsContainerComponent = (
    <>
      <ListFeedsNode
        key="1"
        descriptionNode={DescriptionNodeStep1}
        feedIcon={listFeedStepValue('1')}
        feedIconColor={LIST_FEED_PROPS.feedIconColor}
        feedIconContainerSize={LIST_FEED_PROPS.feedIconContainerSize}
        feedIconSize={LIST_FEED_PROPS.feedIconSize}
        feedIconVariant={LIST_FEED_PROPS.feedIconVariant}
        headerNode={HeaderNodeStep1}
      />
      <ListFeedsNode
        key="2"
        descriptionNode={DescriptionNodeStep2}
        feedIcon={listFeedStepValue(2)}
        feedIconColor={LIST_FEED_PROPS.feedIconColor}
        feedIconContainerSize={LIST_FEED_PROPS.feedIconContainerSize}
        feedIconSize={LIST_FEED_PROPS.feedIconSize}
        feedIconVariant={LIST_FEED_PROPS.feedIconVariant}
        headerNode={HeaderNodeStep2}
      />
      <ListFeedsNode
        key="3"
        descriptionNode={DescriptionNodeStep3}
        feedIcon={listFeedStepValue(3)}
        feedIconColor={LIST_FEED_PROPS.feedIconColor}
        feedIconContainerSize={LIST_FEED_PROPS.feedIconContainerSize}
        feedIconSize={LIST_FEED_PROPS.feedIconSize}
        feedIconVariant={LIST_FEED_PROPS.feedIconVariant}
        headerNode={HeaderNodeStep3}
      />
      <ListFeedsNode
        key="4"
        descriptionNode={DescriptionNodeStep4}
        feedIcon={listFeedStepValue(4)}
        feedIconColor={LIST_FEED_PROPS.feedIconColor}
        feedIconContainerSize={LIST_FEED_PROPS.feedIconContainerSize}
        feedIconSize={LIST_FEED_PROPS.feedIconSize}
        feedIconVariant={LIST_FEED_PROPS.feedIconVariant}
        headerNode={HeaderNodeStep4}
      />
    </>
  );

  return (
    <>
      <div className=" border-base-300 m-auto mt-28 w-4/6 max-w-4xl rounded-lg border">
        {/* Header Component */}
        <div className="bg-base-50 px-7 py-6 ">
          {onboardingState > 0 && (
            <Breadcrumb
              data={breadcrumbDataTrace}
              size="default"
              wrapperClassName="mb-2"
            />
          )}

          <div className="flex justify-between">
            <p className="text-base-900 text-2xl font-bold leading-7">
              {headerText}
            </p>
            <Hyperlink wrapperClassName=" gap-x-2 text-sm font-medium">
              View Documentation <MdOutlineOpenInNew />
            </Hyperlink>
          </div>
          <p className="text-base-500 mt-2 text-sm">{subHeaderText}</p>
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

          {onboardingState === 1 &&
            onboardingType === 'scratch' &&
            ListFeedsContainerComponent}

          {onboardingState === 1 && onboardingType === 'existing' && (
            <>
              <p className="text-base-900 font-semibold">Grid Setup</p>
              <p className="text-base-900 mt-1 text-sm">
                Execute the below commands to initialise grid creation.
              </p>
              <CodeSnippet
                code="helm upgrade --install hst-grid --namespace hst-grid --create-namespace \
--repo https://github.com/browserstack/hst/helm-chart/ helm-chart \
--set username=”<username>”  --set password=”<password>”
"
                singleLine={false}
                showLineNumbers={false}
                view="neutral"
                toolbar={
                  <Tabs
                    id="tabID"
                    label="Tabs"
                    onTabChange={(e) => {
                      console.log('Log: e:', e);
                    }}
                    isContained={false}
                    navigationClassName="first:ml-4"
                    tabsArray={[
                      {
                        name: 'Helm'
                      },
                      {
                        name: 'Kubectl'
                      },
                      {
                        name: 'cli'
                      }
                    ]}
                  />
                }
              />
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

        {/* <EventLogs /> */}
      </div>
    </>
  );
};

export default Onboarding;
