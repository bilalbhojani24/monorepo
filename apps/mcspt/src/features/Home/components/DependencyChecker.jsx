import React from 'react';
import {
  Button,
  ComboBox,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  MdDeviceUnknown,
  MdOutlineAutorenew,
  MdPlayArrow,
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import dependencyLoader from 'assets/tripleDots.gif';

import useDependencyChecker from './useDependencyChecker';

const DependencyChecker = () => {
  const {
    areDevicesStillLoading,
    areApplicationsStillLoading,
    errorOnApplicationFetch,
    deviceSelected,
    applicationSelected,
    deviceOptionList,
    applicationOptionList,
    selectedDevice,
    selectedApplication,
    startTestSession,
    isSessionApiLoading,
    refetchDevices,
    deviceSelectionError,
    disableTestTrigger
  } = useDependencyChecker();

  return (
    <div className="bg-base-50 p-14">
      <div className="mx-auto rounded-xl bg-white shadow-md">
        {areDevicesStillLoading && (
          <div className="flex flex-col items-center justify-center p-14">
            <img src={dependencyLoader} alt="loading..." className="w-24" />
            <div className="text-2xl font-bold leading-7">
              Checking for connected devices
            </div>
          </div>
        )}

        {!areDevicesStillLoading && (
          <div className="py-6 px-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold leading-7">
                {deviceOptionList?.length > 0
                  ? 'Conduct your first performance test'
                  : 'No devices connected'}
              </div>

              <Button
                icon={<MdOutlineAutorenew />}
                variant="primary"
                colors="white"
                onClick={refetchDevices}
              >
                Refresh
              </Button>
            </div>

            {deviceOptionList?.length > 0 && (
              <>
                <div className="mt-4 flex justify-between">
                  <div className="mr-1.5 flex-1">
                    {deviceOptionList?.length > 0 && (
                      <SelectMenu
                        onChange={deviceSelected}
                        value={deviceOptionList.find(
                          (device) => selectedDevice?.deviceId === device?.value
                        )}
                        isMulti={false}
                        disabled={areApplicationsStillLoading}
                        errorText={deviceSelectionError}
                      >
                        <SelectMenuLabel>Device</SelectMenuLabel>
                        <SelectMenuTrigger placeholder="Select Device" />
                        <SelectMenuOptionGroup>
                          {deviceOptionList.map((item) => (
                            <SelectMenuOptionItem
                              key={item.value}
                              checkPosition="right"
                              wrapperClassName="flex-1"
                              option={item}
                            />
                          ))}
                        </SelectMenuOptionGroup>
                      </SelectMenu>
                    )}
                  </div>

                  <div className="ml-1.5 flex-1">
                    <ComboBox
                      onChange={applicationSelected}
                      value={applicationOptionList.find(
                        (app) => selectedApplication?.packageName === app?.value
                      )}
                      isMulti={false}
                      isLoading={areApplicationsStillLoading}
                      loadingText="Loading applications"
                      disabled={
                        areApplicationsStillLoading ||
                        applicationOptionList?.length === 0 ||
                        !selectedDevice?.compatible
                      }
                      errorText={errorOnApplicationFetch}
                    >
                      <ComboboxLabel>Application</ComboboxLabel>
                      <ComboboxTrigger placeholder=" " />
                      <ComboboxOptionGroup>
                        {applicationOptionList.map((item) => (
                          <ComboboxOptionItem key={item.value} option={item} />
                        ))}
                      </ComboboxOptionGroup>
                    </ComboBox>
                  </div>
                </div>

                <div className="mt-9 flex items-center justify-between">
                  <div className="">
                    <div className="text-base-500 text-sm font-medium leading-5">
                      Applied Thresholds:
                    </div>
                    <div className="text-sm font-normal leading-5">
                      {`${
                        selectedDevice.os === 'android' ? 'Android ' : 'iOS '
                      } Preset`}
                    </div>
                  </div>

                  <Button
                    icon={<MdPlayArrow />}
                    variant="primary"
                    colors="brand"
                    size="large"
                    onClick={startTestSession}
                    loading={isSessionApiLoading}
                    loaderText="Starting Test"
                    disabled={disableTestTrigger}
                  >
                    Start Test
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {!areDevicesStillLoading && deviceOptionList?.length === 0 && (
          <div className="flex items-center justify-center px-28 py-12">
            <div
              className="bg-base-50 text-base-500 flex min-h-[72px] min-w-[72px] 
                items-center justify-center rounded-full text-5xl"
            >
              <MdDeviceUnknown />
            </div>

            <div className="text-base-600 ml-3 text-lg font-normal leading-7">
              To begin a performance profiling session, connect your mobile
              device and click refresh. For more details, check our device
              troubleshooting docs or contact us.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DependencyChecker;
