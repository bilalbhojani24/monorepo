import React from 'react';
import { Badge, MdContentCopy } from '@browserstack/bifrost';
import CopyButton from 'common/CopyButton/components/CopyButton';
import browserIcons from 'constants/browserIcons';
import frameWorkIcons from 'constants/frameworkIcons';

import { useGridOverview } from './useGridOverview';

const GridOverview = () => {
  const {
    cluster,
    connected,
    containerClassName,
    copyBtnCbFn,
    fontColor900ClassName,
    frameworks,
    gridData,
    gridVersion,
    identifier,
    name,
    status,
    stats
  } = useGridOverview();

  if (!Object.keys(gridData).length) {
    return <></>;
  }

  const oldTimestamp = new Date(connected).getTime();
  const oldSeconds = Math.floor(oldTimestamp / 1000);

  const date = new Date();
  const timestamp = date.getTime();
  const seconds = Math.floor(timestamp / 1000);

  const difference = seconds - oldSeconds;

  let output = ``;
  if (difference < 60) {
    // Less than a minute has passed:
    output = `${difference} seconds ago`;
  } else if (difference < 3600) {
    // Less than an hour has passed:
    output = `${Math.floor(difference / 60)} minutes ago`;
  } else if (difference < 86400) {
    // Less than a day has passed:
    output = `${Math.floor(difference / 3600)} hours ago`;
  } else if (difference < 2620800) {
    // Less than a month has passed:
    output = `${Math.floor(difference / 86400)} days ago`;
  } else if (difference < 31449600) {
    // Less than a year has passed:
    output = `${Math.floor(difference / 2620800)} months ago`;
  } else {
    // More than a year has passed:
    output = `${Math.floor(difference / 31449600)} years ago`;
  }

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
      value: output
    },
    {
      title: 'Created by',
      value: gridData?.createdBy?.fullName
    },
    {
      title: 'Running Tests',
      value: stats?.runningTests || '--/--'
    },
    {
      title: 'Cluster ID',
      value: cluster?.identifier
    },
    {
      title: 'Browsers Used',
      value: (
        <div className="flex gap-1">
          {stats?.browsersUsed.map((browserUsed) => {
            const browser = browserUsed;
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
      value: stats?.queuedTests || '--/--'
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

          <div className="grid grid-cols-4 grid-rows-3 gap-x-8 gap-y-4 pt-6">
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

      {frameworks?.length && (
        <div className="p-6">
          <div className={containerClassName}>
            <p className="text-lg font-medium leading-6 text-base-900">
              Framework URLs
            </p>
            <div className="bg-white pt-4">
              {frameworks.map((framework) => (
                <div
                  className="flex flex-row items-center border-b border-base-200 py-3"
                  key={framework?.name}
                >
                  <div className="flex flex-row items-center">
                    {frameWorkIcons[framework?.name]}
                    <div className="ml-2 w-52">
                      <p className="text-base font-normal text-base-500">
                        {framework?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-start">
                    {framework?.url.length ? (
                      <>
                        <p className="mr-4 text-base font-normal text-base-900">
                          {framework?.url}
                          {framework?.name === 'Selenium' && '/wd/hub'}
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
