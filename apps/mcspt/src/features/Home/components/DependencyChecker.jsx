import React from 'react';
import {
  Button,
  ComboBox,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  MdAndroid,
  MdDeviceUnknown,
  MdOutlineAutorenew,
  MdReportGmailerrorred,
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import dependencyLoader from 'assets/dependencyLoader.gif';

import useDependencyChecker from './useDependencyChecker';

const generateDeviceOptions = (deviceList) =>
  deviceList.map((device) => ({
    label: (
      <div className="flex items-center">
        <div className="mr-3 text-xl">
          <MdAndroid />
        </div>
        <div className="mr-1 text-sm font-medium leading-5">
          {device?.model}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5">
          {`${device?.os} ${device?.osVersion}`}
        </div>
      </div>
    ),
    value: device?.deviceId
  }));

const generateAppOptions = (appList) =>
  appList.map((app) => ({
    label: app?.name,
    value: app?.packageName
  }));

const DependencyChecker = () => {
  const {
    isCheckingDependencies,
    dependenciesFetchedSuccessfully,
    noDevicesFound,
    deviceSelected,
    applicationSelected,
    deviceOptionList,
    applicationOptionList,
    selectedDevice,
    selectedApplication,
    startTestSession,
    isSessionApiLoading
  } = useDependencyChecker(generateDeviceOptions, generateAppOptions);

  return (
    <div className="bg-base-50 p-14">
      <div className="mx-auto rounded-xl bg-white shadow-md">
        {isCheckingDependencies && (
          <div className="flex flex-col items-center justify-center p-14">
            <img src={dependencyLoader} alt="loading..." className="w-24" />
            <div className="text-2xl font-bold leading-7">
              Checking dependencies...
            </div>
          </div>
        )}

        <div className="py-6 px-4">
          {!isCheckingDependencies && (
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold leading-7">
                Conduct your first performance test
              </div>

              <Button
                icon={<MdOutlineAutorenew />}
                variant="primary"
                colors="white"
              >
                Refresh
              </Button>
            </div>
          )}

          {dependenciesFetchedSuccessfully && (
            <>
              <div className="mt-4 flex justify-between">
                <div className="mr-1.5 flex-1">
                  {deviceOptionList.length > 0 && (
                    <SelectMenu
                      onChange={deviceSelected}
                      value={deviceOptionList.find(
                        (device) => selectedDevice?.deviceId === device?.value
                      )}
                      isMulti={false}
                    >
                      <SelectMenuLabel>Device</SelectMenuLabel>
                      <SelectMenuTrigger placeholder="Select.." />
                      <SelectMenuOptionGroup>
                        {deviceOptionList.map((item) => (
                          <SelectMenuOptionItem
                            key={item.value}
                            option={item}
                          />
                        ))}
                      </SelectMenuOptionGroup>
                    </SelectMenu>
                  )}
                </div>

                <div className="ml-1.5 flex-1">
                  {applicationOptionList?.length > 0 && (
                    <ComboBox
                      onChange={applicationSelected}
                      value={applicationOptionList.find(
                        (app) => selectedApplication?.packageName === app?.value
                      )}
                      isMulti={false}
                    >
                      <ComboboxLabel>Application</ComboboxLabel>
                      <ComboboxTrigger
                        placeholder="Placeholder"
                        onInputValueChange={() => {}}
                      />
                      <ComboboxOptionGroup>
                        {applicationOptionList.map((item) => (
                          <ComboboxOptionItem key={item.value} option={item} />
                        ))}
                      </ComboboxOptionGroup>
                    </ComboBox>
                  )}
                </div>
              </div>

              <div className="mt-9 flex items-center justify-between">
                <div className="">
                  <div className="text-base-500 text-sm font-medium leading-5">
                    Applied Thresholds:
                  </div>
                  <div className="text-sm font-normal leading-5">
                    Android Preset
                  </div>
                </div>

                <Button
                  variant="primary"
                  colors="brand"
                  size="large"
                  onClick={startTestSession}
                  loading={isSessionApiLoading}
                >
                  Starting Test
                </Button>
              </div>
            </>
          )}
        </div>

        {noDevicesFound && (
          <div className="flex items-center justify-center px-28 py-12">
            <div
              className="bg-base-50 text-base-500 flex min-h-[72px] min-w-[72px] 
                items-center justify-center rounded-full text-5xl"
            >
              <MdDeviceUnknown />
            </div>

            <div className="text-base-600 ml-3 text-lg font-normal leading-7">
              Please connect your mobile device to start
              <br />
              performance session or check troubleshooting docs
            </div>
          </div>
        )}

        {false === 0 && (
          <div className="flex items-center justify-center px-28 py-12">
            <div
              className="bg-danger-50 text-danger-600 flex min-h-[72px] min-w-[72px] 
                items-center justify-center rounded-full text-5xl"
            >
              <MdReportGmailerrorred />
            </div>

            <div className="text-danger-900 ml-3 text-lg font-normal leading-7">
              To start testing please resolve
              <br />
              dependencies using setup doctor
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DependencyChecker;
