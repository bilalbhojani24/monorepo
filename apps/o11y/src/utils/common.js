export const getBaseUrl = () => {
  const { hostname, protocol } = window.location;
  const hostnameParts = hostname.split('.');
  let env = hostnameParts[0].split('-').slice(1).join('-');
  hostnameParts.shift();
  const domain = hostnameParts.join('.');
  env = env && domain === 'bsstag.com' ? `${env}.` : '';
  return `${protocol}//${env}${domain}`;
};
export const getDocUrl = (path) =>
  `${getBaseUrl()}/docs/test-observability/${path}`;
