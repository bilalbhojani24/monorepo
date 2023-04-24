import React, { useState } from 'react';
import {
  Accordion,
  AccordionInteractiveHeader,
  AccordionPanel,
  Button
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { HEADERS_TITLES, PAYLOAD_CAPTIONS } from '../../../constants';
import { NL_EVENTS } from '../../../nlEvents';
import { formatSize } from '../../../utils';

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
      payloadSize: formattedHeaderContentLength,
      isPayloadTransformed,
      onChangeEncode: setIsPayloadTransformed
    });

  const handleClickAccordion = () => {
    window.pubSub.publish(NL_EVENTS.NL_PUBSUB_EVENT_NAME, {
      event: NL_EVENTS.REQ_DETAILS_ACCORDION_CLICKED,
      data: {
        accordion: HEADERS_TITLES[eventKey].name,
        state: !isVisible
      }
    });
    setIsVisible(!isVisible);
  };

  const payloadStatus =
    PAYLOAD_CAPTIONS[isParseEnabled ? 'parse' : 'encode'][isPayloadTransformed];

  return (
    <Accordion defaultOpen wrapperClassName="mb-3">
      <AccordionInteractiveHeader
        wrapperClassName="bg-white p-0"
        title={
          <p className="text-left text-sm font-medium uppercase">
            <span>{HEADERS_TITLES[eventKey].name}</span>
            {!!formattedHeaderContentLength && (
              <span className="text-base-500 ml-1 font-normal">
                ({formattedHeaderContentLength})
              </span>
            )}
          </p>
        }
        asideContent={
          <>
            {(isEncodeEnabled || isParseEnabled) && (
              <Button
                onClick={handlePayloadTransform}
                variant="minimal"
                colors="white"
                wrapperClassName="font-normal text-xs"
              >
                {`View ${payloadStatus}`}
              </Button>
            )}
          </>
        }
        controller={isVisible}
        onClick={handleClickAccordion}
      />
      <AccordionPanel controller={isVisible}>
        <div className="pl-9">
          <ChildComponent />
        </div>
      </AccordionPanel>
    </Accordion>
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
