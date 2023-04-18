import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

// import Tooltip from 'trike/Tooltip';
import { useNetwork } from '../../state/Context';
import { isWidthAvailableToShowWaterfall } from '../../utils';

import TimeChart from './TimeChart';
import TimeChartTooltip from './TimeChartTooltip';

const NetworkTimeCell = ({ formattedValue, payload, showWaterfall }) => {
  const { state } = useNetwork();
  const maxTime = state.get('totalNetworkTime');
  const isWaterfall =
    showWaterfall &&
    isWidthAvailableToShowWaterfall(state.get('containerWidth'));
  return payload.time ? (
    // <Tooltip
    //   description={
    //     <TimeChartTooltip data={payload.timings} fromRequestDetail={false} />
    //   }
    //   align="right"
    //   direction="bottom"
    //   secondaryAlign="right"
    //   secondaryDirection="top"
    //   type="light"
    // >
    <section
      className={twClassNames('network-time-cell', {
        'network-time-cell--is-waterfall': isWaterfall
      })}
    >
      <section className="network-time-cell__value">{formattedValue}</section>
      <section className="network-time-cell__chart">
        <TimeChart
          maxTime={maxTime}
          timings={payload.timings}
          isWaterfall={isWaterfall}
          renderFrom="time-cell"
        />
      </section>
    </section>
  ) : // </Tooltip>
  null;
};

NetworkTimeCell.propTypes = {
  formattedValue: PropTypes.string.isRequired,
  payload: PropTypes.object.isRequired,
  showWaterfall: PropTypes.bool
};
NetworkTimeCell.defaultProps = {
  showWaterfall: true
};

export default NetworkTimeCell;
