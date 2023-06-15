import React from 'react';
import { MdOpenInNew } from '@browserstack/bifrost';
import axios from 'axios';
import { O11yButton, O11yHyperlink } from 'common/bifrostProxy';
import { capitalize, getEnvConfig } from 'utils/common';
import { o11yNotify } from 'utils/notification';

export const ALLOWED_COOKIE_DOMAINS = ['bsstag.com', 'browserstack.com'];
const envConfig = getEnvConfig();

const ContactSupportButton = () => (
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
);

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

const getErrorDescription = (err) => {
  let description = '';

  if (err?.response?.status === 404) {
    description += 'Requested resource not found on server.';
  } else if (err?.response?.data?.message) {
    description += capitalize(err?.response?.data?.message);
  } else {
    description += 'Some technical error occurred. Please try again.';
  }
  if (err?.response?.status >= 500) {
    description += 'If this issue persists';
  }
  return description;
};

axios.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => {
    if (!axios.isCancel(err)) {
      if (err?.response?.status) {
        // if server error, show toast
        o11yNotify({
          title: 'Something went wrong!',
          description: getErrorDescription(err),
          type: 'error',
          actionButtons: () =>
            err?.response?.status >= 500 || err?.response?.status === 404 ? (
              <ContactSupportButton />
            ) : null
        });
      } else if (err.request) {
        o11yNotify({
          title: 'Network error!',
          description: `No response from server. Please try again. If this issue persists`,
          type: 'error',
          actionButtons: () => <ContactSupportButton />
        });
      }
    }
    return Promise.reject(err);
  }
);
