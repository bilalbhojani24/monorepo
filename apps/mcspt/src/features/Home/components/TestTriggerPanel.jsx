import React from 'react';
import {
  Button,
  ComboBox,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  MdPlayArrow,
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';

import useTestTriggerPanel from './useTestTriggerPanel';

const TestTriggerPanel = () => {
  const {
    areApplicationsStillLoading,
    errorOnApplicationFetch,
    listOfDevices,
    lisOfApplications,
    deviceSelected,
    applicationSelected,
    deviceOptionList,
    applicationOptionList,
    selectedDevice,
    selectedApplication,
    startTestSession,
    isSessionApiLoading,
    deviceSelectionError,
    disableTestTrigger,
    searchApplications
  } = useTestTriggerPanel();

  return (
    <div className="px-4 pb-4 pt-1">
      <div className="mt-4 flex justify-between">
        <div className="mr-1.5 flex-1">
          {listOfDevices?.length > 0 && (
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
                    wrapperClassName="flex-1 group"
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
              lisOfApplications?.length === 0 ||
              !selectedDevice?.compatible
            }
            errorText={errorOnApplicationFetch}
          >
            <ComboboxLabel>Application</ComboboxLabel>
            <ComboboxTrigger
              placeholder=" "
              onInputValueChange={searchApplications}
            />
            <ComboboxOptionGroup>
              {applicationOptionList.map((item) => (
                <ComboboxOptionItem key={item.value} option={item} />
              ))}
            </ComboboxOptionGroup>
          </ComboBox>
        </div>
      </div>

      <div className="mt-9 flex items-center justify-end">
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
    </div>
  );
};

export default TestTriggerPanel;
