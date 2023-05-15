/* eslint-disable react/jsx-boolean-value */
/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import {
  Alerts,
  Badge,
  Button,
  CodeSnippet,
  Hyperlink,
  InformationCircleIcon,
  ListFeedsNode,
  MdOutlineOpenInNew,
  PageHeadings,
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
import classnames from 'classnames';

import EventLogs from './EventLogs';
import useOnboarding from './useOnboarding';

const Onboarding = () => {
  const {
    CODE_SNIPPETS_EXISTING,
    CODE_SNIPPETS_SCRATCH,
    GRID_MANAGER_NAMES,
    LIST_FEED_PROPS,
    ONBOARDING_TYPES,
    SCRATCH_RADIO_GROUP_OPTIONS,
    SELECT_OPTIONS,
    STEP_1_RADIO_GROUP_OPTIONS,
    activeGridManagerCodeSnippet,
    breadcrumbDataTrace,
    breadcrumbStepClickHandler,
    continueClickHandler,
    eventLogsCode,
    headerText,
    onboardingStep,
    onboardingType,
    selectedRegion,
    setActiveGridManagerCodeSnippet,
    setSelectedOption,
    setSelectedRegion,
    subHeaderText
  } = useOnboarding();

  const TabsForCodeSnippet = (
    <Tabs
      id="tabID"
      label="Tabs"
      onTabChange={(e) => {
        setActiveGridManagerCodeSnippet(e.name);
      }}
      isContained={false}
      navigationClassName="first:ml-4"
      tabsArray={[
        {
          name: GRID_MANAGER_NAMES.helm
        },
        {
          name: GRID_MANAGER_NAMES.kubectl
        },
        {
          name: GRID_MANAGER_NAMES.cli
        }
      ]}
    />
  );

  const CodeSnippetForExistingSetup = (
    <div className="mt-4">
      <CodeSnippet
        code={
          CODE_SNIPPETS_EXISTING[activeGridManagerCodeSnippet.toLowerCase()]
        }
        singleLine={false}
        showLineNumbers={false}
        view="neutral"
        toolbar={TabsForCodeSnippet}
      />
    </div>
  );

  const DescriptionNodeStep1 = (
    <div className="mt-4">
      <RadioGroup
        onChange={() => {}}
        options={SCRATCH_RADIO_GROUP_OPTIONS}
        selectedOption={{
          disabled: false,
          id: 'radio-1',
          name: 'Amazon Cloud'
        }}
      />
    </div>
  );

  const DescriptionNodeStep2 = (
    <div className="mt-4 w-2/5">
      <SelectMenu
        onChange={(e) => {
          setSelectedRegion(e);
        }}
        value={selectedRegion}
      >
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
            <p>{CODE_SNIPPETS_SCRATCH['create-grid'].a.text}</p>
            <CodeSnippet
              code={CODE_SNIPPETS_SCRATCH['create-grid'].a.code}
              singleLine
            />
          </div>
        </li>
        <li className="py-2">
          <div>
            <p>{CODE_SNIPPETS_SCRATCH['create-grid'].b.text}</p>
            <CodeSnippet
              code={CODE_SNIPPETS_SCRATCH['create-grid'].b.code}
              singleLine
            />
          </div>
        </li>
        <li className="py-2">{CODE_SNIPPETS_SCRATCH['create-grid'].c.text}</li>
        <div className="mb-2">
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
        </div>
        <CodeSnippet
          code={CODE_SNIPPETS_SCRATCH['create-grid'].c.code}
          singleLine
        />
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

  const listFeedHeaderNode = (step) => {
    switch (step) {
      case 1:
        return HeaderNodeStep1;
      case 2:
        return HeaderNodeStep2;
      case 3:
        return HeaderNodeStep3;
      case 4:
        return HeaderNodeStep4;
      default:
        break;
    }
    return null;
  };

  const listFeedStepValue = (number) => <span>{number}</span>;

  const listFeedDescriptionNode = (step) => {
    switch (step) {
      case 1:
        return DescriptionNodeStep1;
      case 2:
        return DescriptionNodeStep2;
      case 3:
        return DescriptionNodeStep3;
      case 4:
        return DescriptionNodeStep4;
      default:
        break;
    }
    return null;
  };

  const ListFeedsContainerComponent = (
    <>
      {[1, 2, 3, 4].map((x) => (
        <ListFeedsNode
          key={x}
          descriptionNode={listFeedDescriptionNode(x)}
          feedIcon={listFeedStepValue(x)}
          {...LIST_FEED_PROPS}
          headerNode={listFeedHeaderNode(x)}
        />
      ))}
    </>
  );

  return (
    <div className=" border-base-300 m-auto mb-10 mt-28 w-4/6 max-w-4xl rounded-lg border">
      <PageHeadings
        actions={
          <>
            <Hyperlink wrapperClassName=" gap-x-2 text-sm font-medium">
              View Documentation <MdOutlineOpenInNew />
            </Hyperlink>
          </>
        }
        breadcrumbs={onboardingStep > 0 ? breadcrumbDataTrace : ''}
        heading={headerText}
        onBreadcrumbClick={breadcrumbStepClickHandler}
        subSection={
          <p className="text-base-500 mt-2 text-sm">{subHeaderText} </p>
        }
        wrapperClassName="bg-base-50 px-7 py-6 "
      />

      {/* Body of Onboarding */}
      <div
        // eslint-disable-next-line tailwindcss/no-arbitrary-value
        className={classnames(
          'border-base-300 overflow-scroll border-y px-7 py-6',
          { 'h-[calc(100vh-112px-140px-48px-40px)]': onboardingStep > 0 }
        )}
      >
        {onboardingStep === 0 && (
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

        {onboardingStep === 1 &&
          onboardingType === ONBOARDING_TYPES.scratch &&
          ListFeedsContainerComponent}

        {onboardingStep === 1 &&
          onboardingType === ONBOARDING_TYPES.existing && (
            <>
              <p className="text-base-900 font-semibold">Grid Setup</p>
              <p className="text-base-900 mt-1 text-sm">
                Execute the below commands to initialise grid creation.
              </p>

              {CodeSnippetForExistingSetup}
            </>
          )}
      </div>
      {/* --X-- Body of Onboarding --X-- */}

      {/* Footer component */}
      {onboardingStep === 0 && (
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

      {onboardingStep === 1 && onboardingType === ONBOARDING_TYPES.scratch && (
        <div className="bg-base-50 text-base-700  flex px-7 py-3">
          <HourglassBottomOutlinedIcon /> Waiting for you to complete the above
          steps to connect the grid...
        </div>
      )}

      {onboardingStep === 1 && onboardingType === ONBOARDING_TYPES.existing && (
        <div className="bg-base-50 text-base-700  flex px-7 py-3">
          <HourglassBottomOutlinedIcon /> Waiting for you to complete the above
          steps to connect the grid...
        </div>
      )}
      {/* --X-- Footer component --X-- */}

      {/* <EventLogs eventLogsCode={eventLogsCode} /> */}
    </div>
  );
};

export default Onboarding;
