import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateIssue } from '@browserstack/integrations';
import { getEnvConfig } from 'utils/common';

import { toggleWidget } from './slices/integrationsWidgetSlice';
import { getIsWidgetOpen } from './slices/selectors';

const IntegrationsWidget = forwardRef((props, ref) => {
  const isOpen = useSelector(getIsWidgetOpen);
  const dispatch = useDispatch();

  const handleCloseWidget = () => {
    dispatch(toggleWidget(false));
  };

  const auth = {
    url: 'https://integrations-preprod.bsstag.com/api/user-access-tokens?unique_user_id=91',
    headers: {
      Authorization:
        'Basic aW50ZWdyYXRpb25zc2Vydl9VRWMzQVg6aHNzZXN4eW1STVRjb3pEVlBlZkM='
    }
  };

  const options = {
    description:
      '| Build Name | TestNG-Sanity | | Build Id | 4 | | Test Name | testng/src/test/java/com/bstackdemo/HomePageBasicTest.java > All-P1-Suite > HomePage-Suite > com.bstackdemo.HomePageBasicTest > testBrowserstackLogoTextFail | | Test Url | TBD | | Test Status | failed | | OS | ANDROID,12 | | Browser | Chrome,Unknown | | Host name | Dinesh*con-C02DM1WBML7H | | Defect Type | Product Bug | | Duration | 801.00ms | | isAutoAnalyzed | true |',
    attachments: [],
    successCallback: ({ ticketId, ticketUrl, attachment }) => {
      // eslint-disable-next-line no-console
      console.log('object :>> ', ticketId, ticketUrl, attachment);
    },
    errorCallback: (error) => {
      // eslint-disable-next-line no-console
      console.log('error :>> ', error, props, ref);
    }
  };

  return (
    <CreateIssue
      isOpen={isOpen}
      handleClose={handleCloseWidget}
      // position="right"
      // positionRef={buttonRef}
      // auth={{
      //   url: `${versionedBaseRoute()}/integration-service/accessToken`
      // }}
      auth={auth}
      // Used to configure the Env
      config={{
        baseURL: getEnvConfig().integrationsBaseUrl
      }}
      // Optional Fields
      options={options}
    />
  );
});

export default IntegrationsWidget;
