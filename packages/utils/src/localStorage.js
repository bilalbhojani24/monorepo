import { raiseSentryError } from './raiseError';

const isSupported = !!window.localStorage;

const setStorage = (key, value) => {
  try {
    const isValidKey = typeof key === 'string';
    const validValue = typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
    if (isSupported && isValidKey) {
      localStorage.setItem(key, validValue);
    }
  } catch (e) {
    // https://stackoverflow.com/questions/18877643/error-in-local-storage-ns-error-file-corrupted-firefox
    if (e.name == 'NS_ERROR_FILE_CORRUPTED') {
      // eslint-disable-next-line no-console
      console.log(
        "Sorry, it looks like your browser storage has been corrupted. Please clear your storage by going to Tools -> Clear Recent History -> Cookies and set time range to 'Everything'. This will remove the corrupted browser storage across all sites."
      );
    } else {
      raiseSentryError(new Error(`Error while storing in local storage ${e}`));
    }
  }
};

const getStorage = (key) => {
  let value;
  try {
    value = isSupported ? localStorage.getItem(key) : null;
    value = JSON.parse(value);
  } catch (err) {
    // Not an object
    if (typeof value === 'string') return value;
  }
  return value;
};

const removeStorage = (key) => {
  try {
    if (isSupported && getStorage(key)) {
      localStorage.removeItem(key);
    }
  } catch (e) {
    if (e.name == 'NS_ERROR_FILE_CORRUPTED') {
      // eslint-disable-next-line no-console
      console.log(
        "Sorry, it looks like your browser storage has been corrupted. Please clear your storage by going to Tools -> Clear Recent History -> Cookies and set time range to 'Everything'. This will remove the corrupted browser storage across all sites."
      );
    }
  }
};

export { setStorage, getStorage, removeStorage };
