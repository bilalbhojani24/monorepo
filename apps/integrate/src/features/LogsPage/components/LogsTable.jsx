import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TruncateText
} from '@browserstack/bifrost';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import { getLogDetailsThunk } from '../../../api';
import { GenericError, Logo } from '../../../common';
import { INTGLoader } from '../../../common/bifrostProxy';
import { LOADING_STATUS } from '../../../constants/loadingConstants';
import {
  logsLoadingSelector,
  openLogDetailsSlideover
} from '../../../globalSlice';

import StatusBadge from './StatusBadge';

const LogsTable = ({ logsData, getLogs }) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(logsLoadingSelector);
  const areLogsLoading = loadingStatus === LOADING_STATUS.PENDING;
  const areLogsLoaded = loadingStatus === LOADING_STATUS.SUCCEEDED;
  const isLogsFailure = loadingStatus === LOADING_STATUS.FAILED;

  const handleLogDetail = (logUUID) => {
    dispatch(getLogDetailsThunk({ logUUID }));
    dispatch(openLogDetailsSlideover());
  };
  const formatDateForTable = (date) =>
    format(new Date(date), 'dd/MM/yyyy HH:mm:ss');

  const handleTryAgain = useCallback(getLogs, [getLogs]);

  if (areLogsLoading) {
    return <INTGLoader wrapperClassName="h-80" />;
  }

  if (isLogsFailure) {
    return (
      <GenericError
        wrapperClassName="h-80"
        errorMessage="Error loading logs"
        handleTryAgain={handleTryAgain}
      />
    );
  }

  const emptyLogsFillers = new Array(6).fill('--');

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell key="category" variant="header" textTransform="uppercase">
            category
          </TableCell>
          <TableCell key="tool" variant="header" textTransform="uppercase">
            tool
          </TableCell>
          <TableCell key="endpoint" variant="header" textTransform="uppercase">
            endpoint
          </TableCell>
          <TableCell key="date" variant="header" textTransform="uppercase">
            date
          </TableCell>
          <TableCell key="status" variant="header" textTransform="uppercase">
            status
          </TableCell>
          <TableCell
            key="configuration-id"
            variant="header"
            textTransform="uppercase"
          >
            configuration id
          </TableCell>
          <TableCell key="details-link-header" variant="header" />
        </TableRow>
      </TableHead>
      <TableBody>
        {areLogsLoaded && logsData?.logs?.length ? (
          logsData.logs.map((item) => (
            <TableRow>
              <TableCell key={`${item.uuid}-category`}>
                <p className="text-base-900">{item.category.label}</p>
              </TableCell>
              <TableCell key={`${item.uuid}-tool`}>
                <div className="flex items-center">
                  <Logo
                    logo={item.tool.icon}
                    wrapperClassName="mr-2"
                    label={item.tool.label}
                  />
                  <p className="text-base-900">{item.tool.label}</p>
                </div>
              </TableCell>
              <TableCell key={`${item.uuid}-endpoint`}>
                <TruncateText
                  containerClassName="w-80"
                  wrapperClassName="break-words"
                  tooltipContent={
                    <p className="text-base-300 mb-0 break-words px-4">
                      {item.endpoint}
                    </p>
                  }
                  truncateUsingClamp={false}
                  hidetooltipTriggerIcon
                  isFullWidthTooltip
                >
                  {item.endpoint}
                </TruncateText>
              </TableCell>
              <TableCell key={`${item.uuid}-date`}>
                <p>{formatDateForTable(item.date)}</p>
              </TableCell>
              <TableCell key={`${item.uuid}-status`}>
                <StatusBadge statusCode={item.status} />
              </TableCell>
              <TableCell key={`${item.uuid}-configuration`}>
                <p>{item.configuration.name}</p>
              </TableCell>
              <TableCell key={`${item.uuid}-details-btn`}>
                <Button
                  wrapperClassName="text-brand-600 hover:bg-inherit border-0 shadow-none bg-inherit focus:ring-0 focus:ring-offset-0 px-0 cursor-pointer"
                  colors="white"
                  onClick={() => handleLogDetail(item.uuid)}
                >
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            {emptyLogsFillers.map((emptyEntryString, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableCell key={idx}>
                <p>{emptyEntryString}</p>
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
LogsTable.propTypes = {
  logsData: PropTypes.shape({
    logs: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  getLogs: PropTypes.func.isRequired
};
export default LogsTable;
