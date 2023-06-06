import { useDispatch, useSelector } from 'react-redux';
import { CheckboxState, TEST_STATUS } from 'constants/common';

import {
  getBuildCheckStatusMapping,
  getBuildsLength,
  getBuildsPagingParams
} from '../slices/buildsSelectors';
import {
  setBuildCheckStatusMapping,
  setSelectAllCheckedStatus
} from '../slices/buildsSlice';

function useBuildSelection() {
  const dispatch = useDispatch();
  const buildCheckStatusMapping = useSelector(getBuildCheckStatusMapping);
  const buildPagingParams = useSelector(getBuildsPagingParams);
  const totalBuilds = useSelector(getBuildsLength);

  const totalCheckedBuilds = (buildMapping) =>
    Object.keys(buildMapping).filter(
      (key) => buildMapping[key]?.status === CheckboxState.CHECKED
    ).length;

  const isCompleteListChecked = (buildMapping) =>
    !buildPagingParams.hasNext &&
    totalCheckedBuilds(buildMapping) === totalBuilds;

  const getBuildCheckedStatus = ({ uuid }) =>
    buildCheckStatusMapping[uuid]?.status || CheckboxState.UNCHECKED;

  const setBuildCheckedStatus = ({ uuid, checked }) => {
    const updatedMapping = { ...buildCheckStatusMapping };
    const updatedStatus = checked
      ? CheckboxState.CHECKED
      : CheckboxState.UNCHECKED;
    updatedMapping[uuid] = {
      ...updatedMapping[uuid],
      status: updatedStatus
    };
    dispatch(setBuildCheckStatusMapping(updatedMapping));

    const checkedBuilds = totalCheckedBuilds(updatedMapping);
    const uncheckedBuilds = totalBuilds - checkedBuilds;

    if (isCompleteListChecked(updatedMapping)) {
      dispatch(setSelectAllCheckedStatus(CheckboxState.CHECKED));
    } else if (uncheckedBuilds === totalBuilds) {
      dispatch(setSelectAllCheckedStatus(CheckboxState.UNCHECKED));
    } else {
      dispatch(setSelectAllCheckedStatus(CheckboxState.INDETERMINATE));
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      const updatedMapping = {};
      Object.keys(buildCheckStatusMapping).forEach((key) => {
        updatedMapping[key] = {
          ...buildCheckStatusMapping[key],
          status:
            !buildCheckStatusMapping[key]?.buildStatus ||
            buildCheckStatusMapping[key]?.buildStatus === TEST_STATUS.PENDING ||
            buildCheckStatusMapping[key]?.buildStatus === TEST_STATUS.ARCHIVED
              ? CheckboxState.UNCHECKED
              : CheckboxState.CHECKED
        };
      });
      dispatch(setBuildCheckStatusMapping(updatedMapping));
      dispatch(setSelectAllCheckedStatus(CheckboxState.CHECKED));
    } else {
      const updatedMapping = {};
      Object.keys(buildCheckStatusMapping).forEach((key) => {
        updatedMapping[key] = {
          ...buildCheckStatusMapping[key],
          status: CheckboxState.UNCHECKED
        };
      });
      dispatch(setBuildCheckStatusMapping(updatedMapping));
      dispatch(setSelectAllCheckedStatus(CheckboxState.UNCHECKED));
    }
  };

  return {
    getBuildCheckedStatus,
    handleSelectAll,
    setBuildCheckedStatus,
    isCompleteListChecked,
    totalCheckedBuilds
  };
}

export default useBuildSelection;
