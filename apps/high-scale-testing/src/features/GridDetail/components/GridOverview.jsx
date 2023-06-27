import React from 'react';
import { Badge, MdContentCopy } from '@browserstack/bifrost';
import CopyButton from 'common/CopyButton/components/CopyButton';
import browserIcons from 'constants/browserIcons';
import frameWorkIcons from 'constants/frameworkIcons';

import { useGridOverview } from '../../GridConsole/components/useGridOverview';

const GridOverview = () => {
  const {
    containerClassName,
    copyBtnCbFn,
    fontColor900ClassName,
    selectedGridData,
    hasBrowsersUsed,
    relativeTime
  } = useGridOverview();

  let cluster;
  let frameworks;
  let gridVersion;
  let identifier;
  let name;
  let stats;
  let status;

  if (selectedGridData && !Object.keys(selectedGridData).length) {
    return <></>;
  }

  let gridDetailData = [
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
      value: relativeTime
    },
    {
      title: 'Created by',
      value: selectedGridData?.createdBy?.fullName
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
          {hasBrowsersUsed &&
            stats?.browsersUsed.map((browserUsed) => {
              const browser = browserUsed;
              return browserIcons[browser];
            })}
          {!hasBrowsersUsed && '-'}
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

  if (selectedGridData) {
    ({ cluster, frameworks, gridVersion, identifier, name, stats, status } =
      selectedGridData);

    gridDetailData = [
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
        value: relativeTime
      },
      {
        title: 'Created by',
        value: selectedGridData?.createdBy?.fullName
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
            {hasBrowsersUsed &&
              stats?.browsersUsed.map((browserUsed) => {
                const browser = browserUsed;
                return browserIcons[browser];
              })}
            {!hasBrowsersUsed && '-'}
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
  }

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

      <div className="flex flex-row">
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
                            {framework?.name === 'Selenium' && '/wd/hub'}
                          </p>

                          <CopyButton
                            cb={() =>
                              copyBtnCbFn(framework?.name.toLowerCase())
                            }
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

        <div className="p-6">
          <div className={containerClassName}>
            <p className="text-base-900 text-lg font-medium leading-6">
              User Details
            </p>
            <div className="bg-white pt-4">
              <div
                className="border-base-200 flex flex-row items-center border-b py-3"
                key="user-name"
              >
                <div className="flex flex-row items-center">
                  {frameWorkIcons.Selenium}
                  <div className="ml-2 w-52">
                    <p className="text-base-500 text-base font-normal">
                      User Name
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-start">
                  <>
                    <p className="text-base-900 mr-4 text-base font-normal">
                      Enter USERNAME HERE
                    </p>

                    <CopyButton
                      cb={() => copyBtnCbFn('Enter USERNAME HERE')}
                      copyValue="Enter USERNAME HERE"
                      textColor=""
                      wrapperClassName="text-xl"
                    >
                      <MdContentCopy className="text-base-500" />
                    </CopyButton>
                  </>
                </div>
              </div>

              <div
                className="border-base-200 flex flex-row items-center border-b py-3"
                key="user-name"
              >
                <div className="flex flex-row items-center">
                  {frameWorkIcons.Selenium}
                  <div className="ml-2 w-52">
                    <p className="text-base-500 text-base font-normal">
                      Access Key
                    </p>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-start">
                  <>
                    <p className="text-base-900 mr-4 text-base font-normal">
                      ENTER ACCESS KEY HERE
                    </p>

                    <CopyButton
                      cb={() => copyBtnCbFn('Enter USERNAME HERE')}
                      copyValue="Enter USERNAME HERE"
                      textColor=""
                      wrapperClassName="text-xl"
                    >
                      <MdContentCopy className="text-base-500" />
                    </CopyButton>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GridOverview;
