import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Tabs } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import TimeChartTooltip from '../Components/NetworkTable/TimeChartTooltip';
import Headers from '../Components/ReqDetail/Headers';
import Payload from '../Components/ReqDetail/Payload';
import Response from '../Components/ReqDetail/Response';
import {
  InlineSlideOverBody,
  InlineSlideOverContainer,
  InlineSlideOverHeader
} from '../InlineSlideOver';
import { useNetwork } from '../state/Context';

const APPLICABLE_TABS = {
  headers: {
    name: 'Headers',
    value: 'headers'
  },
  response: {
    name: 'Response',
    value: 'response'
  },
  payload: {
    name: 'Payload',
    value: 'payload'
  },
  timing: {
    name: 'Timing',
    value: 'timing'
  }
};

const ReqDetailContainer = ({
  isResponseCaptured,
  isResponseNotCapturedDueToCaps,
  responseHelpLink
}) => {
  const [activeTab, setActiveTab] = useState({
    id: APPLICABLE_TABS.headers.value,
    idx: 0
  });
  const { actions, state } = useNetwork();
  const reqDetail = state.get('reqDetail');
  const reqDetailContainerRef = useRef(null);
  const isPayloadDataAvailable =
    !!reqDetail.headers.queryString?.length ||
    !!reqDetail.headers.postData?.params ||
    !!reqDetail.headers.postData?.text;
  const handleCloseClick = () => {
    actions.selectRequest(null);
  };
  useEffect(() => {
    setActiveTab({
      id: APPLICABLE_TABS.headers.value,
      idx: 0
    });
  }, [reqDetail.index]);
  // adding key so that tabs should unmount and remount to reset selected tab on change of selection

  const tabList = useMemo(() => {
    const list = [APPLICABLE_TABS.headers];
    if (isPayloadDataAvailable) {
      list.push(APPLICABLE_TABS.payload);
    }
    list.push(APPLICABLE_TABS.response);
    if (reqDetail.time > 0) {
      list.push(APPLICABLE_TABS.timing);
    }

    return list;
  }, [isPayloadDataAvailable, reqDetail.time]);

  const onTabChange = (selectedTab) => {
    const foundIdx = tabList.findIndex(
      (tab) => tab.value === selectedTab.value
    );
    setActiveTab({
      idx: foundIdx,
      id: selectedTab.value
    });
  };

  return (
    <InlineSlideOverContainer
      ref={reqDetailContainerRef}
      key={reqDetail.index}
      wrapperClassName="pt-0 px-6 w-9/12"
    >
      <InlineSlideOverHeader handleClickDismiss={handleCloseClick}>
        <Tabs
          defaultIndex={activeTab.idx}
          tabsArray={tabList}
          onTabChange={onTabChange}
          wrapperClassName="relative top-[1px]"
        />
      </InlineSlideOverHeader>
      <InlineSlideOverBody wrapperClassName="py-3">
        {activeTab.id === APPLICABLE_TABS.headers.value && (
          <Headers data={reqDetail} />
        )}
        {isPayloadDataAvailable &&
          activeTab.id === APPLICABLE_TABS.payload.value && (
            <Payload data={reqDetail} />
          )}
        {activeTab.id === APPLICABLE_TABS.response.value && (
          <Response
            data={reqDetail}
            isResponseCaptured={isResponseCaptured}
            isResponseNotCapturedDueToCaps={isResponseNotCapturedDueToCaps}
            responseHelpLink={responseHelpLink}
          />
        )}
        {reqDetail.time > 0 &&
          activeTab.id === APPLICABLE_TABS.timing.value && (
            <TimeChartTooltip data={reqDetail.timings} fromRequestDetail />
          )}
      </InlineSlideOverBody>
    </InlineSlideOverContainer>
  );
};

ReqDetailContainer.propTypes = {
  isResponseCaptured: PropTypes.bool.isRequired,
  isResponseNotCapturedDueToCaps: PropTypes.bool.isRequired,
  responseHelpLink: PropTypes.string.isRequired
};

export default ReqDetailContainer;
