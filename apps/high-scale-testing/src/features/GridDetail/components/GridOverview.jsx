import React from 'react';
import {
  Badge,
  Button,
  Tooltip,
  TooltipBody,
  TooltipHeader
} from '@browserstack/bifrost';
import browserIcons from 'constants/browserIcons';

import { useGridOverview } from '../../GridConsole/components/useGridOverview';
import { TOOLTIP_MESSAGES } from '../constants';

import FrameworksTable from './FramworksTable';
import TestOnStaging from './TestOnStaging';
import UserDetailsTable from './UserDetailsTable';

const GridOverview = () => {
  const {
    containerClassName,
    copyBtnCbFn,
    currentOnboardingTooltipCount,
    fontColor900ClassName,
    onboardingTooltipNextBtnHandler,
    onboardingTooltipSkipBtnHandler,
    selectedGridData,
    showOnboardingTooltips,
    hasBrowsersUsed,
    relativeTime,
    userDetails
  } = useGridOverview();

  let cluster;
  let frameworks;
  let gridVersion;
  let identifier;
  let name;
  let stats;
  let status;

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
            <Tooltip
              alignOffset={10}
              arrowPadding={10}
              content={
                <>
                  <TooltipHeader>{TOOLTIP_MESSAGES[0].header}</TooltipHeader>
                  <TooltipBody>
                    <div className="flex flex-col">
                      <div>{TOOLTIP_MESSAGES[0].content}</div>
                      <div className="mt-4 flex flex-row gap-3">
                        <Button
                          onClick={() =>
                            onboardingTooltipNextBtnHandler('frameworks')
                          }
                        >
                          Next
                        </Button>
                        <Button
                          onClick={onboardingTooltipSkipBtnHandler}
                          variant="primary"
                          colors="white"
                        >
                          Skip tips
                        </Button>
                      </div>
                    </div>
                  </TooltipBody>
                </>
              }
              defaultOpen={
                showOnboardingTooltips &&
                !userDetails.trialGridProductOnboardingCompleted &&
                currentOnboardingTooltipCount === 1
              }
              placementSide="right"
              show={
                showOnboardingTooltips &&
                !userDetails.trialGridProductOnboardingCompleted &&
                currentOnboardingTooltipCount === 1
              }
              theme="dark"
            >
              <FrameworksTable
                containerClassName={containerClassName}
                copyBtnCbFn={copyBtnCbFn}
                frameworks={frameworks}
              />
            </Tooltip>
          </div>
        )}

        <div className="p-6">
          <Tooltip
            alignOffset={10}
            arrowPadding={10}
            content={
              <>
                <TooltipHeader>{TOOLTIP_MESSAGES[1].header}</TooltipHeader>
                <TooltipBody>
                  <div className="flex flex-col">
                    <div>{TOOLTIP_MESSAGES[1].content}</div>
                    <div className="mt-4 flex flex-row gap-3">
                      <Button
                        onClick={() =>
                          onboardingTooltipNextBtnHandler('userCreds')
                        }
                      >
                        Next
                      </Button>
                      <Button
                        onClick={onboardingTooltipSkipBtnHandler}
                        variant="primary"
                        colors="white"
                      >
                        Skip tips
                      </Button>
                    </div>
                  </div>
                </TooltipBody>
              </>
            }
            defaultOpen={
              showOnboardingTooltips &&
              !userDetails.trialGridProductOnboardingCompleted &&
              currentOnboardingTooltipCount === 2
            }
            placementAlign="start"
            placementSide="right"
            show={
              showOnboardingTooltips &&
              !userDetails.trialGridProductOnboardingCompleted &&
              currentOnboardingTooltipCount === 2
            }
            theme="dark"
          >
            <UserDetailsTable
              containerClassName={containerClassName}
              userDetails={userDetails}
            />
          </Tooltip>
        </div>
      </div>

      {selectedGridData.isTrialGrid && (
        <TestOnStaging containerClassName={containerClassName} />
      )}
    </>
  );
};

export default GridOverview;
