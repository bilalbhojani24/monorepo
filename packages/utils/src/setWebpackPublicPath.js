export const getWebpackPublicPath = () => {
  if (BrowserStackConfig.isRailsDevEnv) {
    return ASSETS_PUBLIC_PATH;
  }
  const env = ENV;
  const cdnKey = CDN_KEYS[0];
  const domainName = env === 'production' ? 'browserstack' : 'bsstag';

  if (BrowserStackEnterprise) {
    return `https://assets.${domainName}.com/${env}`;
  }

  return `https://${cdnKey}.cloudfront.net/${env}`;
};

// eslint-disable-next-line camelcase, no-undef
__webpack_public_path__ = `${getWebpackPublicPath()}${__webpack_public_path__}`;
