import React from 'react';
import {
  Button,
  Hyperlink,
  MdDeviceUnknown,
  MdOutlineAutorenew
} from '@browserstack/bifrost';
import dependencyLoader from 'assets/tripleDots.gif';

import StartTestErrorModal from './StartTestErrorModal';
import TestTriggerPanel from './TestTriggerPanel';
import useDependencyChecker from './useDependencyChecker';

const DependencyChecker = () => {
  const {
    areDevicesStillLoading,
    showStartTestErrorModal,
    setShowStartTestErrorModal,
    listOfDevices,
    refetchDevices,
    totalCompletedSessions
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
                {listOfDevices?.length > 0
                  ? `Conduct your ${
                      totalCompletedSessions >= 1 ? '' : 'first'
                    } performance test`
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

            {listOfDevices?.length > 0 && <TestTriggerPanel />}
          </div>
        )}

        {!areDevicesStillLoading && listOfDevices?.length === 0 && (
          <div className="flex items-center justify-center px-28 py-12">
            <div
              className="bg-base-50 text-base-500 flex min-h-[72px] min-w-[72px] 
                items-center justify-center rounded-full text-5xl"
            >
              <MdDeviceUnknown />
            </div>

            <div className="text-base-600 ml-3 text-lg font-normal leading-7">
              <span>
                {`To begin a performance profiling session, connect your mobile
                device and click refresh. For more details, check our `}
              </span>

              <Hyperlink
                wrapperClassName="inline-flex text-base-600 text-lg font-normal leading-7 underline"
                onClick={() => {}}
              >
                device troubleshooting docs
              </Hyperlink>

              <span>{' or '}</span>

              <Hyperlink
                wrapperClassName="inline-flex text-base-600 text-lg font-normal leading-7 underline"
                onClick={() => {}}
              >
                contact us.
              </Hyperlink>
            </div>
          </div>
        )}
      </div>

      <StartTestErrorModal
        showStartTestErrorModal={showStartTestErrorModal}
        setShowStartTestErrorModal={setShowStartTestErrorModal}
      />
    </div>
  );
};

export default DependencyChecker;
