import React from 'react';
import { MdKeyboardArrowUp } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { HEADERS_TITLES, PAYLOAD_CAPTIONS } from '../../../constants';

const HeaderTitle = ({
  onClick,
  eventKey,
  payloadSize,
  isEncodeEnabled,
  onPayloadTransform,
  isPayloadTransformed,
  isParseEnabled
}) => {
  const payloadStatus =
    PAYLOAD_CAPTIONS[isParseEnabled ? 'parse' : 'encode'][isPayloadTransformed];

  return (
    <div className="har-header-title">
      <span
        className="har-header-title__text"
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        <MdKeyboardArrowUp
          aria-hidden="false"
          role="img"
          title="Toggle accordian"
          fontSize="inherit"
          className="har-header-title__caret-icon"
        />
        {HEADERS_TITLES[eventKey].name}
        {!!payloadSize && (
          <span className="har-header-title__payload-size">
            ({payloadSize})
          </span>
        )}
      </span>
      {(isEncodeEnabled || isParseEnabled) && (
        <span
          className="har-header-title__encode-url"
          onClick={onPayloadTransform}
          role="button"
          tabIndex={0}
        >
          {`View ${payloadStatus}`}
        </span>
      )}
    </div>
  );
};

HeaderTitle.propTypes = {
  eventKey: PropTypes.string.isRequired,
  isEncodeEnabled: PropTypes.bool,
  isParseEnabled: PropTypes.bool,
  isPayloadTransformed: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  onPayloadTransform: PropTypes.func.isRequired,
  payloadSize: PropTypes.string.isRequired
};

HeaderTitle.defaultProps = {
  isEncodeEnabled: false,
  isParseEnabled: false,
  isPayloadTransformed: true
};

export default HeaderTitle;
