import React from 'react';
import {
  Alerts,
  Badge,
  Banner,
  Button,
  CodeSnippet,
  Hyperlink,
  ListFeedsNode,
  MdCampaign,
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
import { GRID_MANAGER_NAMES } from 'constants/index';
import {
  EVENT_LOGS_STATUS,
  ONBOARDING_TYPES,
  STEP_1_RADIO_GROUP_OPTIONS
} from 'constants/setup';
import { CREATE_GRID } from 'constants/strings';
import { AWS_IAM_DOC, CLOUD_FORMATION_LINK } from 'constants/urls';
import { EventLogs } from 'features/EventLogs';
import { logHSTEvent } from 'utils/logger';

import { LIST_FEED_PROPS } from '../constants';

import CodeSnippetForExistingSetup from './CodeSnippetForExistingSetup';
import SetupStatus from './SetupStatus';
import useSetup from './useSetup';

const Setup = () => {
  const {
    CODE_SNIPPETS_FOR_SCRATCH,
    SCRATCH_RADIO_GROUP_OPTIONS,
    activeGridManagerCodeSnippet,
    breadcrumbDataTrace,
    breadcrumbStepClickHandler,
    closeEventLogsModal,
    closeSetupStatusModal,
    cloudProviderChangeHandler,
    cloudRegionChangeHandler,
    codeSnippetsForExistingSetup,
    codeSnippetTabChangeHandler,
    continueClickHandler,
    copyCallbackFnForExistingSetup,
    copyCallbackFnForNewSetup,
    copySetupFailureCode,
    currentStep,
    currentProvidersRegions,
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
    showTrialGridBanner,
    subHeaderText,
    totalSteps,
    useTrialGridBannerText,
    useTrialGridClickHandler,
    useTrialGridLoading,
    viewAllBuildsClickHandler,
    viewEventLogsClickHandler
  } = useSetup();

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
      <p className="text-base-700 mb-2 mt-1 text-sm">
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
      <ol className="text-base-500 list-[lower-alpha] text-sm">
        <li className="text-base-900 pb-2">
          <div>
            <p className="text-base-900 mb-2">
              {CODE_SNIPPETS_FOR_SCRATCH[CREATE_GRID].a.text}
            </p>
            <CodeSnippet
              code={CODE_SNIPPETS_FOR_SCRATCH[CREATE_GRID].a.code}
              copyCallback={() => {
                copyCallbackFnForNewSetup('download');
              }}
              language={CODE_SNIPPETS_FOR_SCRATCH[CREATE_GRID].a.language}
              showLineNumbers={false}
              singleLine={false}
              view="neutral"
            />
          </div>
        </li>
        <li className="text-base-900 py-2">
          <div>
            <p className="text-base-900 mb-2">
              {CODE_SNIPPETS_FOR_SCRATCH[CREATE_GRID].b.text}
            </p>
            <CodeSnippet
              code={CODE_SNIPPETS_FOR_SCRATCH[CREATE_GRID].b.code}
              copyCallback={() => {
                copyCallbackFnForNewSetup('init');
              }}
              language={CODE_SNIPPETS_FOR_SCRATCH[CREATE_GRID].b.language}
              showLineNumbers={false}
              singleLine={false}
              view="neutral"
            />
          </div>
        </li>
        <li className="text-base-900 mb-2">
          {CODE_SNIPPETS_FOR_SCRATCH[CREATE_GRID].c.text}
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
          code={CODE_SNIPPETS_FOR_SCRATCH[CREATE_GRID].c.code}
          copyCallback={() => {
            copyCallbackFnForNewSetup('create');
          }}
          language={CODE_SNIPPETS_FOR_SCRATCH[CREATE_GRID].c.language}
          singleLine
        />
      </ol>
    </div>
  );

  const HeaderNodeStep1 = (
    <div className="flex">
      <p className="text-base-900 text-sm font-semibold">
        Choose Cloud Provider
      </p>
    </div>
  );

  const HeaderNodeStep2 = (
    <>
      <div className="flex gap-2">
        <p className="text-base-900 text-sm font-semibold">
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
      <p className="text-base-900 text-sm font-semibold">Setup IAM Role</p>
    </div>
  );

  const HeaderNodeStep4 = (
    <>
      <div className="flex">
        <p className="text-base-900 text-sm font-semibold">Create Grid</p>
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
    <>
      {showTrialGridBanner && (
        <Banner
          align="extreme"
          bannerIcon={
            <MdCampaign aria-hidden="true" className="h-6 w-6 text-white" />
          }
          ctaButton={
            <Button
              colors="white"
              onClick={useTrialGridClickHandler}
              loading={useTrialGridLoading}
            >
              Use Trial Grid
            </Button>
          }
          description={useTrialGridBannerText}
          isDismissButton={false}
        />
      )}

      <div className="border-base-300 m-auto my-10 w-4/6 max-w-4xl rounded-lg border">
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
            <p className="text-base-500 mt-2 text-sm">{subHeaderText} </p>
          }
          wrapperClassName="p-6 bg-white"
        />

        {/* Body of Setup */}
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
              <h3 className="text-base-900 mb-2 flex gap-x-2 text-base font-medium leading-6">
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
                <p className="text-base-900 text-sm font-semibold">
                  Grid Setup
                </p>
                <p className="text-base-900 mt-1 text-sm">
                  Execute the below commands to initialise grid creation.
                </p>

                <CodeSnippetForExistingSetup
                  activeGridManagerCodeSnippet={activeGridManagerCodeSnippet}
                  codeSnippetsForExistingSetup={codeSnippetsForExistingSetup}
                  copyCallbackFnForExistingSetup={
                    copyCallbackFnForExistingSetup
                  }
                  TabsForCodeSnippet={TabsForCodeSnippet}
                />
              </>
            )}
        </div>
        {/* --X-- Body of Setup --X-- */}

        {/* Footer component */}
        {onboardingStep === 0 && (
          <div className="flex justify-between px-6 py-3">
            <div className="flex">
              <p className="text-base-500 self-center text-xs">
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
            <div className="bg-base-50 text-base-900 flex gap-2 px-6 py-4 text-sm">
              <div>
                <img src={LoaderGif} alt="" width={20} height={20} />
              </div>{' '}
              Waiting for you to complete the above steps to connect the grid.
            </div>
          )) ||
            (eventLogsCode &&
              eventLogsCode.length > 0 &&
              showGridHeartBeats && (
                <div className="text-base-700 flex gap-2 px-6 py-3">
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
              <div className="text-base-700 flex gap-2">
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
            codeSnippets={CODE_SNIPPETS_FOR_SCRATCH}
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
    </>
  );
};

export default Setup;
