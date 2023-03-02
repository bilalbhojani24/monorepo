export const getBaseUrl = () => {
  const url = new URL(window.location);
  let env = url.hostname.split('.')[0].split('-').slice(1).join('-');
  env = env ? `${env}.` : '';
  const splitHost = url.hostname.split('.');
  splitHost.shift();
  return `${url.protocol}//${env}${splitHost.join('.')}`;
};
export const getDocUrl = (path) =>
  `${getBaseUrl()}/docs/test-observability/${path}`;
