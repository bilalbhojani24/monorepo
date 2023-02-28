// /dashboard
export const isDashboardPage = () => /dashboard/.test(window.location.pathname);

// /settings
export const isSettingsPage = () => /settings/.test(window.location.pathname);

// reports
export const isReportsPage = () => /reports/.test(window.location.pathname);

// Site Scanner
export const isSiteScanner = () =>
  /site-scanner/.test(window.location.pathname);

// screen reader
export const isScreenReaderPage = () =>
  /screen-reader/.test(window.location.pathname);

export const isActivePage = (slug) => {
  const matcher = new RegExp(slug, 'g');
  return matcher.test(window.location.pathname);
};
