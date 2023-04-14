import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateIssue } from '@browserstack/integrations';
import { versionedBaseRoute } from 'constants/common';
import { AppContext } from 'features/Layout/context/AppContext';
import { getEnvConfig } from 'utils/common';

import { toggleWidget } from './slices/integrationsWidgetSlice';
import {
  getIsWidgetOpen,
  getWidgetConfiguration,
  getWidgetData
} from './slices/selectors';
import {
  STATIC_INTEGRATIONS_PREPROD_TOKEN,
  STATIC_INTEGRATIONS_PREPROD_URL
} from './constants';

const IntegrationsWidget = () => {
  const isOpen = useSelector(getIsWidgetOpen);
  const configuration = useSelector(getWidgetConfiguration);
  const data = useSelector(getWidgetData);
  const dispatch = useDispatch();
  const { widgetPositionRef } = useContext(AppContext);

  const handleCloseWidget = () => {
    dispatch(toggleWidget(false));
  };

  const auth = getEnvConfig().useIntegrationsPreProdAuth
    ? {
        url: STATIC_INTEGRATIONS_PREPROD_URL,
        headers: {
          Authorization: STATIC_INTEGRATIONS_PREPROD_TOKEN
        }
      }
    : {
        url: `${versionedBaseRoute()}/integration-service/accessToken`
      };

  const options = {
    description: data.description,
    attachments: [],
    successCallback: ({ event, data: cbData }) => {
      // eslint-disable-next-line no-console
      console.log('object :>> ', event, cbData);
    },
    errorCallback: (error) => {
      // eslint-disable-next-line no-console
      console.log('error :>> ', error, configuration?.ref);
    }
  };

  return (
    <CreateIssue
      isOpen={isOpen}
      handleClose={handleCloseWidget}
      position={configuration.position}
      positionRef={widgetPositionRef || null}
      auth={auth}
      config={{
        baseURL: getEnvConfig().integrationsBaseUrl
      }}
      options={options}
    />
  );
};

export default IntegrationsWidget;
