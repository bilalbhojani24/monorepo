import React from 'react';
import {
  Alerts,
  Badge,
  Button,
  CodeSnippet,
  Hyperlink,
  ListFeedsNode,
  MdCached,
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
import { twClassNames } from '@browserstack/utils';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import { EVENT_LOGS_STATUS } from 'constants/onboarding';

import EventLogs from './EventLogs';
import SetupStatus from './SetupStatus';
import useOnboarding from './useOnboarding';

const Onboarding = () => {
  const {
    CODE_SNIPPETS_SCRATCH,
    GRID_MANAGER_NAMES,
    LIST_FEED_PROPS,
    ONBOARDING_TYPES,
    SCRATCH_RADIO_GROUP_OPTIONS,
    currentProvidersRegions,
    STEP_1_RADIO_GROUP_OPTIONS,
    activeGridManagerCodeSnippet,
    breadcrumbDataTrace,
    breadcrumbStepClickHandler,
    codeSnippetsForExistingSetup,
    closeEventLogsModal,
    closeSetupStatusModal,
    continueClickHandler,
    currentStep,
    currentSelectedCloudProvider,
    eventLogsCode,
    eventLogsStatus,
    exploreAutomationClickHandler,
    frameworkURLs,
    headerText,
    isSetupComplete,
    onboardingStep,
    onboardingType,
    selectedRegion,
    setActiveGridManagerCodeSnippet,
    setCurrentCloudProvider,
    setSelectedOption,
    setSelectedRegion,
    showEventLogsModal,
    showGridHeartBeats,
    showSetupStatusModal,
    subHeaderText,
    totalSteps,
    viewAllBuildsClickHandler,
    viewEventLogsClickHandler
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
          codeSnippetsForExistingSetup?.[
            activeGridManagerCodeSnippet.toLowerCase()
          ]
        }
        language={
          activeGridManagerCodeSnippet.toLowerCase() === GRID_MANAGER_NAMES.cli
            ? 'node'
            : activeGridManagerCodeSnippet.toLowerCase()
        }
        singleLine={false}
        showLineNumbers={false}
        view="neutral"
        toolbar={TabsForCodeSnippet}
      />
    </div>
  );

  const DescriptionNodeStep1 = (
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
  );

  const DescriptionNodeStep2 = (
    <div className="my-4 w-2/5">
      <SelectMenu
        disabled={eventLogsCode && eventLogsCode.length > 0}
        onChange={(e) => {
          setSelectedRegion(e);
        }}
        value={selectedRegion}
      >
        <SelectMenuTrigger placeholder="Select Region" />
        <SelectMenuOptionGroup>
          {currentProvidersRegions?.map((item) => (
            <SelectMenuOptionItem key={item.value} option={item} />
          ))}
        </SelectMenuOptionGroup>
      </SelectMenu>
    </div>
  );

  const DescriptionNodeStep3 = (
    <p className="text-base-700 mb-4 mt-1 text-sm">
      Set up a new IAM role via the CloudFormation link and generate the AWS
      access key and secret to create and manage the Automation Grid. Read more
      about this{' '}
      <Hyperlink target="_blank" href="/" className="inline">
        here
      </Hyperlink>
      .
    </p>
  );

  const DescriptionNodeStep4 = (
    <div className="m-4">
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <ol className="text-base-500 list-[lower-alpha] text-sm">
        <li className="text-base-900 py-2">
          <div>
            <p className="text-base-900 mb-2">
              {CODE_SNIPPETS_SCRATCH['create-grid'].a.text}
            </p>
            <CodeSnippet
              code={CODE_SNIPPETS_SCRATCH['create-grid'].a.code}
              language={CODE_SNIPPETS_SCRATCH['create-grid'].a.language}
              showLineNumbers={false}
              singleLine={false}
              view="neutral"
            />
          </div>
        </li>
        <li className="text-base-900 py-2">
          <div>
            <p className="text-base-900 mb-2">
              {CODE_SNIPPETS_SCRATCH['create-grid'].b.text}
            </p>
            <CodeSnippet
              code={CODE_SNIPPETS_SCRATCH['create-grid'].b.code}
              language={CODE_SNIPPETS_SCRATCH['create-grid'].b.language}
              showLineNumbers={false}
              singleLine={false}
              view="neutral"
            />
          </div>
        </li>
        <li className="text-base-900 mb-2">
          {CODE_SNIPPETS_SCRATCH['create-grid'].c.text}
        </li>
        <div className="mb-2">
          <Alerts
            accentBorder={false}
            alphaActionFn={() => {}}
            alphaActionTitle="View Status"
            dismissButton={false}
            handleLinkClick={() => {}}
            linkText=""
            modifier="primary"
            description="This command will create an EKS cluster ‘high-scale-grid-cluster’ with a grid named ‘high-scale-grid’ that supports a concurrency of ‘50’ browsers sessions. The instance type for worker nodes will be ‘m7g.medium (vCPU-1, memory-8GB)’."
          />
        </div>
        <CodeSnippet
          code={CODE_SNIPPETS_SCRATCH['create-grid'].c.code}
          language={CODE_SNIPPETS_SCRATCH['create-grid'].c.language}
          singleLine
        />
      </ol>
    </div>
  );

  const HeaderNodeStep1 = (
    <div className="flex">
      <p className="text-base-900 text-base font-semibold">
        Choose Cloud Provider
      </p>
    </div>
  );

  const HeaderNodeStep2 = (
    <>
      <div className="flex gap-2">
        <p className="text-base-900 text-base font-semibold">
          Grid Profile Details
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
      <p className="text-base-900 text-base font-semibold">Setup IAM Role</p>
    </div>
  );

  const HeaderNodeStep4 = (
    <>
      <div className="flex">
        <p className="text-base-900 text-base font-semibold">Create Grid</p>
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

  const listFeedStepValue = (number) => (
    <span className="text-base-900 text-xs">{number}</span>
  );

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
    <div className="border-base-300 m-auto my-10 w-4/6 max-w-5xl rounded-lg border">
      <PageHeadings
        actions={
          <>
            <Hyperlink
              href="https://www.browserstack.com/docs/automation-grid"
              target="_blank"
              wrapperClassName=" gap-x-2 text-sm font-medium"
            >
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
        wrapperClassName="p-6 bg-white"
      />

      {/* Body of Onboarding */}
      <div
        // eslint-disable-next-line tailwindcss/no-arbitrary-value
        className={twClassNames(
          'overflow-auto bg-white border-base-300 px-7 ',
          {
            'h-[calc(100vh-112px-140px-48px-40px)]': onboardingStep > 0,
            'py-6':
              onboardingStep === 0 ||
              (onboardingStep === 1 &&
                onboardingType !== ONBOARDING_TYPES.scratch),
            'pt-6':
              onboardingStep === 1 &&
              onboardingType === ONBOARDING_TYPES.scratch
          }
        )}
      >
        {onboardingStep === 0 && (
          <>
            <h3 className="text-base-900 mb-4 flex gap-x-2 text-base font-medium leading-6">
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
        <div className="flex justify-between px-6 py-3">
          <div className="flex">
            <p className="text-base-500 self-center text-xs">
              By continuing, you agree to have read and understood the{' '}
              <Hyperlink
                wrapperClassName="inline text-xs text-base-900 cursor-pointer"
                href="https://www.browserstack.com/docs/automation-grid/references/terms-and-conditions"
                target="_blank"
              >
                terms & conditions
              </Hyperlink>
            </p>
          </div>
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

      {onboardingStep === 1 &&
        (onboardingType === ONBOARDING_TYPES.scratch ||
          onboardingType === ONBOARDING_TYPES.existing) &&
        (((!eventLogsCode || eventLogsCode?.length === 0) && (
          <div className="bg-base-50 text-base-700 flex gap-2 px-6 py-3">
            <HourglassBottomOutlinedIcon /> Waiting for you to complete the
            above steps to connect the grid.
          </div>
        )) ||
          (eventLogsCode && eventLogsCode.length > 0 && showGridHeartBeats && (
            <div className="text-base-700 flex gap-2 px-6 py-3">
              <HourglassBottomOutlinedIcon /> Grid heartbeats detected.
              Initialising events log...
            </div>
          )))}

      {onboardingStep === 1 &&
        (onboardingType === ONBOARDING_TYPES.scratch ||
          onboardingType === ONBOARDING_TYPES.existing) &&
        eventLogsCode &&
        eventLogsStatus === EVENT_LOGS_STATUS.IN_PROGRESS &&
        !showGridHeartBeats && (
          <div className="flex justify-between px-6 py-3">
            <div className="text-base-700 flex gap-2">
              <MdCached />
              ‘high-scale-grid’ grid creation is in progress...
            </div>
            <Button colors="white" onClick={viewEventLogsClickHandler}>
              View Event Logs
            </Button>
          </div>
        )}

      {/* --X-- Footer component --X-- */}

      {onboardingStep > 0 &&
        showEventLogsModal &&
        eventLogsCode &&
        eventLogsCode.length > 0 &&
        eventLogsStatus !== EVENT_LOGS_STATUS.FAILED &&
        !isSetupComplete && (
          <EventLogs
            closeEventLogsModal={closeEventLogsModal}
            currentStep={currentStep}
            eventLogsCode={eventLogsCode}
            totalSteps={totalSteps}
            isSetupComplete={isSetupComplete}
          />
        )}

      {onboardingStep > 0 && isSetupComplete && showSetupStatusModal && (
        <SetupStatus
          closeSetupStatusModal={closeSetupStatusModal}
          codeSnippets={CODE_SNIPPETS_SCRATCH}
          exploreAutomationClickHandler={exploreAutomationClickHandler}
          eventLogsStatus={eventLogsStatus}
          frameworkURLs={frameworkURLs}
          isSetupComplete={isSetupComplete}
          viewAllBuildsClickHandler={viewAllBuildsClickHandler}
        />
      )}
    </div>
  );
};

export default Onboarding;
