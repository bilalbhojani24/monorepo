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
import {
  CREATE_GRID_TYPES,
  GRID_MANAGER_NAMES,
  SCRATCH_RADIO_GROUP_OPTIONS
} from 'constants/index';

import useCreateGrid from './useCreateGrid';

const CreateGrid = () => {
  const {
    activeGridManagerCodeSnippet,
    allAvailableInstanceTypes,
    allAvailableSubnets,
    allAvailableVPCIDs,
    breadcrumbsData,
    codeSnippetsForExistingSetup,
    currentProvidersRegions,
    currentSelectedCloudProvider,
    gridConcurrencyChangeHandler,
    gridNameChangeHandler,
    gridProfiles,
    IS_MANDATORY,
    opened,
    ref,
    selectedGridClusters,
    selectedGridConcurrency,
    selectedGridName,
    selectedGridProfile,
    setActiveGridManagerCodeSnippet,
    setOpened,
    setCurrentCloudProvider,
    setSelectedGridProfile,
    type
  } = useCreateGrid();

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
                name: 'CONFIGURE',
                status: 'current'
              },
              {
                id: '4',
                name: 'CREATE GRID',
                status: 'upcoming'
              }
            ]}
          />
          <div className="w-full">
            <div className="border-base-300 m-6 rounded-lg border bg-white ">
              {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
              <div className="h-[calc(100vh-64px-104px-48px-62px)] overflow-auto p-6">
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
                      Currently we support only AWS but GCP and Azure will be
                      supported soon.
                    </p>

                    <div className="my-3">
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
                </>
                {/* --- X --- Choose Cloud Provider --- X --- */}

                {/* Configure Grid Profile */}
                <div className="mt-6">
                  <p className="text-base-900 text-sm font-medium">
                    Configure Grid Profile
                  </p>
                  <p className="text-base-500 text-sm font-normal">
                    The current settings are based on the default grid profile.
                    You can make the changes and save it as a new profile.
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

                  <div className="mt-4 flex items-end gap-4">
                    <div className="w-1/2">
                      <ComboBox
                        // onChange={(val) => setSelected(val)}
                        // value={selected}
                        isMulti={false}
                        // eslint-disable-next-line react/jsx-boolean-value
                        isMandatory={true}
                      >
                        <ComboboxLabel>Cluster</ComboboxLabel>
                        <ComboboxTrigger placeholder="Placeholder" />
                        <ComboboxOptionGroup>
                          {selectedGridClusters.map((item) => (
                            <ComboboxOptionItem
                              key={item.value}
                              option={item}
                            />
                          ))}
                        </ComboboxOptionGroup>
                      </ComboBox>
                    </div>

                    <div>
                      <Button
                        colors="white"
                        icon={<MdAdd />}
                        iconPlacement="start"
                      >
                        Setup New Cluster
                      </Button>
                    </div>

                    <div>
                      <Button
                        colors="white"
                        icon={<MdAdd />}
                        iconPlacement="start"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* Advanced Settings */}
                  <div className="mt-2">
                    <Accordion>
                      <AccordionSimpleHeader
                        controller={opened}
                        onClick={() => setOpened(!opened)}
                        title="Advanced Settings"
                      />
                      <AccordionPanel controller={opened}>
                        <div className="my-2 h-16 items-center justify-center p-2">
                          <div className="flex flex-row gap-4">
                            <div className="w-1/2">
                              <SelectMenu
                                onChange={(val) => setSelectedGridProfile(val)}
                                value={selectedGridProfile}
                              >
                                <SelectMenuLabel>
                                  Region
                                  <span className="text-danger-600 ml-0.5">
                                    *
                                  </span>
                                </SelectMenuLabel>
                                <SelectMenuTrigger ref={ref} />
                                <SelectMenuOptionGroup>
                                  {currentProvidersRegions.map((item) => (
                                    <SelectMenuOptionItem
                                      key={item.value}
                                      option={item}
                                    />
                                  ))}
                                </SelectMenuOptionGroup>
                              </SelectMenu>
                            </div>

                            <div className="w-1/2">
                              <ComboBox
                                // onChange={(val) => setSelected(val)}
                                // value={selected}
                                isMulti={false}
                              >
                                <ComboboxLabel>
                                  Instance Type
                                  <span className="text-danger-600 ml-0.5">
                                    *
                                  </span>
                                </ComboboxLabel>
                                <ComboboxTrigger placeholder="Placeholder" />
                                <ComboboxOptionGroup>
                                  {allAvailableInstanceTypes.map((item) => (
                                    <ComboboxOptionItem
                                      key={item.value}
                                      option={item}
                                    />
                                  ))}
                                </ComboboxOptionGroup>
                              </ComboBox>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-row gap-4">
                            <div className="w-1/2">
                              <ComboBox
                                // onChange={(val) => setSelected(val)}
                                // value={selected}
                                isMulti={false}
                              >
                                <ComboboxLabel>VPC ID</ComboboxLabel>
                                <ComboboxTrigger placeholder="Placeholder" />
                                <ComboboxOptionGroup>
                                  {allAvailableVPCIDs.map((item) => (
                                    <ComboboxOptionItem
                                      key={item.value}
                                      option={item}
                                    />
                                  ))}
                                </ComboboxOptionGroup>
                              </ComboBox>
                            </div>
                            <div className="w-1/2">
                              <InputField
                                addOnBefore={
                                  <InputGroupAddOn>https://</InputGroupAddOn>
                                }
                                id="test-id"
                                label="Label"
                                onBlur={null}
                                onChange={null}
                                onFocus={null}
                                onKeyDown={null}
                                placeholder="www.hst.browserstack.com"
                              />
                            </div>
                          </div>

                          <div className="mt-4 w-1/2">
                            <ComboBox
                              // onChange={(val) => setSelected(val)}
                              // value={selected}
                              // eslint-disable-next-line react/jsx-boolean-value
                              isMulti={true}
                            >
                              <ComboboxLabel>Subnets</ComboboxLabel>
                              <ComboboxTrigger placeholder="Placeholder" />
                              <ComboboxOptionGroup>
                                {allAvailableSubnets.map((item) => (
                                  <ComboboxOptionItem
                                    key={item.value}
                                    option={item}
                                  />
                                ))}
                              </ComboboxOptionGroup>
                            </ComboBox>
                          </div>
                        </div>
                      </AccordionPanel>
                    </Accordion>
                  </div>
                  {/* --- X --- Advanced Settings --- X --- */}
                </div>
                {/* --- X --- Configure Grid Profile --- X --- */}
              </div>
              <div className="border-base-300 flex flex-row-reverse border-t px-6 py-3">
                <Button> Next </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateGrid;
