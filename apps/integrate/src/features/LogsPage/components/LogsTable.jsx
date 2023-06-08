import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLogDetailsThunk } from 'api/logDetails';
import {
  INTGButton,
  INTGLoader,
  INTGTable,
  INTGTableBody,
  INTGTableCell,
  INTGTableHead,
  INTGTableRow,
  INTGTruncateText
} from 'common/bifrostProxy';
import { GenericError, Logo } from 'common/index';
import { LOADING_STATUS } from 'constants/loadingConstants';
import {
  logsLoadingSelector,
  openLogDetailsSlideover
} from 'globalSlice/index';
import PropTypes from 'prop-types';

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
    <INTGTable>
      <INTGTableHead>
        <INTGTableRow>
          <INTGTableCell
            key="category"
            variant="header"
            textTransform="uppercase"
          >
            category
          </INTGTableCell>
          <INTGTableCell key="tool" variant="header" textTransform="uppercase">
            tool
          </INTGTableCell>
          <INTGTableCell
            key="endpoint"
            variant="header"
            textTransform="uppercase"
          >
            endpoint
          </INTGTableCell>
          <INTGTableCell key="date" variant="header" textTransform="uppercase">
            date
          </INTGTableCell>
          <INTGTableCell
            key="status"
            variant="header"
            textTransform="uppercase"
          >
            status
          </INTGTableCell>
          <INTGTableCell
            key="configuration-id"
            variant="header"
            textTransform="uppercase"
          >
            configuration id
          </INTGTableCell>
          <INTGTableCell key="details-link-header" variant="header" />
        </INTGTableRow>
      </INTGTableHead>
      <INTGTableBody>
        {areLogsLoaded && logsData?.logs?.length ? (
          logsData.logs.map((item) => (
            <INTGTableRow>
              <INTGTableCell key={`${item.uuid}-category`}>
                <p className="text-base-900">{item.category.label}</p>
              </INTGTableCell>
              <INTGTableCell key={`${item.uuid}-tool`}>
                <div className="flex items-center">
                  <Logo
                    logo={item.tool.icon}
                    wrapperClassName="mr-2"
                    label={item.tool.label}
                  />
                  <p className="text-base-900">{item.tool.label}</p>
                </div>
              </INTGTableCell>
              <INTGTableCell
                key={`${item.uuid}-endpoint`}
                wrapperClassName="w-80"
              >
                <INTGTruncateText
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
                </INTGTruncateText>
              </INTGTableCell>
              <INTGTableCell key={`${item.uuid}-date`}>
                <p>{item.date}</p>
              </INTGTableCell>
              <INTGTableCell key={`${item.uuid}-status`}>
                <StatusBadge statusCode={item.status} />
              </INTGTableCell>
              <INTGTableCell key={`${item.uuid}-configuration`}>
                <p>{item.configuration.name}</p>
              </INTGTableCell>
              <INTGTableCell key={`${item.uuid}-details-btn`}>
                <INTGButton
                  data-test-id="log-details-btn"
                  wrapperClassName="text-brand-600 hover:bg-inherit border-0 shadow-none bg-inherit focus:ring-0 focus:ring-offset-0 px-0 cursor-pointer"
                  colors="white"
                  onClick={() => handleLogDetail(item.uuid)}
                >
                  Details
                </INTGButton>
              </INTGTableCell>
            </INTGTableRow>
          ))
        ) : (
          <INTGTableRow>
            {emptyLogsFillers.map((emptyEntryString, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <INTGTableCell key={idx}>
                <p>{emptyEntryString}</p>
              </INTGTableCell>
            ))}
          </INTGTableRow>
        )}
      </INTGTableBody>
    </INTGTable>
  );
};
LogsTable.propTypes = {
  logsData: PropTypes.shape({
    logs: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  getLogs: PropTypes.func.isRequired
};
export default LogsTable;
