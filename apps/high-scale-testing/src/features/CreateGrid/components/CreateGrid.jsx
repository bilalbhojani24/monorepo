import React from 'react';
import {
  Accordion,
  AccordionPanel,
  AccordionSimpleHeader,
  Button,
  CodeSnippet,
  ComboBox,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  InputField,
  InputGroupAddOn,
  MdAdd,
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

import useCreateGrid from './useCreateGrid';

const CreateGrid = () => {
  const {
    IS_MANDATORY,
    activeGridManagerCodeSnippet,
    allAvailableInstanceTypes,
    allAvailableSubnets,
    allAvailableVPCIDs,
    breadcrumbsData,
    clusterChangeHandler,
    codeSnippetsForExistingSetup,
    collapsibleBtntextForAdvSettings,
    collapsibleBtntextForCode,
    currentProvidersRegions,
    currentSelectedCloudProvider,
    dataChanged,
    editClusterBtnClickHandler,
    gridConcurrencyChangeHandler,
    gridNameChangeHandler,
    gridProfiles,
    modalCrossClickhandler,
    opened,
    nextBtnClickHandler,
    ref,
    saveChangesClickHander,
    selectedClusterValue,
    selectedGridClusters,
    selectedGridConcurrency,
    selectedGridName,
    selectedGridProfile,
    selectedRegion,
    selectedSubnetValues,
    selectedVPCValue,
    setActiveGridManagerCodeSnippet,
    setupBtnClickHandler,
    setCurrentCloudProvider,
    setOpened,
    setSelectedGridProfile,
    setupNewClusterBtnClickHandler,
    setupState,
    showSetupClusterModal,
    subnetChangeHandler,
    type,
    vpcChangeHandler
  } = useCreateGrid();

  const ClusterInputComponent = (
    <ComboBox
      onChange={clusterChangeHandler}
      value={selectedClusterValue}
      isMulti={false}
      // eslint-disable-next-line react/jsx-boolean-value
      isMandatory={true}
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

  const DomainInputComponent = (
    <InputField
      addOnBefore={<InputGroupAddOn>https://</InputGroupAddOn>}
      id="test-id"
      label="Domain"
      onBlur={null}
      onChange={null}
      onFocus={null}
      onKeyDown={null}
      placeholder="www.hst.browserstack.com"
      disabled={!showSetupClusterModal}
    />
  );

  const InstanceTypeInputComponent = (
    <ComboBox
      // onChange={(val) => setSelected(val)}
      // value={selected}
      isMulti={false}
      disabled={!showSetupClusterModal}
    >
      <ComboboxLabel>
        Instance Type
        <span className="text-danger-600 ml-0.5">*</span>
      </ComboboxLabel>
      <ComboboxTrigger placeholder="Placeholder" />
      <ComboboxOptionGroup>
        {allAvailableInstanceTypes.map((item) => (
          <ComboboxOptionItem key={item.value} option={item} />
        ))}
      </ComboboxOptionGroup>
    </ComboBox>
  );

  const RegionInputComponent = (
    <SelectMenu
      onChange={(val) => setSelectedGridProfile(val)}
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
      onChange={subnetChangeHandler}
      value={selectedSubnetValues}
      // eslint-disable-next-line react/jsx-boolean-value
      isMulti={true}
      disabled={!showSetupClusterModal}
    >
      <ComboboxLabel>
        Subnets
        <span className="text-danger-600 ml-0.5">*</span>
      </ComboboxLabel>
      <ComboboxTrigger placeholder="Placeholder" />
      <ComboboxOptionGroup>
        {allAvailableSubnets.map((item) => (
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
          name: GRID_MANAGER_NAMES.kubectl
        },
        {
          name: GRID_MANAGER_NAMES.cli
        }
      ]}
    />
  );

  const VPCInputComponent = (
    <ComboBox
      onChange={vpcChangeHandler}
      value={selectedVPCValue}
      isMulti={false}
      disabled={!showSetupClusterModal}
    >
      <ComboboxLabel>
        VPC ID
        <span className="text-danger-600 ml-0.5">*</span>
      </ComboboxLabel>
      <ComboboxTrigger placeholder="Placeholder" />
      <ComboboxOptionGroup>
        {allAvailableVPCIDs.map((item) => (
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
        // eslint-disable-next-line tailwindcss/no-arbitrary-value
        <div className="border-base-300 m-6 h-[calc(100vh-64px-104px-48px-62px)] overflow-auto rounded-lg border bg-white p-6">
          <p className="text-base-900 font-semibold">Grid Setup</p>
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
      )}

      {type === CREATE_GRID_TYPES.cli && (
        <div className="flex">
          <Steps
            format="bullets-and-text"
            label="label"
            onClick={() => {}}
            steps={[
              {
                id: '1',
                name: 'CONFIGURE GRID PROFILE',
                status: 'complete'
              },
              {
                id: '2',
                name: 'CHOOSE CLOUD PROVIDER',
                status: 'complete'
              },
              {
                id: '3',
                name: 'CONFIGURE GRID SETTINGS',
                status: 'current'
              },
              { id: '4', name: 'SETUP IAM ROLE', status: 'upcoming' },
              {
                id: '5',
                name: 'CREATE GRID',
                status: 'upcoming'
              }
            ]}
          />
          <div className="w-full">
            <div className="border-base-300 m-6 rounded-lg border bg-white ">
              {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
              <div className="h-[calc(100vh-64px-104px-48px-62px)] overflow-auto p-6">
                {/* Setup Grid and Cluster */}
                {setupState === 1 && (
                  <div>
                    {/* Choose Grid Profile */}
                    <>
                      <p className="text-base-900 text-sm font-medium">
                        Choose Grid Profile
                      </p>
                      <p className="text-base-500 text-sm">
                        Use previously saved profiles to configure Grid settings
                        with pre-filled values.
                      </p>

                      <div className="mb-6 mt-3 w-1/2">
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
                        <p className="text-base-500  text-sm font-normal">
                          Currently we support only AWS but GCP and Azure will
                          be supported soon.
                        </p>

                        <div className="my-3">
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
                    <div className="mt-6">
                      <p className="text-base-900 text-sm font-medium">
                        Configure Grid Profile
                      </p>
                      <p className="text-base-500 text-sm font-normal">
                        The current settings are based on the default grid
                        profile. You can make the changes and save it as a new
                        profile.
                      </p>

                      <div className="mt-4 flex gap-4">
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
                            id="test-id"
                            isMandatory={IS_MANDATORY}
                            label="Concurrency"
                            onBlur={null}
                            onChange={gridConcurrencyChangeHandler}
                            onFocus={null}
                            onKeyDown={null}
                            placeholder="high-scale-grid"
                            value={selectedGridConcurrency}
                          />
                        </div>
                      </div>

                      {/* Advanced Settings */}
                      <div className="mt-6">
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
                              <div className="mt-4 flex items-end gap-4">
                                <div className="w-1/2">
                                  {ClusterInputComponent}
                                </div>
                                <div>
                                  <Button
                                    colors="white"
                                    icon={<MdAdd />}
                                    iconPlacement="start"
                                    onClick={editClusterBtnClickHandler}
                                  >
                                    Edit Cluster Details
                                  </Button>
                                </div>
                                <div>
                                  <Button
                                    colors="white"
                                    icon={<MdAdd />}
                                    iconPlacement="start"
                                    onClick={setupNewClusterBtnClickHandler}
                                  >
                                    Setup New Cluster
                                  </Button>
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

                              <div className="mt-4 w-1/2">
                                {DomainInputComponent}
                              </div>
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
                        code={`browserstack-cli hst create grid --grid-profile ${selectedGridName}`}
                        language="node"
                        singleLine
                      />
                    </div>

                    <div className="m-4">
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
                          <ol className="list-[lower-alpha] text-sm text-base-500">
                            <li className="py-2 text-base-900">
                              <div>
                                <p className="mb-2 text-base-900">
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
                            <li className="py-2 text-base-900">
                              <div>
                                <p className="mb-2 text-base-900">
                                  Setup CLI with AWS credentials.
                                </p>
                                <CodeSnippet
                                  code="/* Set these values in your ~/.zprofile (zsh) or ~/.profile (bash) */
                              export BROWSERSTACK_USERNAME=<username>
                              export BROWSERSTACK_ACCESS_KEY=<accesskey>
                              
                              /* Create HST configuration profile with AWS credentials */
                              browserstack-cli hst init
                              "
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
                        <div className="w-1/2">{ClusterInputComponent}</div>
                        <div className="w-1/2">{RegionInputComponent}</div>
                      </div>
                      <div className="mt-4 flex gap-4">
                        <div className="w-1/2">
                          {InstanceTypeInputComponent}
                        </div>
                        <div className="w-1/2">{DomainInputComponent}</div>
                      </div>
                      <div className="mt-4 flex gap-4">
                        <div className="w-1/2">{VPCInputComponent}</div>
                        <div className="w-1/2">{SubnetsInputComponent}</div>
                      </div>
                    </div>
                    <div className="flex flex-row-reverse">
                      <Button onClick={setupBtnClickHandler}>Setup</Button>
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
              {setupState === 2 && (
                <div className="border-base-300 text-base-700 flex gap-2 border-t px-6 py-3">
                  <HourglassBottomOutlinedIcon /> Waiting for you to complete
                  the above steps to connect the grid...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGrid;
