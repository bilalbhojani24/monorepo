import React from 'react';
import { Badge, MdContentCopy } from '@browserstack/bifrost';
import ChromeIcon from 'assets/icons/components/browsers/ChromeIcon';
import EdgeIcon from 'assets/icons/components/browsers/EdgeIcon';
import FirefoxIcon from 'assets/icons/components/browsers/FirefoxIcon';
import CypressIcon from 'assets/icons/components/frameworks/CypressIcon';
import PlaywrightIcon from 'assets/icons/components/frameworks/PlaywrightIcon';
import SeleniumIcon from 'assets/icons/components/frameworks/SeleniumIcon';
import CopyButton from 'common/CopyButton/components/CopyButton';
import { AGGridDetailsInteracted } from 'constants/event-names';
import { logHSTEvent } from 'utils/logger';

import { useGridOverview } from './useGridOverview';

const GridOverview = () => {
  const { containerClassName, fontColor900ClassName, gridData } =
    useGridOverview();

  if (!Object.keys(gridData).length) {
    return <></>;
  }

  const {
    identifier,
    name,
    user,
    cluster,
    status,
    frameworks,
    connected,
    browserSettings,
    gridVersion,
    runningTests,
    queuedTests
  } = gridData;

  const allowedBrowsers =
    (browserSettings && Object.keys(browserSettings?.allowedBrowsers)) || [];
  const browserIcons = {
    chrome: <ChromeIcon width={20} height={20} />,
    edge: <EdgeIcon width={20} height={20} />,
    firefox: <FirefoxIcon width={20} height={20} />
  };

  const frameWorkIcons = {
    Selenium: <SeleniumIcon width={20} height={20} />,
    Playwright: <PlaywrightIcon width={20} height={20} />,
    Cypress: <CypressIcon width={20} height={20} />
  };

  const gridDetailData = [
    {
      title: 'Grid Name',
      value: name
    },
    {
      title: 'Status',
      value: (
        <Badge
          disabled
          hasDot={false}
          hasRemoveButton={false}
          isRounded
          text={status}
          modifier="success"
        />
      )
    },
    {
      title: 'Grid ID',
      value: identifier
    },
    {
      title: 'Connected',
      value: connected
    },
    {
      title: 'Created by',
      value: user?.fullName
    },
    {
      title: 'Running Tests',
      value: runningTests
    },
    {
      title: 'Cluster ID',
      value: cluster?.id
    },
    {
      title: 'Browsers Used',
      value: (
        <div className="flex gap-1">
          {allowedBrowsers.map((allowedBrowser) => {
            const browser = allowedBrowser;
            return browserIcons[browser];
          })}
        </div>
      )
    },
    {
      title: 'Cluster Name',
      value: cluster?.name
    },
    {
      title: 'Queued Tests',
      value: queuedTests
    },
    {
      title: 'Grid version',
      value: gridVersion
    }
  ];

  const copyBtnCbFn = (framework) => {
    logHSTEvent(['amplitude'], 'web_events', AGGridDetailsInteracted, {
      action: 'url_copied',
      framework
    });
  };

  return (
    <>
      <div className="px-6 pt-6">
        <div className={containerClassName}>
          <p className="text-base-900 text-lg font-medium leading-6">
            Grid Details
          </p>

          <div className="grid grid-cols-4 grid-rows-3 gap-x-8 gap-y-4 pt-6">
            {gridDetailData.map((detail) => {
              const { title, value } = detail;
              return (
                <div>
                  <p className="text-base-500 text-sm font-normal">{title}</p>
                  <p className={fontColor900ClassName}>{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {frameworks?.length && (
        <div className="p-6">
          <div className={containerClassName}>
            <p className="text-base-900 text-lg font-medium leading-6">
              Framework URLs
            </p>
            <div className="bg-white pt-4">
              {frameworks.map((framework) => (
                <div
                  className="border-base-200 flex flex-row items-center border-b py-3"
                  key={framework?.name}
                >
                  <div className="flex flex-row items-center">
                    {frameWorkIcons[framework?.name]}
                    <div className="ml-2 w-52">
                      <p className="text-base-500 text-base font-normal">
                        {framework?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-start">
                    {framework?.url.length ? (
                      <>
                        <p className="text-base-900 mr-4 text-base font-normal">
                          {framework?.url}
                        </p>

                        <CopyButton
                          cb={() => copyBtnCbFn(framework?.name.toLowerCase())}
                          copyValue={framework?.url}
                          textColor=""
                          wrapperClassName="text-xl"
                        >
                          <MdContentCopy className="text-base-500" />
                        </CopyButton>
                      </>
                    ) : (
                      <Badge
                        disabled
                        hasDot={false}
                        hasRemoveButton={false}
                        isRounded
                        text={framework.status}
                        modifier="info"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GridOverview;
