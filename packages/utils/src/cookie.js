import removeExtraSpaceFromStart from './removePaddingfromBeginning';

export default class Cookie {
  constructor() {
    this.cookieDomain = window.BrowserStackConfig.cookie_domain;
    this.hasMoved = 'moved';
    this.mainDomain = window.BrowserStackConfig.main_cookie_domain;
    this.envName = window.BrowserStackConfig.env_name;
    this.cookieSeperator = window.BrowserStackConfig.cookie_seperator;
  }

  create(name, value, days, domain) {
    const cookieDomain = domain || this.cookieDomain;
    let expires = '';
    const expirationDays = days || window.Config.cookie_expiry_map[name];
    if (expirationDays) {
      const date = new Date();
      date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toGMTString()}`;
    }
    const secure = window.location.protocol.match(/https/) ? ';secure' : '';

    let cookieName = name;
    let cookieString = `path=/; ${secure}`;
    if (cookieDomain !== this.mainDomain) {
      if (!this.isEnvSpecificCookie(name)) {
        cookieName = this.getEnvSpecificCookies(name);
      }
      cookieString += `domain=${cookieDomain};`;
    }
    document.cookie = `${cookieName}=${value}${expires}; ${cookieString}`;
  }

  read(name) {
    const nameKeyString = `${name}=`;
    const envNameKeyString = `${this.getEnvSpecificCookies(name)}=`;
    const subdomainKeyString = `${this.getEnvSpecificCookies(this.hasMoved)}=`;
    const cookieList = document.cookie.split(';');
    let movedToSubdomain = false;
    let value = null;
    let subdomainValue = null;
    cookieList.forEach((cookieKeyValuePair) => {
      const cookieString = removeExtraSpaceFromStart(cookieKeyValuePair);
      if (cookieString.indexOf(subdomainKeyString) === 0) {
        movedToSubdomain = true;
      } else if (!subdomainValue && cookieString.indexOf(envNameKeyString) === 0) {
        subdomainValue = cookieString.substring(envNameKeyString.length, cookieString.length);
      } else if (!value && cookieString.indexOf(nameKeyString) === 0) {
        value = cookieString.substring(nameKeyString.length, cookieString.length);
      }
    });
    if (!movedToSubdomain) {
      this.moveToSubdomain();
    }
    return subdomainValue || value;
  }

  moveToSubdomain() {
    const cookieList = document.cookie.split(';');
    cookieList.forEach((cookieKeyValuePair) => {
      const cookieString = removeExtraSpaceFromStart(cookieKeyValuePair);
      const index = cookieString.indexOf('=');
      const key = cookieString.substring(0, index);
      const value = cookieString.substring(index + 1, cookieString.length);
      let expiry;
      if (window.Config.subdomain_cookies.indexOf(key) === -1) {
        // Do not do anything with cookies which are already on specific env
        if (!this.isEnvSpecificCookie(key)) {
          this.erase(key, this.mainDomain);
          // Special handling for dynamic cookies
          if (key.indexOf('skipped_extension_install_') !== -1) {
            expiry = window.Config.cookie_expiry_map.skipped_extension_install;
          } else {
            expiry = window.Config.cookie_expiry_map[key];
          }
          this.create(this.getEnvSpecificCookies(key), value, expiry);
        }
      }
    });
    this.erase('has_moved');
    this.erase('history');
    this.create(this.getEnvSpecificCookies(this.hasMoved), 1);
  }

  erase(name, domain) {
    this.create(name, '', -1, domain);
  }

  getEnvSpecificCookies(name) {
    return `${this.getEnvSpecificPrefix()}${name}`;
  }

  isEnvSpecificCookie(key) {
    return key.indexOf(this.cookieSeperator) !== -1;
  }

  getEnvSpecificPrefix() {
    return ['production', 'fu'].indexOf(this.envName) !== -1 ? '' : this.envName + this.cookieSeperator;
  }
}
