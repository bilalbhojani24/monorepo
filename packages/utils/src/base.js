/* eslint-disable */
import axios from 'axios';

import getUrlParams from './getUrlParams';
import getProduct from './getProductUnderScored';
import { rateLimitError } from '../constants';
import { raiseSentryError } from './raiseError';

const product = getProduct();

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

  const originSubdomain = originalHostName.split('.')[0];
  const urlSubdomain = urlHostName.split('.')[0];

  const originDomain = originalHostName.split('.').slice(-2).join('.');
  const urlDomain = urlHostName.split('.').slice(-2).join('.');

  return (
    BrowserStackConfig.all_bs_subdomains.indexOf(originSubdomain) >= 0 &&
    BrowserStackConfig.all_bs_subdomains.indexOf(urlSubdomain) >= 0 &&
    BrowserStackConfig.domain === originDomain &&
    BrowserStackConfig.domain === urlDomain
  );
};

axios.interceptors.request.use((config) => {
  if (typeof window._token === 'undefined' || !window._add_token || config.cors_logging === 'true') {
    return config;
  }

  if (config.method === 'post' || config.method === 'put' || config.method === 'patch') {
    if (typeof config.data === 'object') {
      // To submit form data
      if (config.headers['Content-Type'] === 'multipart/form-data') {
        config.data?.append('authenticity_token', window._token);
      } else {
        config.data = {
          ...config.data,
          authenticity_token: window._token
        };
      }
    } else {
      config.data = `${config.data ? `${config.data}&` : ''}authenticity_token=${encodeURIComponent(window._token)}`;
    }
  }

  if (config.method === 'delete') {
    config.params = {
      authenticity_token: window._token
    };
  }

  if (isBsCrossDomain(config.url)) {
    config.headers['X-CSRF-Token'] = encodeURIComponent(window._token);
    config.withCredentials = true;
  }
  return config;
});

axios.interceptors.request.use((config) => {
  const userId = getUrlParams('user_id');

  if (userId) {
    config.headers = config.headers || {};
    config.headers['X-User-Id'] = userId;
  }
  return config;
});

// This interceptor is for observability auth handling
axios.interceptors.request.use((config) => {
  if (product === 'observability' && BrowserStackConfig?.env_name !== 'production') {
    config.headers = config.headers || {};
    config.headers['x-cookie-prefix'] = `${BrowserStackConfig?.env_name}${BrowserStackConfig?.cookie_seperator}` || '';
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    // IE 8-9
    // this interceptors was added for AA/A product family. In screenshot we poll https://bs-local.com:45690 using axios and response format for this url is different.
    // to scope down such failures, added product check here. //ref : LIVE-3454
    if (
      ['app_automate', 'automate'].indexOf(product) > -1 &&
      response.data === null &&
      response.config.responseType === 'json' &&
      response.request.responseText !== null
    ) {
      try {
        response.data = JSON.parse(response.request.responseText);
      } catch (e) {}
    }
    return response;
  },
  (error) => {
    const product = getProduct();

    // Handle condition specifically for Live & App Live Products. Same not required in other products.
    if (['app-live', 'live'].includes(product)) {
      if (axios.isCancel(error)) {
        error.isAborted = true;
        return Promise.reject(error);
      }
      raiseSentryError(error);
    }

    // Handle jwt token expire for observability
    if (product === 'observability' && error?.response?.status === 401 && error?.response?.data?.showAuth === 'true') {
      jQuery.bsAlert.alert({
        text: 'Session expired. Redirecting to login now.',
        htmlMessage: true,
        alertType: 'error',
        timeout: 1000000
      });
      //  redirect to login to fetch new token
      setTimeout(() => {
        window.location.href = `${window.location.protocol}//${BrowserStackConfig.main_cookie_domain}/users/sign_in`;
      }, 500);
      return;
    }

    // 'show_auth' is specific for speedlab
    if (
      error.response &&
      error.response.status === 401 &&
      error?.response?.data?.action !== 'show_auth' &&
      !error?.response?.data?.cancel_redirection
    ) {
      window.location.href = `${window.location.protocol}//${BrowserStackConfig.main_cookie_domain}/users/sign_in`;
    } else if (error.response && error.response.status === 429) {
      jQuery.bsAlert.alert({
        text: rateLimitError,
        htmlMessage: true,
        alertType: 'error',
        timeout: 1000000
      });
      return false;
    } else {
      throw error;
    }
    return Promise.reject(error);
  }
);

/* eslint-enable */
