import React from 'react';
import {
  Accordion,
  AccordionPanel,
  AccordionSimpleHeader,
  Button,
  CodeSnippet,
  ComboBox,
  ComboboxAddNewItem,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  InputField,
  MdAdd,
  MdCached,
  Modal,
  ModalHeader,
  PageHeadings,
  RadioGroup,
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  Steps,
  Tabs
} from '@browserstack/bifrost';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import {
  CREATE_GRID_TYPES,
  GRID_MANAGER_NAMES,
  SCRATCH_RADIO_GROUP_OPTIONS
} from 'constants/index';
import { EVENT_LOGS_STATUS } from 'constants/onboarding';
import EventLogs from 'features/Onboarding/components/EventLogs';
import SetupStatus from 'features/Onboarding/components/SetupStatus';

import useCreateGrid from './useCreateGrid';

const CreateGrid = () => {
  const {
    CODE_SNIPPETS_SCRATCH,
    IS_MANDATORY,
    activeGridManagerCodeSnippet,
    breadcrumbsData,
    closeEventLogsModal,
    closeSetupStatusModal,
    clusterChangeHandler,
    clusterNameInputChangeHandler,
    codeSnippetsForExistingSetup,
    collapsibleBtntextForAdvSettings,
    collapsibleBtntextForCode,
    concurrencyErrorText,
    creatingGridProfile,
    currentProvidersInstanceTypes,
    currentProvidersRegions,
    currentSelectedCloudProvider,
    currentStep,
    dataChanged,
    displaySubnetsItemsArray,
    displayVPCItemsArray,
    // editClusterBtnClickHandler,
    editClusterNameInputValue,
    editClusterNameErrorText,
    eventLogsCode,
    eventLogsStatus,
    exploreAutomationClickHandler,
    frameworkURLs,
    gridConcurrencyChangeHandler,
    gridNameChangeHandler,
    gridProfiles,
    handleDismissClick,
    instanceChangeHandler,
    isExactSubnetMatch,
    isExactVPCMatch,
    isSetupComplete,
    isSubnetLoading,
    isVPCLoading,
    modalCrossClickhandler,
    newGridName,
    newProfileNameValue,
    opened,
    newProfileErrorText,
    nextBtnClickHandler,
    ref,
    regionChangeHandler,
    saveAndProceedClickHandler,
    saveChangesClickHander,
    saveProfileChangeHandler,
    selectedClusterValue,
    selectedGridClusters,
    selectedGridConcurrency,
    selectedGridName,
    selectedGridProfile,
    selectedInstanceType,
    selectedRegion,
    selectedSubnetValues,
    selectedVPCValue,
    setActiveGridManagerCodeSnippet,
    setupBtnClickHandler,
    setCurrentCloudProvider,
    setOpened,
    setSelectedGridProfile,
    setSubnetQuery,
    setupNewClusterBtnClickHandler,
    setupState,
    setVPCQuery,
    showEventLogsModal,
    showGridHeartBeats,
    showSaveProfileModal,
    showSetupClusterModal,
    showSetupStatusModal,
    stepperClickHandler,
    stepperStepsState,
    subnetChangeHandler,
    subnetInputChangeHandler,
    subnetQuery,
    totalSteps,
    type,
    viewAllBuildsClickHandler,
    viewEventLogsClickHandler,
    vpcChangeHandler,
    VPCInputChangeHandler,
    VPCQuery
  } = useCreateGrid();

  const ClusterInputComboBoxComponent = (
    <ComboBox
      onChange={clusterChangeHandler}
      value={selectedClusterValue}
      isMulti={false}
      isMandatory={IS_MANDATORY}
    >
      <ComboboxLabel>Choose Cluster</ComboboxLabel>
      <ComboboxTrigger />
      <ComboboxOptionGroup>
        {selectedGridClusters.map((item) => (
          <ComboboxOptionItem key={item.value} option={item} />
        ))}
      </ComboboxOptionGroup>
    </ComboBox>
  );

  const ClusterInputTextComponent = (
    <InputField
      errorText={editClusterNameErrorText}
      id="test-id"
      label="Cluster Name"
      onBlur={null}
      onChange={clusterNameInputChangeHandler}
      onFocus={null}
      onKeyDown={null}
      placeholder="my-sample-cluster"
      disabled={!showSetupClusterModal}
      isMandatory={IS_MANDATORY}
      value={editClusterNameInputValue}
    />
  );

  // const DomainInputComponent = (
  //   <InputField
  //     addOnBefore={<InputGroupAddOn>https://</InputGroupAddOn>}
  //     id="test-id"
  //     label="Domain"
  //     onBlur={null}
  //     onChange={null}
  //     onFocus={null}
  //     onKeyDown={null}
  //     placeholder="www.hst.browserstack.com"
  //     disabled={!showSetupClusterModal}
  //   />
  // );

  const InstanceTypeInputComponent = (
    <ComboBox
      onChange={instanceChangeHandler}
      value={selectedInstanceType}
      isMulti={false}
      disabled={!showSetupClusterModal}
    >
      <ComboboxLabel>
        Instance Type
        <span className="text-danger-600 ml-0.5">*</span>
      </ComboboxLabel>
      <ComboboxTrigger placeholder="Placeholder" />
      <ComboboxOptionGroup>
        {currentProvidersInstanceTypes.map((item) => (
          <ComboboxOptionItem key={item.value} option={item} />
        ))}
      </ComboboxOptionGroup>
    </ComboBox>
  );

  const RegionInputComponent = (
    <SelectMenu
      onChange={regionChangeHandler}
      value={selectedRegion}
      disabled={!showSetupClusterModal}
    >
      <SelectMenuLabel>
        Region
        <span className="text-danger-600 ml-0.5">*</span>
      </SelectMenuLabel>
      <SelectMenuTrigger ref={ref} />
      <SelectMenuOptionGroup>
        {currentProvidersRegions.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  );

  const SubnetsInputComponent = (
    <ComboBox
      disabled={!showSetupClusterModal}
      isMulti
      isRightLoading={isSubnetLoading}
      onChange={subnetChangeHandler}
      onOpenChange={(status) => {
        if (!status) setSubnetQuery('');
      }}
      value={selectedSubnetValues}
    >
      <ComboboxLabel>Subnets</ComboboxLabel>
      <ComboboxTrigger
        onInputValueChange={subnetInputChangeHandler}
        placeholder="Placeholder"
      />
      <ComboboxOptionGroup
        addNewItemComponent={
          !isExactSubnetMatch && subnetQuery.length > 0 ? (
            <ComboboxAddNewItem
              suffix="as a new option (↵)"
              prefix="Add"
              showQuery
            />
          ) : null
        }
      >
        {displaySubnetsItemsArray.map((item) => (
          <ComboboxOptionItem key={item.value} option={item} />
        ))}
      </ComboboxOptionGroup>
    </ComboBox>
  );

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
          name: GRID_MANAGER_NAMES.cli
        }
      ]}
    />
  );

  const VPCInputComponent = (
    <ComboBox
      disabled={!showSetupClusterModal}
      isMulti={false}
      isRightLoading={isVPCLoading}
      onChange={vpcChangeHandler}
      onOpenChange={(status) => {
        if (!status) setVPCQuery('');
      }}
      value={selectedVPCValue}
    >
      <ComboboxLabel>VPC ID</ComboboxLabel>
      <ComboboxTrigger
        onInputValueChange={VPCInputChangeHandler}
        placeholder="Placeholder"
      />
      <ComboboxOptionGroup
        addNewItemComponent={
          !isExactVPCMatch && VPCQuery.length > 0 ? (
            <ComboboxAddNewItem
              suffix="as a new option (↵)"
              prefix="Add"
              showQuery
            />
          ) : null
        }
      >
        {displayVPCItemsArray.map((item) => (
          <ComboboxOptionItem key={item.value} option={item} />
        ))}
      </ComboboxOptionGroup>
    </ComboBox>
  );

  return (
    <div className="w-full">
      <PageHeadings
        breadcrumbs={breadcrumbsData}
        heading="Create Automation Grid"
        onBreadcrumbClick={() => {}}
        wrapperClassName="bg-white p-6"
      />

      {type === CREATE_GRID_TYPES.helmKubeCTL && (
        <div className="border-base-300 m-6 overflow-auto rounded-lg border bg-white">
          {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
          <div className="h-[calc(100vh-64px-104px-48px-62px)] p-6">
            <p className="text-base-900 text-sm font-semibold">Grid Setup</p>
            <p className="text-base-900 mt-1 text-sm">
              Execute the below commands to initialise grid creation.
            </p>

            <div className="mt-4">
              <CodeSnippet
                code={
                  codeSnippetsForExistingSetup?.[
                    activeGridManagerCodeSnippet.toLowerCase()
                  ]
                }
                language={
                  activeGridManagerCodeSnippet.toLowerCase() ===
                  GRID_MANAGER_NAMES.cli
                    ? 'node'
                    : activeGridManagerCodeSnippet.toLowerCase()
                }
                singleLine={false}
                showLineNumbers={false}
                view="neutral"
                toolbar={TabsForCodeSnippet}
              />
            </div>
          </div>

          {(!eventLogsCode || eventLogsCode?.length === 0) &&
            eventLogsStatus !== EVENT_LOGS_STATUS.IN_PROGRESS && (
              <div className="border-base-300 text-base-700 flex gap-2 border-t px-6 py-3">
                <HourglassBottomOutlinedIcon /> Waiting for you to complete the
                above steps to connect the grid...
              </div>
            )}

          {eventLogsCode && eventLogsCode.length > 0 && showGridHeartBeats && (
            <div className="text-base-700 flex gap-2 px-6 py-3">
              <HourglassBottomOutlinedIcon /> Grid heartbeats detected.
              Initialising events log...
            </div>
          )}

          {eventLogsCode &&
            eventLogsStatus === EVENT_LOGS_STATUS.IN_PROGRESS &&
            !showGridHeartBeats && (
              <div className="flex justify-between px-6 py-3">
                <div className="text-base-700 flex gap-2">
                  <MdCached />‘{newGridName}’ grid creation is in progress...
                </div>
                <Button colors="white" onClick={viewEventLogsClickHandler}>
                  View Event Logs
                </Button>
              </div>
            )}

          {showEventLogsModal && (
            <EventLogs
              closeEventLogsModal={closeEventLogsModal}
              currentStep={currentStep}
              eventLogsCode={eventLogsCode}
              totalSteps={totalSteps}
              isSetupComplete={isSetupComplete}
            />
          )}

          {isSetupComplete && showSetupStatusModal && (
            <SetupStatus
              closeSetupStatusModal={closeSetupStatusModal}
              codeSnippets={CODE_SNIPPETS_SCRATCH}
              exploreAutomationClickHandler={exploreAutomationClickHandler}
              eventLogsStatus={eventLogsStatus}
              frameworkURLs={frameworkURLs}
              handleDismissClick={handleDismissClick}
              isSetupComplete={isSetupComplete}
              viewAllBuildsClickHandler={viewAllBuildsClickHandler}
            />
          )}
        </div>
      )}

      {type === CREATE_GRID_TYPES.cli && (
        <div className="flex">
          <div className="">
            <Steps
              format="circles-with-text"
              label="label"
              onClick={stepperClickHandler}
              steps={stepperStepsState}
              wrapperClassName="m-6 w-64"
            />
          </div>

          <div className="w-full">
            <div className="border-base-300 my-6 mr-6 rounded-lg border bg-white ">
              {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
              <div className="h-[calc(100vh-64px-104px-48px-62px)] overflow-auto p-6">
                {/* Setup Grid and Cluster */}
                {setupState === 1 && (
                  <div>
                    {/* Choose Grid Profile */}
                    <>
                      <p className="text-base-900 text-sm font-semibold">
                        Choose Grid Profile
                      </p>
                      <p className="text-base-500 mt-1 text-sm">
                        Use previously saved profiles to configure Grid settings
                        with pre-filled values.
                      </p>

                      <div className="mb-8 mt-3 w-1/2">
                        <SelectMenu
                          onChange={(val) => setSelectedGridProfile(val)}
                          value={selectedGridProfile}
                        >
                          <SelectMenuTrigger ref={ref} />
                          <SelectMenuOptionGroup>
                            {gridProfiles.map((item) => (
                              <SelectMenuOptionItem
                                key={item.value}
                                option={item}
                              />
                            ))}
                          </SelectMenuOptionGroup>
                        </SelectMenu>
                      </div>
                    </>
                    {/* --- X --- Choose Grid Profile --- X --- */}

                    {/* Choose Cloud Provider */}
                    <>
                      <div>
                        <p className="text-base-900 text-sm font-medium">
                          Choose Cloud Provider
                        </p>
                        <p className="text-base-500  mt-1 text-sm font-normal">
                          Currently we support only AWS but GCP and Azure will
                          be supported soon.
                        </p>

                        <div className="mb-8 mt-3">
                          <RadioGroup
                            onChange={(e, option) => {
                              const newOption =
                                SCRATCH_RADIO_GROUP_OPTIONS.find(
                                  (item) => item.id === option
                                );

                              setCurrentCloudProvider(newOption);
                            }}
                            options={SCRATCH_RADIO_GROUP_OPTIONS}
                            selectedOption={currentSelectedCloudProvider}
                          />
                        </div>
                      </div>
                    </>
                    {/* --- X --- Choose Cloud Provider --- X --- */}

                    {/* Configure Grid Profile */}
                    <div className="">
                      <p className="text-base-900 text-sm font-medium">
                        Configure Grid Profile
                      </p>
                      <p className="text-base-500 mt-1 text-sm font-normal">
                        The current settings are based on the default grid
                        profile. You can make the changes and save it as a new
                        profile.
                      </p>

                      <div className="mt-3 flex gap-4">
                        <div className="w-1/2">
                          <InputField
                            id="test-id"
                            isMandatory={IS_MANDATORY}
                            label="Grid Name"
                            onBlur={null}
                            onChange={gridNameChangeHandler}
                            onFocus={null}
                            onKeyDown={null}
                            value={selectedGridName}
                          />
                        </div>

                        <div className="w-1/2">
                          <InputField
                            errorText={concurrencyErrorText}
                            id="test-id"
                            isMandatory={IS_MANDATORY}
                            label="Concurrency"
                            onBlur={null}
                            onChange={gridConcurrencyChangeHandler}
                            onFocus={null}
                            onKeyDown={null}
                            placeholder={0}
                            value={selectedGridConcurrency}
                            type="number"
                          />
                        </div>
                      </div>

                      {/* Advanced Settings */}
                      <div className="mt-5">
                        <Accordion>
                          <Button
                            colors="white"
                            icon={
                              collapsibleBtntextForAdvSettings ===
                              'Show Cluster Details' ? (
                                <span>+</span>
                              ) : (
                                <span>-</span>
                              )
                            }
                            onClick={() => setOpened(!opened)}
                            modifier="primary"
                            variant="rounded"
                          >
                            {collapsibleBtntextForAdvSettings}
                          </Button>
                          <AccordionSimpleHeader
                            controller={opened}
                            onClick={() => setOpened(!opened)}
                            title="Advanced Settings"
                            wrapperClassName="hidden"
                          />
                          <AccordionPanel controller={opened}>
                            <div className="my-2 h-16 items-center justify-center p-2">
                              <div className="mt-1 flex items-end gap-4">
                                <div className="w-1/2">
                                  {ClusterInputComboBoxComponent}
                                </div>
                                <div className="flex w-1/2 gap-8">
                                  {/* <div className="w-1/2">
                                    <Button
                                      colors="white"
                                      fullWidth
                                      icon={<MdOutlineModeEditOutline />}
                                      iconPlacement="start"
                                      onClick={editClusterBtnClickHandler}
                                      size="default"
                                    >
                                      Edit Cluster Details
                                    </Button>
                                  </div> */}
                                  <div className="w-1/2">
                                    <Button
                                      colors="white"
                                      fullWidth
                                      icon={<MdAdd />}
                                      iconPlacement="start"
                                      onClick={setupNewClusterBtnClickHandler}
                                      size="default"
                                    >
                                      Setup New Cluster
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className=" mt-4 flex flex-row gap-4">
                                <div className="w-1/2">
                                  {RegionInputComponent}
                                </div>

                                <div className="w-1/2">
                                  {InstanceTypeInputComponent}
                                </div>
                              </div>

                              <div className="mt-4 flex flex-row gap-4">
                                <div className="w-1/2">{VPCInputComponent}</div>
                                <div className="w-1/2">
                                  {SubnetsInputComponent}
                                </div>
                              </div>

                              {/* <div className="mt-4 w-1/2">
                                {DomainInputComponent}
                              </div> */}
                            </div>
                          </AccordionPanel>
                        </Accordion>
                      </div>
                      {/* --- X --- Advanced Settings --- X --- */}
                    </div>
                    {/* --- X --- Configure Grid Profile --- X --- */}
                  </div>
                )}

                {/* Setup IAM Role and Download Instructions */}
                {setupState === 2 && (
                  <div>
                    <div>
                      <p className="text-base-900 text-sm font-medium">
                        Setup IAM Role
                      </p>
                      <p className="text-base-500 mt-1 text-sm font-normal">
                        Set up a new IAM role via the CloudFormation link and
                        generate the AWS access key and secret to create and
                        manage the Automation Grid. Read more about this here.
                      </p>
                    </div>
                    <div className="mt-9">
                      <p className="text-base-900 text-sm font-medium">
                        Grid Creation Commands
                      </p>
                      <p className="text-base-500 mb-3 mt-1 text-sm font-normal">
                        Execute the below commands to initialize grid creation.
                      </p>

                      <CodeSnippet
                        code={`browserstack-cli ats create grid --grid-profile ${selectedGridName}`}
                        language="node"
                        singleLine
                      />
                    </div>

                    <div className="mt-4">
                      <Accordion>
                        <Button
                          colors="white"
                          icon={
                            collapsibleBtntextForCode ===
                            'View steps to download CLI' ? (
                              <span>+</span>
                            ) : (
                              <span>-</span>
                            )
                          }
                          onClick={() => setOpened(!opened)}
                          modifier="primary"
                          variant="rounded"
                        >
                          {collapsibleBtntextForCode}
                        </Button>
                        <AccordionSimpleHeader
                          controller={opened}
                          onClick={() => setOpened(!opened)}
                          title="Steps to download CLI"
                          wrapperClassName="hidden"
                        />
                        <AccordionPanel controller={opened}>
                          {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
                          <ol className="text-base-500 list-[lower-alpha] text-sm">
                            <li className="text-base-900 py-2">
                              <div>
                                <p className="text-base-900 mb-2">
                                  Download CLI.
                                </p>
                                <CodeSnippet
                                  code="npm install @browserstack/browserstack-cli"
                                  language="node"
                                  showLineNumbers={false}
                                  singleLine={false}
                                  view="neutral"
                                />
                              </div>
                            </li>
                            <li className="text-base-900 py-2">
                              <div>
                                <p className="text-base-900 mb-2">
                                  Setup CLI with AWS credentials.
                                </p>
                                <CodeSnippet
                                  code={
                                    CODE_SNIPPETS_SCRATCH['create-grid'].b.code
                                  }
                                  language="node"
                                  showLineNumbers={false}
                                  singleLine={false}
                                  view="neutral"
                                />
                              </div>
                            </li>
                          </ol>
                        </AccordionPanel>
                      </Accordion>
                      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
                    </div>
                  </div>
                )}

                <Modal size="2xl" show={showSetupClusterModal}>
                  <ModalHeader
                    handleDismissClick={modalCrossClickhandler}
                    heading="Setup Cluster"
                  />
                  <div className="px-6 pb-3">
                    <div className="mb-5 flex flex-col">
                      <div className="flex gap-4">
                        <div className="w-1/2">{ClusterInputTextComponent}</div>
                        <div className="w-1/2">{RegionInputComponent}</div>
                      </div>
                      <div className="mt-4 flex gap-4">
                        <div className="w-1/2">
                          {InstanceTypeInputComponent}
                        </div>
                        {/* <div className="w-1/2">{DomainInputComponent}</div> */}
                        <div className="w-1/2">{VPCInputComponent}</div>
                      </div>
                      <div className="mt-4 flex gap-4">
                        <div className="w-full">{SubnetsInputComponent}</div>
                      </div>
                    </div>
                    <div className="flex flex-row-reverse">
                      <Button onClick={setupBtnClickHandler}>Setup</Button>
                    </div>
                  </div>
                </Modal>

                <Modal size="2xl" show={showSaveProfileModal}>
                  <ModalHeader
                    handleDismissClick={modalCrossClickhandler}
                    heading="Save Grid Profile"
                    subHeading="Save the changes as a unique profile to create grid with similar configurations in future."
                  />
                  <div className="px-6 pb-3">
                    <InputField
                      errorText={newProfileErrorText}
                      label="Profile Name"
                      onChange={saveProfileChangeHandler}
                      isMandatory={IS_MANDATORY}
                      placeholder="my-profile-1"
                      value={newProfileNameValue}
                    />

                    <div className="mt-5 flex flex-row-reverse">
                      <Button
                        onClick={saveAndProceedClickHandler}
                        loading={creatingGridProfile}
                      >
                        Save and Proceed
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>

              {setupState !== 2 && (
                <div className="border-base-300 flex flex-row-reverse border-t px-6 py-3">
                  {!dataChanged && setupState !== 2 && (
                    <Button onClick={nextBtnClickHandler}> Next </Button>
                  )}
                  {dataChanged && (
                    <Button onClick={saveChangesClickHander}>
                      Save Changes
                    </Button>
                  )}
                </div>
              )}

              {setupState === 2 &&
                (!eventLogsCode || eventLogsCode?.length === 0) &&
                eventLogsStatus !== EVENT_LOGS_STATUS.IN_PROGRESS && (
                  <div className="border-base-300 text-base-700 flex gap-2 border-t px-6 py-3">
                    <HourglassBottomOutlinedIcon /> Waiting for you to complete
                    the above steps to connect the grid...
                  </div>
                )}

              {eventLogsCode &&
                eventLogsCode.length > 0 &&
                showGridHeartBeats && (
                  <div className="text-base-700 flex gap-2 px-6 py-3">
                    <HourglassBottomOutlinedIcon /> Grid heartbeats detected.
                    Initialising events log...
                  </div>
                )}

              {eventLogsCode &&
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

              {showEventLogsModal && (
                <EventLogs
                  closeEventLogsModal={closeEventLogsModal}
                  currentStep={currentStep}
                  eventLogsCode={eventLogsCode}
                  totalSteps={totalSteps}
                  isSetupComplete={isSetupComplete}
                />
              )}

              {isSetupComplete && showSetupStatusModal && (
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
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGrid;
