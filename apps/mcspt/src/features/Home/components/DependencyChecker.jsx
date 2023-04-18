import React from 'react';
import {
  Button,
  Hyperlink,
  MdDeviceUnknown,
  MdOutlineAutorenew
} from '@browserstack/bifrost';
import checkDependeciesBg from 'assets/checkDependeciesBg.svg';
import dependencyLoader from 'assets/tripleDots.gif';
import { CONTACT_US, DEVICE_DETECT_TROUBLESHOOT } from 'constants/docLinks';

import StartTestErrorModal from './StartTestErrorModal';
import TestTriggerPanel from './TestTriggerPanel';
import useDependencyChecker from './useDependencyChecker';

const DependencyChecker = () => {
  const {
    areDependenciesStillLoading,
    listOfDevices,
    refetchDevices,
    totalCompletedSessions
  } = useDependencyChecker();

  return (
    <div
      className="bg-base-50 p-14"
      style={{ backgroundImage: `url(${checkDependeciesBg})` }}
    >
      <div className="mx-auto rounded-xl bg-white shadow-md">
        {areDependenciesStillLoading && (
          <div className="flex flex-col items-center justify-center px-14 py-12">
            <img
              src={dependencyLoader}
              alt="loading..."
              className="mb-1 w-24"
            />
            <div className="mt-1.5 text-2xl font-bold leading-7">
              Checking for connected devices
            </div>
          </div>
        )}

        {!areDependenciesStillLoading && (
          <>
            <div className="px-4 pt-4">
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
                  size="default"
                >
                  Refresh
                </Button>
              </div>
            </div>

            {listOfDevices?.length > 0 && <TestTriggerPanel />}
          </>
        )}

        {!areDependenciesStillLoading && listOfDevices?.length === 0 && (
          <div className="flex items-center justify-center px-28 pb-14 pt-12">
            <div
              className="bg-base-50 text-base-500 flex min-h-[72px] min-w-[72px] 
                items-center justify-center rounded-full text-5xl"
            >
              <MdDeviceUnknown />
            </div>

            <div className="text-base-600 ml-3 text-base font-normal leading-6">
              <span>
                {`To begin a performance profiling session, connect your mobile
                device and click refresh. For more details, check our `}
              </span>

              <Hyperlink
                wrapperClassName="inline-flex text-base-600 text-base font-normal leading-6 underline"
                onClick={() => {
                  window.remoteThreadFunctions?.openUrlInSystemBrowser(
                    DEVICE_DETECT_TROUBLESHOOT
                  );
                }}
              >
                device troubleshooting docs
              </Hyperlink>

              <span>{' or '}</span>

              <Hyperlink
                wrapperClassName="inline-flex text-base-600 text-base font-normal leading-6 underline"
                onClick={() => {
                  window.remoteThreadFunctions?.openUrlInSystemBrowser(
                    CONTACT_US
                  );
                }}
              >
                contact us.
              </Hyperlink>
            </div>
          </div>
        )}
      </div>

      <StartTestErrorModal />
    </div>
  );
};

export default DependencyChecker;
