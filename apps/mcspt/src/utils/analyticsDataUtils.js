export const formatDeviceAndAppAnalyticsData = (device, app) => ({
  manufacturer: device?.manufacturer,
  model: device?.model,
  platform: device?.os,
  os_version: device?.osVersion,
  cpu: device?.cpu,
  resolution: device?.resolution,
  ram: device?.ram,
  network: device?.cellular,

  app_name: app?.name,
  app_package: app?.packageName || app?.bundleId,
  app_version: app?.version
});

export const calculateTestDurationForAnalytics = (sessiondata) => {
  if (sessiondata?.startTime && sessiondata?.endTime) {
    return new Date(sessiondata.endTime) - new Date(sessiondata.startTime);
  }

  return undefined;
};
