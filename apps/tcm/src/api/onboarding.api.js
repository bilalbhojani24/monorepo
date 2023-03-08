import { fetchGet, fetchPost } from './_utils/fetch';

export const setOnboardingDataAPI = async ({ payload }) =>
  fetchPost('/api/v1/user/onboarding', {
    onboarding_info: payload
  });

export const getOnboardingInitDataAPI = async () =>
  fetchGet(`/api/v1/user/onboarding`);
