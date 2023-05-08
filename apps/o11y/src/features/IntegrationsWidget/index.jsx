import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOpenInNew } from '@browserstack/bifrost';
import { CreateIssue } from '@browserstack/integrations';
import { sendIssueCreatedCallback } from 'api/testlist';
import { O11yButton, O11yHyperlink } from 'common/bifrostProxy';
import { versionedBaseRoute } from 'constants/common';
import { AppContext } from 'features/Layout/context/AppContext';
import { getEnvConfig } from 'utils/common';
import { o11yNotify } from 'utils/notification';

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
import { hideIntegrationsWidget } from './utils';

const IntegrationsWidget = () => {
  const isOpen = useSelector(getIsWidgetOpen);
  const configuration = useSelector(getWidgetConfiguration);
  const data = useSelector(getWidgetData);
  const dispatch = useDispatch();
  const { widgetPositionRef, setWidgetPositionRef } = useContext(AppContext);

  const handleCloseWidget = () => {
    dispatch(toggleWidget(false));
  };

  const envConfig = getEnvConfig();

  const auth = envConfig.useIntegrationsPreProdAuth
    ? {
        url: STATIC_INTEGRATIONS_PREPROD_URL,
        headers: {
          Authorization: STATIC_INTEGRATIONS_PREPROD_TOKEN
        },
        fetchOptions: {
          withCredentials: true
        }
      }
    : {
        url: `${versionedBaseRoute()}/integration-service/accessToken`,
        fetchOptions: {
          baseURL: envConfig.apiUrl,
          withCredentials: true
        }
      };

  const options = {
    description: data.description,
    attachments: [],
    successCallback: ({ event, data: cbData }) => {
      const { integration, issueUrl } = cbData;
      window.pubSub.publish('onCreateJiraIssue', {
        testRunId: data?.testRunId,
        url: issueUrl
      });
      sendIssueCreatedCallback('_', data?.testRunId, {
        name: issueUrl.split('/').pop(),
        type: integration?.label,
        url: issueUrl,
        status: ''
      });
      o11yNotify({
        title: `Issue ${issueUrl.split('/').pop()} ${
          event === 'create' ? 'created' : 'updated'
        } successfully!`,
        type: 'success',
        actionButtons: () => (
          <O11yHyperlink href={issueUrl} target="_blank">
            <O11yButton
              variant="minimal"
              colors="brand"
              wrapperClassName="flex items-center"
              icon={<MdOpenInNew className="text-lg" />}
              iconPlacement="end"
            >
              View
            </O11yButton>
          </O11yHyperlink>
        ),
        duration: 5000
      });
      dispatch(hideIntegrationsWidget());
    },
    errorCallback: () => {
      o11yNotify({
        title: 'Something went wrong!',
        description: 'There was an error while updating tests',
        type: 'error'
      });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setWidgetPositionRef(null);
    }
  }, [isOpen, setWidgetPositionRef]);

  return (
    <CreateIssue
      isOpen={isOpen}
      handleClose={handleCloseWidget}
      position={configuration.position}
      positionRef={widgetPositionRef || null}
      auth={auth}
      config={
        envConfig.integrationsBaseUrl
          ? {
              baseURL: envConfig.integrationsBaseUrl
            }
          : undefined
      }
      options={options}
    />
  );
};

export default IntegrationsWidget;