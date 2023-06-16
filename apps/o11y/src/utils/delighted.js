import o11yKeys from 'constants/o11yKeys';
import { getEnvConfig, logOllyEvent } from 'utils/common';

const envConfig = getEnvConfig();

const logOllyDelightedEvent = (event, delightedConfig) => {
  logOllyEvent({
    event,
    data: { ...delightedConfig }
  });
};

export const handleShowSurvey = (delightedConfig) => {
  window[o11yKeys[envConfig.name].DELIGHTED_CONFIG_FILE_NAME].survey({
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
  if (!window[o11yKeys[envConfig.name].DELIGHTED_CONFIG_FILE_NAME]) {
    window[o11yKeys[envConfig.name].DELIGHTED_CONFIG_FILE_NAME] = [];
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
      window[o11yKeys[envConfig.name].DELIGHTED_CONFIG_FILE_NAME][method] = (
        ...args
      ) => {
        window[o11yKeys[envConfig.name].DELIGHTED_CONFIG_FILE_NAME].push([
          method,
          args
        ]);
      };
    });
    window[
      o11yKeys[envConfig.name].DELIGHTED_CONFIG_FILE_NAME
    ].SNIPPET_VERSION = '1.0.1';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://d2yyd1h5u9mauk.cloudfront.net/integrations/web/v1/library/${
      o11yKeys[envConfig.name].DELIGHTED_CONFIG_TOKEN
    }/${o11yKeys[envConfig.name].DELIGHTED_CONFIG_FILE_NAME}.js`;
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  }

  console.log('delightedConfig', delightedConfig);
  handleShowSurvey(delightedConfig);
};
