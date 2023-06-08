import React from 'react';
import {
  Button,
  ComboBox,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  InputField,
  InputGroupAddOn,
  Loader,
  Notifications,
  notify
} from '@browserstack/bifrost';

import useBrowserSettings from './useBrowserSettings';

const BrowsersSettings = () => {
  const notifactionComponent = (
    <Notifications
      title="Settings updated!"
      isCondensed
      handleClose={(toastData) => {
        notify.remove(toastData.id);
      }}
    />
  );
  const {
    allAvailableBrowsers,
    allowedBrowsersChangeHandler,
    allowedBrowsersValue,
    cpuValue,
    fetchedGridData,
    isSaveButtonDisabled,
    isSavingInProgress,
    memoryLimitValue,
    onCPUChangeHandler,
    onMemoryLimitChangeHandler,
    saveBtnClickhandler
  } = useBrowserSettings(notifactionComponent);
  return (
    <>
      {fetchedGridData ? (
        <Loader />
      ) : (
        <>
          <div className="overflow-auto p-6">
            <p className="text-base-900 text-lg font-medium">
              Browser Related Settings
            </p>
            <p className="text-base-500 text-sm">
              Configure the settings related to browsers set up on this Grid.
              Set upper limits on resources to be consumed while running a
              particular session and limit browsers allowed on the Grid as per
              your needs.
            </p>

            {/* --- --- CPU Limit --- --- */}
            <div className="pt-6">
              <p className="font-medium text-sm">CPU Limit</p>
              <p className="text-base-500 text-sm">
                Set the upper limit on CPU units that browsers can consume
                whenever the test runs. It is set at 0.5 (500 milli) CPU by
                default. You can set this value up to 2.5 CPU if your websites
                or tests have a higher requirement. You can adjust the values as
                per your testing requirements.
              </p>

              <div className="mt-3 w-32">
                <InputField
                  addOnAfter={
                    <InputGroupAddOn position="end">Unit</InputGroupAddOn>
                  }
                  value={cpuValue}
                  disabled={isSavingInProgress}
                  id="test-id"
                  onChange={onCPUChangeHandler}
                />
              </div>
            </div>
            {/* --- X --- CPU Limit --- X --- */}

            {/* --- --- Memory Limit --- --- */}
            <div className="pt-6">
              <p className="font-medium text-sm">Memory Limit</p>
              <p className="text-base-500 text-sm">
                Set the upper limit on memory units that browsers can consume
                whenever the test runs. It is set at 500M (500 megabytes) memory
                by default. You can set this value up to 2500M if your websites
                or tests have a higher requirement. You can adjust the values as
                per your testing requirements.
              </p>

              <div className="mt-3 w-32">
                <InputField
                  addOnAfter={
                    <InputGroupAddOn position="end">M</InputGroupAddOn>
                  }
                  value={memoryLimitValue}
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
              <p className="font-medium text-sm">Browsers Allowed</p>
              <p className="text-base-500 text-sm">
                Set the browsers allowed on the Grid. By default, all the
                browsers will be allowed. Use this option to restrict test
                sessions on a particular browser(s).
              </p>

              <div className="mt-3 w-64">
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
      )}
    </>
  );
};

export default BrowsersSettings;
