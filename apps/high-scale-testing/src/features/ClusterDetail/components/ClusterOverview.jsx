import React from 'react';
import { Badge } from '@browserstack/bifrost';

import useClusterOverview from './useClusterOverview';

const ClusterOverview = () => {
  const { containerClassName, fontColor900ClassName, clusterData } =
    useClusterOverview();

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
    </>
  );
};

export default ClusterOverview;
