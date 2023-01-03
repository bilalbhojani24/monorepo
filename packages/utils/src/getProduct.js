const getProduct = () => {
  const hostnameSplit = window.location.hostname.split('.');
  if (hostnameSplit.length === 2 || hostnameSplit[0] === 'www') {
    const pathnameSplit = window.location.pathname.split('/');
    if (pathnameSplit.length <= 1) {
      return 'browserstack';
    }
    switch (pathnameSplit[1]) {
      case 'screenshots':
        return 'screenshots';
      case 'responsive':
        return 'responsive';
      case 'webperformance':
        return 'webperformance';
      default:
        return 'browserstack';
    }
  }
  // TODO: Maybe get rid of `BrowserStackConfig.subdomains.default` and
  //       pass the ENV for which the build is made using Webpack Define Plugin?
  return hostnameSplit[0].split(`-${BrowserStackConfig.subdomains.default}`)[0].replace('-enterprise', '');
};

export default getProduct;
