import { createSelector } from '@reduxjs/toolkit/dist';

export const getHeaderSize = (state) => state.global.headerSize;
export const getProjects = (state) => state.global.projects;
export const getActiveProject = (state) => state.global.projects.active;
export const getInitData = (state) => state.global.initData;
export const getUserDetails = (state) =>
  state.global.initData?.data?.userDetails || {};
export const getBuildInfo = (state) => state.global.buildInfo;
export const getFeatureFlag = (state, feature) =>
  state.global.initData?.data?.userDetails?.planDetails?.features[feature] || {
    isMetered: false,
    isActive: true
  };
export const getHasInitFailed = (state) => state.global.hasProductInitFailed;
export const getPlanDetails = (state) => state.global.planDetails || {};
export const isLoadingInitData = (state) => state.global.initData.isLoading;

export const getPlanDetailsKey = (key) =>
  createSelector(
    getPlanDetails,
    (planDetails) => planDetails?.features?.[key] || null
  );
export const canStartFreeTrial = createSelector(
  getPlanDetails,
  (planDetails) => planDetails?.canClaimFreeTrial && !planDetails?.isOnFreeTrial
);
export const getPlanType = createSelector(
  getPlanDetails,
  (planDetails) => planDetails?.type
);

export const getIsOnFreemium = createSelector(
  getPlanDetails,
  (planDetails) => planDetails?.isOnFreemium
);

export const getHasExperiencedPaidPlan = createSelector(
  getPlanDetails,
  (planDetails) => planDetails?.hasExperiencedPaidPlan
);

export const getPlanExpires = createSelector(
  getPlanDetails,
  (planDetails) => planDetails?.expires || null
);

export const getIsOnFreeTrial = createSelector(
  getPlanDetails,
  (planDetails) => planDetails?.isOnFreeTrial || false
);
