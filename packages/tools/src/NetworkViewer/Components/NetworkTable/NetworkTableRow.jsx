import React from 'react';
import { TableCell, TableRow } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { ROW_ID_PREFIX, VIEWER_FIELDS } from '../../constants';
import { getStatusClass } from '../../utils';

import NetworkCellValue from './NetworkCellValue';

const NetworkTableRow = ({
  payload,
  scrollHighlight,
  onSelect,
  showWaterfall,
  shouldShowLimitedCols
}) => {
  const handleSelectRequest = () => {
    onSelect(payload);
    // if (!['automate', 'app_automate'].includes(product)) {
    //   return;
    // }

    // const eventType =
    //   product === 'automate'
    //     ? window.EDS.automateWebEvent
    //     : window.EDS.appAutomateWebEvents;
    // const name = `${
    //   product === 'automate' ? 'Atm' : 'AppAtm'
    // }HARViewerRowClicked`;
    // const eventData = {
    //   team: product,
    //   product,
    //   requestType: payload.type
    // };
    // window.WebEventTracker?.logEvent?.([], eventType, name, eventData);
  };

  const rowProps = {
    wrapperClassName: twClassNames('cursor-pointer', {
      'bg-brand-50': scrollHighlight
    }),
    id: ROW_ID_PREFIX + payload.index,
    onRowClick: handleSelectRequest
  };

  return (
    <TableRow {...rowProps}>
      {Object.entries(VIEWER_FIELDS).map(
        ([datakey, { key, renderComponent }], idx) => (
          <TableCell
            key={datakey}
            wrapperClassName={twClassNames(
              'align-top border border-base-300',
              getStatusClass(payload),
              {
                hidden: idx > 0 && shouldShowLimitedCols
              }
            )}
          >
            <NetworkCellValue
              datakey={key}
              payload={payload}
              renderComponent={renderComponent}
              showWaterfall={showWaterfall}
            />
          </TableCell>
        )
      )}
    </TableRow>
  );
};

NetworkTableRow.propTypes = {
  onSelect: PropTypes.func.isRequired,
  payload: PropTypes.object.isRequired,
  scrollHighlight: PropTypes.bool.isRequired,
  showWaterfall: PropTypes.bool,
  shouldShowLimitedCols: PropTypes.bool
};
NetworkTableRow.defaultProps = {
  showWaterfall: true,
  shouldShowLimitedCols: false
};

export default NetworkTableRow;
