import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import xor from 'lodash/xor';

import { BUILD_FILTER_TYPES, BUILD_FILTERS_PREFIX } from '../constants';
import {
  getBuildsData,
  resetBuildSelection,
  setIsLoadingInitialBuilds
} from '../slices/buildsSlice';

export const getFilterQueryParams = (appliedFilters = []) => {
  const searchParams = new URLSearchParams();
  Object.values(BUILD_FILTER_TYPES).forEach((type) => {
    const filters = appliedFilters
      .filter((item) => item.type === type)
      .map((i) => i?.id);
    if (!isEmpty(filters)) {
      searchParams.set(type, filters);
    } else {
      searchParams.delete(type);
    }
  });
  return searchParams;
};

export const getAppliedFilterObj = ({ id, text, type }) => ({
  id,
  text,
  type,
  appliedText: `${BUILD_FILTERS_PREFIX[type]}: ${text}`,
  isApplied: true
});

export const getComboBoxDiffStatus = (prevState, newState) => {
  const diff = xor(prevState, newState);
  const item = diff[0];
  const isChecked = newState.find((newItem) => newItem.value === item.value);
  return {
    checked: !!isChecked,
    item
  };
};

export const fetchFreshBuilds =
  ({ failureCb, successCb, finallyCb } = {}) =>
  (dispatch, getState) => {
    const state = getState();
    const activeProject = getActiveProject(state);
    dispatch(resetBuildSelection());
    dispatch(setIsLoadingInitialBuilds(true));
    dispatch(
      getBuildsData({ projectNormalisedName: activeProject?.normalisedName })
    )
      .unwrap()
      .then(() => {
        if (successCb && typeof successCb === 'function') {
          successCb();
        }
      })
      .catch(() => {
        if (failureCb && typeof failureCb === 'function') {
          failureCb();
        }
      })
      .finally(() => {
        if (finallyCb && typeof finallyCb === 'function') {
          finallyCb();
        }
        dispatch(setIsLoadingInitialBuilds(false));
      });
  };
