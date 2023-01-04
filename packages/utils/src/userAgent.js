import UAParser from 'ua-parser-js';

const browser = new UAParser().getBrowser();
const os = new UAParser().getOS();

const uaDetails = {
  name: browser.name.toLowerCase(),
  version: parseInt(browser.version, 10),
  os: os.name
};

export default uaDetails;
