import React, { forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateIssue } from '@browserstack/integrations';
import { getEnvConfig } from 'utils/common';

import { toggleWidget } from './slices/integrationsWidgetSlice';
import {
  getIsWidgetOpen,
  getWidgetConfiguration,
  getWidgetData
} from './slices/selectors';

const IntegrationsWidget = forwardRef((_, ref) => {
  const isOpen = useSelector(getIsWidgetOpen);
  const configuration = useSelector(getWidgetConfiguration);
  const data = useSelector(getWidgetData);
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
    description: data.description,
    attachments: [],
    successCallback: ({ ticketId, ticketUrl, attachment }) => {
      // eslint-disable-next-line no-console
      console.log('object :>> ', ticketId, ticketUrl, attachment);
    },
    errorCallback: (error) => {
      // eslint-disable-next-line no-console
      console.log('error :>> ', error, ref);
    }
  };

  return (
    <CreateIssue
      isOpen={isOpen}
      handleClose={handleCloseWidget}
      position={configuration.position}
      positionRef={ref?.current ? ref : null}
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
