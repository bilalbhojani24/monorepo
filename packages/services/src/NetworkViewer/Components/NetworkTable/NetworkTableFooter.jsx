import React from 'react';
import PropTypes from 'prop-types';

import { formatSize, formatTime } from '../../utils';

const NetworkTableFooter = ({ dataSummary }) => {
  const totalRequests = dataSummary.get('totalRequests');
  const totalTransferredSize = dataSummary.get('totalTransferredSize');
  const totalUncompressedSize = dataSummary.get('totalUncompressedSize');
  const finish = dataSummary.get('finish');
  const { DOMContentLoaded, onLoad } = dataSummary.get('timings');
  return (
    <div className="">
      {!Number.isNaN(+totalRequests) && (
        <span>{`${totalRequests} requests`}</span>
      )}
      {!Number.isNaN(+totalTransferredSize) && (
        <span>{`${formatSize(totalTransferredSize)} transferred`}</span>
      )}
      {!Number.isNaN(+totalUncompressedSize) && (
        <span>{`${formatSize(totalUncompressedSize)} resources`}</span>
      )}
      {!Number.isNaN(+finish) && (
        <span>{`Finished: ${formatTime(finish)}`}</span>
      )}
      {!Number.isNaN(+DOMContentLoaded) && (
        <span>{`DOMContentLoaded: ${formatTime(DOMContentLoaded)}`}</span>
      )}
      {!Number.isNaN(+onLoad) && <span>{`Load: ${formatTime(onLoad)}`}</span>}
    </div>
  );
};

NetworkTableFooter.propTypes = {
  dataSummary: PropTypes.object.isRequired
};

export default NetworkTableFooter;
