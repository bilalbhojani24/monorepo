import React from 'react';
import {
  Accordion,
  AccordionPanel,
  AccordionSimpleHeader,
  Button,
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
  Steps
} from '@browserstack/bifrost';
import { SCRATCH_RADIO_GROUP_OPTIONS } from 'constants/index';

import useCreateGrid from './useCreateGrid';

const CreateGrid = () => {
  const {
    COMBOBOX_OPTIONS,
    allAvailableInstanceTypes,
    allAvailableSubnets,
    allAvailableVPCIDs,
    breadcrumbsData,
    currentProvidersRegions,
    currentSelectedCloudProvider,
    gridProfiles,
    opened,
    ref,
    selectedGridProfile,
    setOpened,
    setCurrentCloudProvider,
    setSelectedGridProfile
  } = useCreateGrid();

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
          {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
          <div className="m-6 h-[calc(100vh-64px-104px-48px)] overflow-auto rounded-lg border border-base-300 bg-white p-6">
            <p className="text-lg font-medium">Choose Grid Profile</p>
            <p className="text-sm text-base-500">
              Use previously saved profiles to configure Grid settings with
              pre-filled values.
            </p>

            <div className="mb-6 mt-3 w-1/2">
              <SelectMenu
                onChange={(val) => setSelectedGridProfile(val)}
                value={selectedGridProfile}
              >
                <SelectMenuTrigger ref={ref} />
                <SelectMenuOptionGroup>
                  {gridProfiles.map((item) => (
                    <SelectMenuOptionItem key={item.value} option={item} />
                  ))}
                </SelectMenuOptionGroup>
              </SelectMenu>
            </div>

            {/* Choose Cloud Provider */}
            <div>
              <p className="text-sm font-medium">Choose Cloud Provider</p>
              <p className="text-sm  font-normal text-base-500">
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
            {/* ----- */}

            {/* Configure Grid Profile */}
            <div className="mt-6">
              <p className="text-sm font-normal">Configure Grid Profile</p>
              <p className="text-sm font-normal text-base-500">
                The current settings are based on the default grid profile. You
                can make the changes and save it as a new profile.
              </p>

              <div className="mt-4 flex gap-4">
                <div className="w-1/2">
                  <InputField
                    id="test-id"
                    // eslint-disable-next-line react/jsx-boolean-value
                    isMandatory={true}
                    label="Grid Name"
                    onBlur={null}
                    onChange={null}
                    onFocus={null}
                    onKeyDown={null}
                    placeholder="high-scale-grid"
                  />
                </div>

                <div className="w-1/2">
                  <InputField
                    id="test-id"
                    // eslint-disable-next-line react/jsx-boolean-value
                    isMandatory={true}
                    label="Concurrency"
                    onBlur={null}
                    onChange={null}
                    onFocus={null}
                    onKeyDown={null}
                    placeholder="high-scale-grid"
                    // wrapperClassName="w-1/4"
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
                      {COMBOBOX_OPTIONS.map((item) => (
                        <ComboboxOptionItem key={item.value} option={item} />
                      ))}
                    </ComboboxOptionGroup>
                  </ComboBox>
                </div>

                <div>
                  <Button colors="white" icon={<MdAdd />} iconPlacement="start">
                    Setup New Cluster
                  </Button>
                </div>

                <div>
                  <Button colors="white" icon={<MdAdd />} iconPlacement="start">
                    Edit
                  </Button>
                </div>
              </div>

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
                              <span className="ml-0.5 text-danger-600">*</span>
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
                              <span className="ml-0.5 text-danger-600">*</span>
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
            </div>
            {/* ----- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGrid;
