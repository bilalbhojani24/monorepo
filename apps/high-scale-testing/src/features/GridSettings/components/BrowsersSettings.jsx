import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  ComboBox,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  InputField,
  InputGroupAddOn,
  Notifications,
  notify
} from '@browserstack/bifrost';
import { updateSettings } from 'api/index';
import { getGridData } from 'features/GridConsole/slices/selector';
import { getUserDetails } from 'globalSlice/selector';

const BrowsersSettings = () => {
  const allAvailableBrowsers = [
    { label: 'Chrome', value: 'Chrome' },
    { label: 'Firefox', value: 'Firefox' },
    { label: 'Edge', value: 'Edge' }
  ];

  // All Store variables:
  const gridData = useSelector(getGridData);
  const userDetails = useSelector(getUserDetails);

  const usersAllowedBrowsersVal = gridData.browserSettings.allowedBrowsers.map(
    (e) => {
      let val = Object.keys(e)[0];
      val = val.charAt(0).toUpperCase() + val.slice(1);
      return {
        label: val,
        value: val
      };
    }
  );

  // All State variables:
  const [cpuValue, setCpuValue] = useState(
    gridData.browserSettings.resources.cpu
  );
  const [memoryLimitValue, setMemoryLimitValue] = useState(
    gridData.browserSettings.resources.memory
  );

  const [allowedBrowsersValue, setAllowedBrowsersValue] = useState(
    usersAllowedBrowsersVal
  );
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isSavingInProgress, setIsSavingInProgress] = useState(false);

  const onCPUChangeHandler = (e) => {
    const newValue = e.target.value;

    setIsSaveButtonDisabled(false);
    setCpuValue(newValue);
  };

  const onMemoryLimitChangeHandler = (e) => {
    const newValue = e.target.value;

    setIsSaveButtonDisabled(false);
    setMemoryLimitValue(newValue);
  };

  const updateGridBrowserSettings = (settingsObj) => {
    updateSettings(userDetails.id, gridData.id, settingsObj).then((d) => {
      setIsSaveButtonDisabled(true);
      setIsSavingInProgress(false);

      if (d.data === 'OK') {
        notify(
          <Notifications
            title="Settings updated!"
            isCondensed
            handleClose={(toastData) => {
              notify.remove(toastData.id);
            }}
          />,
          {
            position: 'top-right',
            duration: 4000
          }
        );
      }
    });
  };

  const saveBtnClickhandler = () => {
    setIsSavingInProgress(true);
    const settingsObj = {
      browserSettings: {
        allowedBrowsers: allowedBrowsersValue.map((e) => e.value.toLowerCase()),
        resources: {
          cpu: cpuValue,
          memory: memoryLimitValue
        }
      }
    };
    updateGridBrowserSettings(settingsObj);
  };

  const allowedBrowsersChangeHandler = (e) => {
    setAllowedBrowsersValue(e);
    setIsSaveButtonDisabled(false);
  };

  return (
    <>
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <div className="h-[calc(100vh-64px-134px-48px-62px)] overflow-auto p-6">
        <p className="text-base-900 text-lg font-medium">
          Browser Related Settings
        </p>
        <p className="text-base-500 text-sm">
          Configure the settings related to browsers set up on this Grid. Set
          upper limits on resources to be consumed while running a particular
          session and limit browsers allowed on the Grid as per your needs.
        </p>

        {/* --- --- CPU Limit --- --- */}
        <div className="pt-6">
          <p className="font-medium">CPU Limit</p>
          <p className="text-base-500 text-sm">
            Set the upper limit on CPU units that browsers can consume whenever
            the test runs. It is set at 0.5 (500 milli) CPU by default. You can
            set this value up to 2.5 CPU if your websites or tests have a higher
            requirement. You can adjust the values as per your testing
            requirements.
          </p>

          <div className="mt-3 w-2/12">
            <InputField
              addOnAfter={
                <InputGroupAddOn position="end">Unit</InputGroupAddOn>
              }
              defaultValue={cpuValue}
              disabled={isSavingInProgress}
              id="test-id"
              onChange={onCPUChangeHandler}
            />
          </div>
        </div>
        {/* --- X --- CPU Limit --- X --- */}

        {/* --- --- Memory Limit --- --- */}
        <div className="pt-6">
          <p className="font-medium">Memory Limit</p>
          <p className="text-base-500 text-sm">
            Set the upper limit on memory units that browsers can consume
            whenever the test runs. It is set at 500M (500 megabytes) memory by
            default. You can set this value up to 2500M if your websites or
            tests have a higher requirement. You can adjust the values as per
            your testing requirements.
          </p>

          <div className="mt-3 w-2/12">
            <InputField
              addOnAfter={<InputGroupAddOn position="end">M</InputGroupAddOn>}
              defaultValue={memoryLimitValue}
              disabled={isSavingInProgress}
              id="test-id"
              onChange={onMemoryLimitChangeHandler}
              onKeyDown={null}
              type="number"
            />
          </div>
        </div>
        {/* --- X --- Memory Limit --- X --- */}

        {/* --- --- Browsers Allowed --- --- */}
        <div className="pt-6">
          <p className="font-medium">Browsers Allowed</p>
          <p className="text-base-500 text-sm">
            Set the browsers allowed on the Grid. By default, all the browsers
            will be allowed. Use this option to restrict test sessions on a
            particular browser(s).
          </p>

          <div className="mt-3 max-w-xs">
            <ComboBox
              disabled={isSavingInProgress}
              onChange={allowedBrowsersChangeHandler}
              value={allowedBrowsersValue}
              isMulti
            >
              <ComboboxTrigger placeholder="Placeholder" />
              <ComboboxOptionGroup>
                {allAvailableBrowsers.map((item) => (
                  <ComboboxOptionItem key={item.value} option={item} />
                ))}
              </ComboboxOptionGroup>
            </ComboBox>
          </div>
        </div>
        {/* --- X --- Browsers Allowed --- X --- */}
      </div>
      <div className="bg-base-50 flex flex-row-reverse px-6 py-3">
        <Button
          disabled={isSaveButtonDisabled}
          loading={isSavingInProgress}
          onClick={saveBtnClickhandler}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default BrowsersSettings;
