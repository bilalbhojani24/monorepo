import axios from 'axios';

export default function initAPI() {
  return axios.get('/v1/user/get-user-profile');
  // return new Promise((resolve) => {
  //   resolve({
  //     accessibilityExtensionChromeStoreURL:
  //       'https://chrome.google.com/webstore/detail/accessibility-toolkit/fmkhjeeeojocenbconhndpiohohajokn',
  //     dashboardUserID: ''
  //   });
  // });
}
