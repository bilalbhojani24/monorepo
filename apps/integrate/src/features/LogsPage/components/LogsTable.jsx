import React, { useEffect } from 'react';
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

import { getLogDetailsThunk, getLogsThunk } from '../../../api';
import { INTGLoader } from '../../../common/bifrostProxy';
import { LOADING_STATUS } from '../../../constants/loadingConstants';
import {
  logsLoadingSelector,
  openLogDetailsSlideover
} from '../../../globalSlice';

import StatusBadge from './StatusBadge';

const LogsTable = ({
  to,
  from,
  page,
  sortBy,
  method,
  pageSize,
  logsData,
  urlSearch,
  statusCode,
  integrations,
  configurationIds
}) => {
  const dispatch = useDispatch();
  const areLogsLoading =
    useSelector(logsLoadingSelector) === LOADING_STATUS.PENDING;
  useEffect(() => {
    dispatch(
      getLogsThunk({
        to,
        from,
        page,
        method,
        sortBy,
        pageSize,
        urlSearch,
        statusCode,
        integrations,
        configurationIds
      })
    );
  }, [
    dispatch,
    to,
    from,
    page,
    sortBy,
    method,
    pageSize,
    urlSearch,
    statusCode,
    integrations,
    configurationIds
  ]);

  const handleLogDetail = (logUUID) => {
    dispatch(getLogDetailsThunk(logUUID));
    dispatch(openLogDetailsSlideover());
  };
  const formatDateForTable = (date) =>
    format(new Date(date), 'dd/MM/yyyy HH:mm:ss');

  if (areLogsLoading) {
    return <INTGLoader wrapperClassName="h-96" />;
  }

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
        {logsData?.logs?.map((item) => (
          <TableRow>
            <TableCell key={`${item.uuid}-category`}>
              <p className="text-base-900">{item.category.label}</p>
            </TableCell>
            <TableCell key={`${item.uuid}-tool`}>
              <p className="text-base-900">{item.tool.label}</p>
            </TableCell>
            <TableCell key={`${item.uuid}-endpoint`}>
              <TruncateText
                containerClassName="w-80"
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
        ))}
      </TableBody>
    </Table>
  );
};
LogsTable.propTypes = {
  to: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  logsData: PropTypes.shape({
    logs: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  urlSearch: PropTypes.string.isRequired,
  statusCode: PropTypes.string.isRequired,
  integrations: PropTypes.string.isRequired,
  configurationIds: PropTypes.string.isRequired
};
export default LogsTable;
