import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { formatSize } from '../../../utils';

import HeaderTitle from './HeaderTitle';

const HeaderInfo = ({
  eventKey,
  data,
  component,
  isEncodeEnabled,
  isParseEnabled
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPayloadTransformed, setIsPayloadTransformed] = useState(true);

  const headerContentLength =
    ['request', 'response'].includes(eventKey) &&
    data.headers[eventKey]?.find(
      (header) => header.name?.toLowerCase() === 'content-length'
    )?.value;
  const formattedHeaderContentLength = headerContentLength
    ? formatSize(headerContentLength)
    : '';

  const handlePayloadTransform = (e) => {
    e.stopPropagation();
    setIsPayloadTransformed(!isPayloadTransformed);
    if (!isVisible) {
      setIsVisible(true);
    }
  };
  const ChildComponent = () =>
    component({
      data,
      isPayloadTransformed,
      onChangeEncode: setIsPayloadTransformed
    });

  return (
    <div className={twClassNames('header-info', { active: isVisible })}>
      <HeaderTitle
        eventKey={eventKey}
        payloadSize={formattedHeaderContentLength}
        isEncodeEnabled={isEncodeEnabled}
        isParseEnabled={isParseEnabled}
        isPayloadTransformed={isPayloadTransformed}
        onClick={() => setIsVisible(!isVisible)}
        onPayloadTransform={handlePayloadTransform}
      />
      {isVisible && <ChildComponent />}
    </div>
  );
};

HeaderInfo.propTypes = {
  component: PropTypes.func.isRequired,
  data: PropTypes.object,
  eventKey: PropTypes.string.isRequired,
  isEncodeEnabled: PropTypes.bool,
  isParseEnabled: PropTypes.bool
};

HeaderInfo.defaultProps = {
  data: null,
  isEncodeEnabled: false,
  isParseEnabled: false
};

export default HeaderInfo;
