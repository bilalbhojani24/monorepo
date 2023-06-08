import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { logEvent } from '@browserstack/utils';
import cloudIcons from 'constants/cloudIcons';
import { AGAutomationConsoleInteracted } from 'constants/event-names';

import { useClustersListing } from './useClustersListing';

const ClustersListing = () => {
  const { clustersList, isRounded, statusModifier, tableCellWrapperClassName } =
    useClustersListing();
  const navigate = useNavigate();

  const ClusterRowHandler = (clusterId) => {
    navigate(`/grid-console/cluster/${clusterId}/overview`);
  };

  return (
    clustersList.length > 0 && (
      <div className="p-6">
        <Table containerWrapperClass=" border-base-50 rounded-lg shadow-none">
          <TableHead wrapperClassName="uppercase text-base-500">
            <TableRow>
              <TableCell
                variant="header"
                wrapperClassName={tableCellWrapperClassName}
              >
                Cluster
              </TableCell>
              <TableCell
                variant="header"
                wrapperClassName={tableCellWrapperClassName}
              >
                Status
              </TableCell>
              <TableCell
                variant="header"
                wrapperClassName={tableCellWrapperClassName}
              >
                cloud
              </TableCell>
              <TableCell
                variant="header"
                wrapperClassName={tableCellWrapperClassName}
              >
                region
              </TableCell>
              <TableCell
                variant="header"
                wrapperClassName={tableCellWrapperClassName}
              >
                running nodes
              </TableCell>
              <TableCell
                variant="header"
                wrapperClassName={tableCellWrapperClassName}
              >
                no. of Grids
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {clustersList.map((clusterData) => {
              const clusterName = clusterData.name;
              const clusterId = clusterData.uniqueId;
              const clusterStatus = clusterData.status;
              const { grids } = clusterData;
              const { cloudProvider, region } = clusterData.profile;

              return (
                <TableRow
                  onRowClick={() => {
                    logEvent(
                      ['amplitude'],
                      'web_events',
                      AGAutomationConsoleInteracted,
                      {
                        action: 'cluster_selected',
                        cluster_name: clusterName,
                        cluster_id: clusterId
                      }
                    );
                    ClusterRowHandler(clusterId);
                  }}
                >
                  <TableCell wrapperClassName="text-base-900 px-6 py-4">
                    <p className="font-normal">{clusterName}</p>
                    <p className="text-base-500">{clusterId}</p>
                  </TableCell>
                  <TableCell wrapperClassName="px-6 py-4">
                    <Badge
                      disabled
                      hasDot={false}
                      hasRemoveButton={false}
                      isRounded={isRounded}
                      modifier={statusModifier[clusterStatus]}
                      text={clusterStatus}
                    />
                  </TableCell>
                  <TableCell wrapperClassName=" px-6 py-4">
                    {cloudIcons[cloudProvider]}
                  </TableCell>
                  <TableCell wrapperClassName="px-6 py-4">
                    <p className="font-norma text-base-900">{region}</p>
                  </TableCell>
                  <TableCell wrapperClassName=" px-6 py-4">
                    <p className="text-base-900 font-normal">12/50</p>
                  </TableCell>
                  <TableCell wrapperClassName=" px-6 py-4">
                    <p className="text-base-900 font-normal">{grids.length}</p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    )
  );
};

export default ClustersListing;
