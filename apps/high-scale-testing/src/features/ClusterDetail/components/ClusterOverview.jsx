import React from 'react';
import {
  Badge,
  MdAddLink,
  MdContentCopy,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import CopyButton from 'common/CopyButton';

import useClusterOverview from './useClusterOverview';

const ClusterOverview = () => {
  const { containerClassName, fontColor900ClassName, clusterData } =
    useClusterOverview();

  const commonClassName =
    'border-base-200 flex flex-row items-center border-b py-3 text-sm justify-between';

  if (!Object.keys(clusterData).length) {
    return <></>;
  }

  //   ToDo: Check if we need all these Keys
  const {
    connected,
    grids,
    name,
    profile,
    runningNodes,
    status,
    uniqueId,
    user
  } = clusterData;

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
      value: profile.cloudProvider
    },
    {
      title: 'Connected',
      value: connected
    },
    {
      title: 'Created by',
      value: user.fullname
    },
    {
      title: 'No. of Grids',
      value: grids.length
    },
    {
      title: 'Region',
      value: uniqueId
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
      value: profile.instanceType
    }
  ];

  return (
    <>
      <div className="px-6 pt-6">
        <div className={containerClassName}>
          <p className="text-base-900 text-lg font-medium leading-6">
            Cluster Details
          </p>

          <div className="grid grid-cols-4 grid-rows-3 gap-x-8 gap-y-4 pt-4">
            {clusterDetailData.map((detail) => {
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

      <div className="flex flex-row gap-x-6 p-6">
        <div className="border-base-200 w-1/3 rounded-lg border bg-white p-6 shadow">
          <p className="text-base-900 text-lg font-medium leading-6">
            Advanced Details
          </p>
          <div className="mt-4">
            <div className={commonClassName}>
              <div className="flex w-1/3 items-center">
                <MdAddLink />
                <div className="ml-2 mr-6">
                  <p>VPC ID</p>
                </div>
              </div>

              <div className="flex w-2/3 justify-between">
                <div className="mr-4">
                  <p>{profile.vpcs}</p>
                </div>
                <CopyButton
                  copyValue={profile.vpcs}
                  textColor=""
                  wrapperClassName="text-xl"
                >
                  <MdContentCopy className="text-base-500" />
                </CopyButton>
              </div>
            </div>
            <div className={commonClassName}>
              <div className="flex w-1/3 items-center">
                <MdAddLink />
                <div className="ml-2 mr-6">
                  <p>Domain</p>
                </div>
              </div>
              <div className="flex w-2/3 justify-between">
                <div className="mr-4">
                  <p>{profile.domain}</p>
                </div>
                <CopyButton
                  copyValue={profile.domain}
                  textColor=""
                  wrapperClassName="text-xl"
                >
                  <MdContentCopy className="text-base-500" />
                </CopyButton>
              </div>
            </div>
            <div className={commonClassName}>
              <div className="flex w-1/3 items-center">
                <MdAddLink />
                <div className="ml-2 mr-6">
                  <p>Subnets</p>
                </div>
              </div>

              <div className="flex w-2/3 justify-between">
                <div className="mr-4">
                  <p>{profile.subnets.join(',')}</p>
                </div>
                <CopyButton
                  copyValue={profile.subnets.join(',')}
                  textColor=""
                  wrapperClassName="text-xl"
                >
                  <MdContentCopy className="text-base-500" />
                </CopyButton>
              </div>
            </div>
          </div>
        </div>

        <div className="border-base-200 w-2/3 rounded-lg border bg-white p-6 shadow">
          <p className="text-base-900 text-lg font-medium leading-6">
            Grid Resources
          </p>
          <Table containerWrapperClass="mt-4">
            <TableHead>
              <TableRow>
                <TableCell>GRID NAME</TableCell>
                <TableCell>CONCURRENCY</TableCell>
                <TableCell>RUNNING TEST</TableCell>
                <TableCell>QUEUED TEST</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grids.map((grid) => {
                const {
                  concurrency,
                  name: gridName,
                  runningTests,
                  queuedTests
                } = grid;
                return (
                  <TableRow wrapperClassName="text-base-900">
                    <TableCell>{gridName}</TableCell>
                    <TableCell>{concurrency}</TableCell>
                    <TableCell>{runningTests}</TableCell>
                    <TableCell>{queuedTests}</TableCell>
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
