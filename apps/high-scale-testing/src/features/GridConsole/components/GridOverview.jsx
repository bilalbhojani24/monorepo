import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Badge, MdContentCopy } from '@browserstack/bifrost';
import ChromeIcon from 'assets/icons/components/browsers/ChromeIcon';
import EdgeIcon from 'assets/icons/components/browsers/EdgeIcon';
import FirefoxIcon from 'assets/icons/components/browsers/FirefoxIcon';
import CypressIcon from 'assets/icons/components/frameworks/CypressIcon';
import PlaywrightIcon from 'assets/icons/components/frameworks/PlaywrightIcon';
import SeleniumIcon from 'assets/icons/components/frameworks/SeleniumIcon';
import CopyButton from 'common/CopyButton/components/CopyButton';

import { getGridData } from '../slices/selector';

import { useGridOverview } from './useGridOverview';

const GridOverview = () => {
  const params = useParams();
  const paramId = params; // grid id

  const {
    fetchGridDataByIdFromAPI,
    containerClassName,
    fontColor900ClassName
  } = useGridOverview();
  const gridData = useSelector(getGridData);

  useEffect(() => {
    if (paramId) fetchGridDataByIdFromAPI(paramId);
  }, [fetchGridDataByIdFromAPI, paramId]);

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
      value: user.fullName
    },
    {
      title: 'Running Tests',
      value: runningTests
    },
    {
      title: 'Cluster ID',
      value: cluster.id
    },
    {
      title: 'Browsers Used',
      value: (
        <div className="flex gap-1">
          {browserSettings.allowedBrowsers.map((allowedBrowser) => {
            const browser = Object.keys(allowedBrowser)[0];
            return browserIcons[browser];
          })}
        </div>
      )
    },
    {
      title: 'Cluster Name',
      value: cluster.name
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

  return (
    <>
      <div className="px-6 pt-6">
        <div className={containerClassName}>
          <p className="text-lg font-medium leading-6 text-base-900">
            Grid Details
          </p>

          <div className="grid grid-cols-4 grid-rows-3 gap-x-8 gap-y-4 pt-4">
            {gridDetailData.map((detail) => {
              const { title, value } = detail;
              return (
                <div>
                  <p className="text-sm font-normal text-base-500">{title}</p>
                  <p className={fontColor900ClassName}>{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {frameworks.length && (
        <div className="p-6">
          <div className={containerClassName}>
            <p className="text-lg font-medium leading-6 text-base-900">
              Framework URLs
            </p>
            <div className="bg-white pt-4">
              {frameworks.map((framework) => (
                <div
                  className="flex flex-row items-center border-b border-base-200 py-3"
                  key={framework.name}
                >
                  <div className="flex flex-row items-center">
                    {frameWorkIcons[framework.name]}
                    <div className="ml-2 w-52">
                      <p className={fontColor900ClassName}>{framework.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-start">
                    {framework.url.length ? (
                      <>
                        <p className="mr-4 text-sm font-normal text-base-900">
                          {framework.url}
                        </p>

                        <CopyButton
                          copyValue={framework.url}
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
