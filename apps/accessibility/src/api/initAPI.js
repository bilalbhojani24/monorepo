export default function initAPI() {
  return new Promise((resolve) => {
    resolve({
      accessibilityExtensionChromeStoreURL:
        'https://chrome.google.com/webstore/detail/accessibility-toolkit/fmkhjeeeojocenbconhndpiohohajokn',
      dashboardUserID: ''
    });
  });
}
