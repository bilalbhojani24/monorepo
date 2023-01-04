const getBaseURL = (subdomainKey = 'default') => {
  const subdomain = BrowserStackEnterprise
    ? BrowserStackConfig.enterprise_subdomains[subdomainKey]
    : BrowserStackConfig.subdomains[subdomainKey];

  return `https://${subdomain}.${BrowserStackConfig.domain}`;
};

export default getBaseURL;
