import React, { useMemo } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { useNetwork } from '../../state/Context';
import { isWidthAvailableToShowWaterfall } from '../../utils';

import TimeChart from './TimeChart';

const NetworkTimeCell = ({ formattedValue, payload, showWaterfall }) => {
  const { state } = useNetwork();
  const containerWidth = state.get('containerWidth');
  const maxTime = state.get('totalNetworkTime');
  const isWaterfall = useMemo(
    () => showWaterfall && isWidthAvailableToShowWaterfall(containerWidth),
    [containerWidth, showWaterfall]
  );
  if (!payload.time) {
    return null;
  }
  return (
    <section
      className={twClassNames('flex flex-col gap-2', {
        'flex-row items-center': isWaterfall
      })}
    >
      <section
        className={twClassNames({
          'w-[100px] shrink-0': isWaterfall
        })}
      >
        {formattedValue}
      </section>
      <section className="flex-1">
        <TimeChart
          maxTime={maxTime}
          timings={payload.timings}
          isWaterfall={isWaterfall}
          renderFrom="request-detail"
        />
      </section>
    </section>
  );
};

NetworkTimeCell.propTypes = {
  formattedValue: PropTypes.string.isRequired,
  payload: PropTypes.objectOf(PropTypes.any).isRequired,
  showWaterfall: PropTypes.bool
};
NetworkTimeCell.defaultProps = {
  showWaterfall: true
};

export default React.memo(NetworkTimeCell);
