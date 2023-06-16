import {
  DELIGHTED_CONFIG_FILE_NAME,
  DELIGHTED_CONFIG_TOKEN
} from 'constants/keys';
import { logOllyEvent } from 'utils/common';

const logOllyDelightedEvent = (event, delightedConfig) => {
  logOllyEvent({
    event,
    data: { ...delightedConfig }
  });
};

export const handleShowSurvey = (delightedConfig) => {
  window[DELIGHTED_CONFIG_FILE_NAME].survey({
    properties: delightedConfig,
    onShow: () => {
      console.log('onSHow', delightedConfig);
      logOllyDelightedEvent('O11yNPSSurveyShown', delightedConfig);
    },
    onHide: () => logOllyDelightedEvent('O11yNPSSurveyClosed', delightedConfig),
    onRespond: () => {
      console.log('onRespond', delightedConfig);
      logOllyDelightedEvent('O11yNPSSurveyScoreClicked', delightedConfig);
    },
    onComment: () => {
      console.log('onComment', delightedConfig);
      logOllyDelightedEvent('O11yNPSSurveyTextSubmitted', delightedConfig);
    }
  });
};

export const delightedInit = (delightedConfig) => {
  if (!window[DELIGHTED_CONFIG_FILE_NAME]) {
    window[DELIGHTED_CONFIG_FILE_NAME] = [];
    const methods = [
      'survey',
      'reset',
      'config',
      'init',
      'set',
      'get',
      'event',
      'identify',
      'track',
      'page',
      'screen',
      'group',
      'alias'
    ];
    methods.forEach((method) => {
      window[DELIGHTED_CONFIG_FILE_NAME][method] = (...args) => {
        window[DELIGHTED_CONFIG_FILE_NAME].push([method, args]);
      };
    });
    window[DELIGHTED_CONFIG_FILE_NAME].SNIPPET_VERSION = '1.0.1';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://d2yyd1h5u9mauk.cloudfront.net/integrations/web/v1/library/${DELIGHTED_CONFIG_TOKEN}/${DELIGHTED_CONFIG_FILE_NAME}.js`;
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  }

  handleShowSurvey(delightedConfig);
};
