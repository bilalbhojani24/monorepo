import React from 'react';
import {
  Alerts,
  Badge,
  Button,
  CodeSnippet,
  Hyperlink,
  ListFeedsNode,
  MdOutlineOpenInNew,
  PageHeadings,
  RadioGroup,
  RadioStackedCard,
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  Tabs
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { OpenInNew } from '@mui/icons-material';
import LoaderGif from 'assets/icons/loader.gif';
import {
  AGNoSetupInteracted,
  AGNoSetupStepsExecuted
} from 'constants/event-names';
import { EVENT_LOGS_STATUS } from 'constants/onboarding';
import { CREATE_GRID } from 'constants/strings';
import { AWS_IAM_DOC, CLOUD_FORMATION_LINK } from 'constants/urls';
import { logHSTEvent } from 'utils/logger';

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
    cloudProviderChangeHandler,
    cloudRegionChangeHandler,
    codeSnippetTabChangeHandler,
    continueClickHandler,
    copyCallbackFnForExistingSetup,
    copyCallbackFnForNewSetup,
    copySetupFailureCode,
    currentStep,
    currentSelectedCloudProvider,
    eventLogsCode,
    eventLogsStatus,
    exploreAutomationClickHandler,
    frameworkURLs,
    handleDismissClick,
    headerText,
    isSetupComplete,
    logTermsConditionsEvents,
    logViewDocumentationEvents,
    newGridName,
    onboardingStep,
    onboardingType,
    selectedRegion,
    setSelectedOption,
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
      defaultIndex={activeGridManagerCodeSnippet.index}
      id="tabID"
      label="Tabs"
      onTabChange={codeSnippetTabChangeHandler}
      isContained={false}
      navigationClassName="first:ml-4"
      tabsArray={[
        {
          index: 0,
          name: GRID_MANAGER_NAMES.helm
        },
        {
          index: 1,
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
            activeGridManagerCodeSnippet.name.toLowerCase()
          ]
        }
        copyCallback={() =>
          copyCallbackFnForExistingSetup(activeGridManagerCodeSnippet.name)
        }
        language={
          activeGridManagerCodeSnippet.name.toLowerCase() ===
          GRID_MANAGER_NAMES.cli
            ? 'node'
            : activeGridManagerCodeSnippet.name.toLowerCase()
        }
        singleLine={false}
        showLineNumbers={false}
        view="neutral"
        toolbar={TabsForCodeSnippet}
      />
    </div>
  );

  const DescriptionNodeStep1 = (
    <div className="mb-4 mt-2">
      <RadioGroup
        onChange={cloudProviderChangeHandler}
        options={SCRATCH_RADIO_GROUP_OPTIONS}
        selectedOption={currentSelectedCloudProvider}
      />
    </div>
  );

  const DescriptionNodeStep2 = (
    <div className="mb-4 mt-2 w-2/5">
      <SelectMenu
        disabled={eventLogsCode && eventLogsCode.length > 0}
        onChange={cloudRegionChangeHandler}
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
    <div className="mb-4">
      <p className="mb-2 mt-1 text-sm text-base-700">
        Set up a new IAM role via the CloudFormation link and generate the AWS
        access key and secret to create and manage the Automation Grid. Read
        more about this{' '}
        <Hyperlink
          onClick={() => {
            logHSTEvent([], 'web_events', AGNoSetupInteracted, {
              action: 'viewiamdoc_clicked'
            });
          }}
          target="_blank"
          href={AWS_IAM_DOC}
          className="inline"
        >
          here
        </Hyperlink>
        .
      </p>
      <Button
        colors="white"
        icon={<OpenInNew />}
        onClick={() => {
          logHSTEvent([], 'web_events', AGNoSetupStepsExecuted, {
            action: 'iamrolecf_clicked'
          });
          window.open(CLOUD_FORMATION_LINK, '_blank');
          return null;
        }}
        modifier="primary"
        variant="rounded"
      >
        Cloud Formation Link
      </Button>
    </div>
  );

  const DescriptionNodeStep4 = (
    <div className="m-4">
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <ol className="list-[lower-alpha] text-sm text-base-500">
        <li className="pb-2 text-base-900">
          <div>
            <p className="mb-2 text-base-900">
              {CODE_SNIPPETS_SCRATCH[CREATE_GRID].a.text}
            </p>
            <CodeSnippet
              code={CODE_SNIPPETS_SCRATCH[CREATE_GRID].a.code}
              copyCallback={() => {
                copyCallbackFnForNewSetup('download');
              }}
              language={CODE_SNIPPETS_SCRATCH[CREATE_GRID].a.language}
              showLineNumbers={false}
              singleLine={false}
              view="neutral"
            />
          </div>
        </li>
        <li className="py-2 text-base-900">
          <div>
            <p className="mb-2 text-base-900">
              {CODE_SNIPPETS_SCRATCH[CREATE_GRID].b.text}
            </p>
            <CodeSnippet
              code={CODE_SNIPPETS_SCRATCH[CREATE_GRID].b.code}
              copyCallback={() => {
                copyCallbackFnForNewSetup('init');
              }}
              language={CODE_SNIPPETS_SCRATCH[CREATE_GRID].b.language}
              showLineNumbers={false}
              singleLine={false}
              view="neutral"
            />
          </div>
        </li>
        <li className="mb-2 text-base-900">
          {CODE_SNIPPETS_SCRATCH[CREATE_GRID].c.text}
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
            title="Grid Details"
            description={[
              'Grid name: ‘high-scale-grid’',
              'Concurrent browser sessions: ‘50’',
              'Worker nodes instance type: ‘t3.large (vCPU-2, memory-8GB)’',
              'Cluster name: ‘high-scale-grid-cluster’'
            ]}
          />
        </div>
        <CodeSnippet
          code={CODE_SNIPPETS_SCRATCH['create-grid'].c.code}
          copyCallback={() => {
            copyCallbackFnForNewSetup('create');
          }}
          language={CODE_SNIPPETS_SCRATCH['create-grid'].c.language}
          singleLine
        />
      </ol>
    </div>
  );

  const HeaderNodeStep1 = (
    <div className="flex">
      <p className="text-sm font-semibold text-base-900">
        Choose Cloud Provider
      </p>
    </div>
  );

  const HeaderNodeStep2 = (
    <>
      <div className="flex gap-2">
        <p className="text-sm font-semibold text-base-900">
          Grid Profile Details
        </p>
        <Badge hasRemoveButton={false} modifier="warn" text="Default" />
      </div>
      <p className="mt-1 text-sm text-base-900">
        The selected region is based on the default grid profile. Select an AWS
        region nearest to your staging components.
      </p>
    </>
  );

  const HeaderNodeStep3 = (
    <div className="flex">
      <p className="text-sm font-semibold text-base-900">Setup IAM Role</p>
    </div>
  );

  const HeaderNodeStep4 = (
    <>
      <div className="flex">
        <p className="text-sm font-semibold text-base-900">Create Grid</p>
      </div>
      <p className="mt-1 text-sm text-base-700">
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
    <span className="text-xs text-base-900">{number}</span>
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
    <div className="m-auto my-10 w-4/6 max-w-4xl rounded-lg border border-base-300">
      <PageHeadings
        actions={
          <>
            <Hyperlink
              onClick={logViewDocumentationEvents}
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
          <p className="mt-2 text-sm text-base-500">{subHeaderText} </p>
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
            'pb-6':
              onboardingStep === 0 ||
              (onboardingStep === 1 &&
                onboardingType !== ONBOARDING_TYPES.scratch)
          }
        )}
      >
        {onboardingStep === 0 && (
          <>
            <h3 className="mb-2 flex gap-x-2 text-base font-medium leading-6 text-base-900">
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
              <p className="text-sm font-semibold text-base-900">Grid Setup</p>
              <p className="mt-1 text-sm text-base-900">
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
            <p className="self-center text-xs text-base-500">
              By continuing, you agree to have read and understood the{' '}
              <Hyperlink
                onClick={logTermsConditionsEvents}
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
          <div className="flex gap-2 bg-base-50 px-6 py-4 text-sm text-base-900">
            <div>
              <img src={LoaderGif} alt="" width={20} height={20} />
            </div>{' '}
            Waiting for you to complete the above steps to connect the grid.
          </div>
        )) ||
          (eventLogsCode && eventLogsCode.length > 0 && showGridHeartBeats && (
            <div className="flex gap-2 px-6 py-3 text-base-700">
              <div>
                <img src={LoaderGif} alt="" width={20} height={20} />
              </div>{' '}
              Grid heartbeats detected. Initialising events log...
            </div>
          )))}

      {onboardingStep === 1 &&
        (onboardingType === ONBOARDING_TYPES.scratch ||
          onboardingType === ONBOARDING_TYPES.existing) &&
        eventLogsCode &&
        eventLogsStatus === EVENT_LOGS_STATUS.IN_PROGRESS &&
        !showGridHeartBeats && (
          <div className="flex justify-between px-6 py-3">
            <div className="flex gap-2 text-base-700">
              <div>
                <img src={LoaderGif} alt="" width={20} height={20} />
              </div>
              ‘{newGridName}’ grid creation is in progress...
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
          copySetupFailureCode={copySetupFailureCode}
          exploreAutomationClickHandler={exploreAutomationClickHandler}
          eventLogsStatus={eventLogsStatus}
          frameworkURLs={frameworkURLs}
          handleDismissClick={handleDismissClick}
          isSetupComplete={isSetupComplete}
          viewAllBuildsClickHandler={viewAllBuildsClickHandler}
        />
      )}
    </div>
  );
};

export default Onboarding;
