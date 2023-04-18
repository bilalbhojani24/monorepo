import React, { useEffect, useRef } from 'react';
import { MdClose } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import Tab from '../Components/Common/Tab';
import Tabs from '../Components/Common/Tabs';
import TimeChartTooltip from '../Components/NetworkTable/TimeChartTooltip';
import Headers from '../Components/ReqDetail/Headers';
import Payload from '../Components/ReqDetail/Payload';
import Response from '../Components/ReqDetail/Response';
import { VIEWER_FIELDS } from '../constants';
import { useNetwork } from '../state/Context';

const ReqDetailContainer = ({
  isResponseCaptured,
  isResponseNotCapturedDueToCaps,
  appAutomateFramework
}) => {
  const { actions, state } = useNetwork();
  const reqDetail = state.get('reqDetail');
  const containerWidth = state.get('containerWidth');
  const detailContainerWidth =
    containerWidth - VIEWER_FIELDS.file.columnWidth(containerWidth);
  const reqDetailContainerRef = useRef(null);
  const isPayloadDataAvailable =
    !!reqDetail.headers.queryString?.length ||
    !!reqDetail.headers.postData?.params ||
    !!reqDetail.headers.postData?.text;
  const handleCloseClick = () => {
    actions.selectRequest(null);
  };
  // Scrolls to top on change
  useEffect(() => {
    if (reqDetailContainerRef?.current) {
      reqDetailContainerRef.current.scrollTop = 0;
    }
  }, [reqDetail.index]);
  // adding key so that tabs shouldd unmount and remount to reset selected tab on change of selection
  return (
    <div
      ref={reqDetailContainerRef}
      className="req-detail-container"
      style={{ maxWidth: `${detailContainerWidth}px` }}
      key={reqDetail.index}
    >
      <Tabs
        className="req-detail-container__nav-tabs"
        showCount={Math.floor((detailContainerWidth - 80) / 80)}
      >
        {/* considering max width of individual tab as 80px and 80 px minimum space for cross icon */}
        <Tab value="headers" label="Headers">
          <Headers data={reqDetail} />
        </Tab>
        {isPayloadDataAvailable && (
          <Tab value="payload" label="Payload">
            <Payload data={reqDetail} />
          </Tab>
        )}
        <Tab value="response" label="Response">
          <Response
            data={reqDetail}
            isResponseCaptured={isResponseCaptured}
            isResponseNotCapturedDueToCaps={isResponseNotCapturedDueToCaps}
            appAutomateFramework={appAutomateFramework}
            id={`base-tabs-panel-${isPayloadDataAvailable ? '2' : '1'}`}
          />
        </Tab>
        {reqDetail.time > 0 && (
          <Tab value="timing" label="Timing">
            <span
              className="req-detail-container--timing-tab"
              id={`base-tabs-panel-${isPayloadDataAvailable ? '3' : '2'}`}
            >
              <TimeChartTooltip data={reqDetail.timings} fromRequestDetail />
            </span>
          </Tab>
        )}
      </Tabs>
      <button
        aria-label="Close request details"
        className="req-detail-container__close-button"
        onClick={handleCloseClick}
        type="button"
      >
        <MdClose
          className="req-detail-container__close-icon"
          role="img"
          aria-hidden="false"
          title="Close tab"
          fontSize="inherit"
        />
      </button>
    </div>
  );
};

ReqDetailContainer.propTypes = {
  isResponseCaptured: PropTypes.bool.isRequired,
  isResponseNotCapturedDueToCaps: PropTypes.bool.isRequired,
  appAutomateFramework: PropTypes.string
};

ReqDetailContainer.defaultProps = {
  appAutomateFramework: ''
};

export default ReqDetailContainer;
