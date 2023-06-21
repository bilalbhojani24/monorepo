import { fetchGet, fetchPost } from './_utils/fetch';

export const setOnboardingDataAPI = async ({ payload }) =>
  fetchPost('/api/v1/user/onboarding', {
    onboarding_info: payload
  });

export const getOnboardingInitDataAPI = async () =>
  fetchGet(`/api/v1/user/onboarding`);

export const getAutoAssignmentStatusAPI = async () =>
  fetchGet('/api/v1/import/notifications/auto-assignment');

export const dismissTCAssignNotificationAPI = async () =>
  fetchPost('/api/v1/import/notifications/auto-assignment/dismiss');
