import React from 'react';
import { MdOpenInNew } from '@browserstack/bifrost';
import axios from 'axios';
import { O11yButton, O11yHyperlink } from 'common/bifrostProxy';
import { getEnvConfig } from 'utils/common';
import { o11yNotify } from 'utils/notification';

export const ALLOWED_COOKIE_DOMAINS = ['bsstag.com', 'browserstack.com'];

const getMockerConfig = (config) => {
  const updatedConfig = {};
  if (typeof config.data === 'object') {
    // To submit form data
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      config.data?.append('authenticity_token', new Date());
    } else {
      updatedConfig.data = {
        ...config.data,
        authenticity_token: new Date()
      };
    }
  } else {
    updatedConfig.data = `${
      config.data ? `${config.data}&` : ''
    }authenticity_token=${encodeURIComponent(new Date())}`;
  }
  return updatedConfig;
};

export const excludeConfig = (url) => !!url.includes('https://eds');

const envConfig = getEnvConfig();

export const isBsCrossDomain = (url) => {
  if (typeof url === 'undefined') {
    return false;
  }
  const originAnchor = document.createElement('a');
  originAnchor.href = window.location.href;

  const urlAnchor = document.createElement('a');
  urlAnchor.href = url;

  const originalHostName = originAnchor.hostname;
  const urlHostName = urlAnchor.hostname;

  const originDomain = originalHostName.split('.').slice(-2).join('.');
  const urlDomain = urlHostName.split('.').slice(-2).join('.');

  return (
    ALLOWED_COOKIE_DOMAINS.indexOf(urlDomain) >= 0 && originDomain === urlDomain
  );
};

axios.interceptors.request.use((config) => {
  let updatedConfig = config;
  const shouldExcludeConfig =
    excludeConfig(config.url) || !isBsCrossDomain(config.url);
  updatedConfig.baseURL = envConfig.apiUrl;
  updatedConfig.withCredentials = shouldExcludeConfig
    ? false
    : envConfig.withCredentials;

  // for use in local api-mocker only
  if (
    envConfig.isMocker &&
    (config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'patch')
  ) {
    updatedConfig = {
      ...updatedConfig,
      ...getMockerConfig(config)
    };
  }
  return updatedConfig;
});

axios.interceptors.response.use(
  (res) => Promise.resolve(res),
  (res) => {
    if (res?.response?.status === 500) {
      // if server error, show toast
      o11yNotify({
        title: 'Error occurred',
        description:
          'Some technical error occurred. Please try again. If this issue persists',
        type: 'error',
        actionButtons: () => (
          <O11yHyperlink
            href={`${envConfig.baseUrl}/support/test-observability`}
            target="_blank"
          >
            <O11yButton
              variant="minimal"
              colors="brand"
              wrapperClassName="flex items-center"
              icon={<MdOpenInNew className="text-lg" />}
              iconPlacement="end"
              size="small"
            >
              Contact Support
            </O11yButton>
          </O11yHyperlink>
        ),
        duration: 5000
      });
    }
    return Promise.reject(res);
  }
);
