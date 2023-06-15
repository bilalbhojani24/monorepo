import React from 'react';
import {
  Badge,
  MdContentCopy,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import CopyButton from 'common/CopyButton';
import cloudIcons from 'constants/cloudIcons';

import useClusterOverview from './useClusterOverview';

const ClusterOverview = () => {
  const {
    containerClassName,
    fontColor900ClassName,
    clusterData,
    vpcCopiedCallbackFn
  } = useClusterOverview();

  const commonClassName =
    'border-base-200 flex flex-row items-center border-b py-3 text-sm justify-between';

  if (!Object.keys(clusterData).length) {
    return <></>;
  }

  //   ToDo: Check if we need all these Keys
  const { connected, grids, name, profile, runningNodes, status, uniqueId } =
    clusterData;

  const clusterDetailData = [
    {
      title: 'Cluster Name',
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
      title: 'Cloud Provider',
      value: profile?.cloudProvider
    },
    {
      title: 'Connected',
      value: connected
    },
    {
      title: 'Created by',
      value: clusterData?.createdBy.fullName
    },
    {
      title: 'No. of Grids',
      value: grids?.length
    },
    {
      title: 'Region',
      value: profile?.region
    },
    {
      title: 'Cluster ID',
      value: uniqueId
    },
    {
      title: 'Running Nodes',
      value: runningNodes
    },
    {
      title: 'Instance Type',
      value: profile?.instanceType
    }
  ];

  return (
    <>
      <div className="px-6 pt-6">
        <div className={containerClassName}>
          <p className="text-lg font-medium leading-6 text-base-900">
            Cluster Details
          </p>

          <div className="grid grid-cols-4 grid-rows-3 gap-x-8 gap-y-4 pt-6">
            {clusterDetailData.map((detail) => {
              const { title, value } = detail;
              return (
                <div>
                  <p className="text-sm font-normal text-base-500">{title}</p>

                  {title === 'Cloud Provider' ? (
                    <div className="flex gap-x-2">
                      <span>{cloudIcons[value]}</span>{' '}
                      <p className={fontColor900ClassName}>{value}</p>
                    </div>
                  ) : (
                    <p className={fontColor900ClassName}>{value}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-x-6 p-6">
        <div className="w-2/5 rounded-lg border border-base-200 bg-white p-6 shadow">
          <p className="text-lg font-medium leading-6 text-base-900">
            Advanced Details
          </p>
          <div className="mt-6">
            <div className={commonClassName}>
              <div className="flex w-1/3 items-center">
                <div className="ml-2 mr-6 text-base text-base-500">
                  <p>VPC ID</p>
                </div>
              </div>

              <div className="flex w-2/3 justify-between">
                <div className="mr-4 text-base-900">
                  <p>{profile?.vpcs}</p>
                </div>
                <CopyButton
                  cb={vpcCopiedCallbackFn}
                  copyValue={profile?.vpcs}
                  textColor=""
                  wrapperClassName="text-xl"
                >
                  <MdContentCopy className="text-base-500" />
                </CopyButton>
              </div>
            </div>
            <div className={commonClassName}>
              <div className="flex w-1/3 items-center text-base-500">
                <div className="ml-2 mr-6  text-base">
                  <p>Domain</p>
                </div>
              </div>
              <div className="flex w-2/3 justify-between text-base-900">
                <div className="mr-4">
                  <p>{profile?.domain}</p>
                </div>
                <CopyButton
                  copyValue={profile?.domain}
                  textColor=""
                  wrapperClassName="text-xl"
                >
                  <MdContentCopy className="text-base-500" />
                </CopyButton>
              </div>
            </div>
            <div className={commonClassName}>
              <div className="flex w-1/3 items-center text-base-500">
                <div className="ml-2 mr-6 text-base">
                  <p>Subnets</p>
                </div>
              </div>

              <div className="flex w-2/3 justify-between text-base-900">
                <div className="mr-4">
                  <p>{profile?.subnets.join(',')}</p>
                </div>
                <CopyButton
                  copyValue={profile?.subnets.join(',')}
                  textColor=""
                  wrapperClassName="text-xl"
                >
                  <MdContentCopy className="text-base-500" />
                </CopyButton>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/5 rounded-lg border border-base-200 bg-white p-6 shadow">
          <p className="text-lg font-medium leading-6 text-base-900">
            Grid Resources
          </p>
          <Table containerWrapperClass="mt-6">
            <TableHead>
              <TableRow>
                <TableCell wrapperClassName="text-xs px-6 py-3 text-base-500 font-medium">
                  GRID NAME
                </TableCell>
                <TableCell wrapperClassName="text-xs px-6 py-3 text-base-500 font-medium">
                  CONCURRENCY
                </TableCell>
                <TableCell wrapperClassName="text-xs px-6 py-3 text-base-500 font-medium">
                  RUNNING TEST
                </TableCell>
                <TableCell wrapperClassName="text-xs px-6 py-3 text-base-500 font-medium">
                  QUEUED TEST
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grids?.map((grid) => {
                const {
                  concurrency,
                  name: gridName,
                  runningTests,
                  queuedTests
                } = grid;
                return (
                  <TableRow wrapperClassName="text-base-900">
                    <TableCell wrapperClassName="px-6 py-4">
                      {gridName}
                    </TableCell>
                    <TableCell wrapperClassName="px-6 py-4">
                      {concurrency}
                    </TableCell>
                    <TableCell wrapperClassName="px-6 py-4">
                      {runningTests}
                    </TableCell>
                    <TableCell wrapperClassName="px-6 py-4">
                      {queuedTests}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ClusterOverview;
