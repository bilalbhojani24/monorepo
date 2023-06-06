import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdArchive } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yButton, O11yTableCell } from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { CheckboxState, roundedTableHeaderHack } from 'constants/common';
import { MODAL_TYPES } from 'constants/modalTypes';

import { TABLE_CLASSES } from '../constants';
import useBuildSelection from '../hooks/useBuildSelection';
import {
  getBuildCheckStatusMapping,
  getSelectAllCheckedStatus
} from '../slices/buildsSelectors';

function BuildSelectionHeader() {
  const dispatch = useDispatch();
  const selectAllCheckedStatus = useSelector(getSelectAllCheckedStatus);
  const buildCheckStatusMapping = useSelector(getBuildCheckStatusMapping);

  const { totalCheckedBuilds } = useBuildSelection();

  const selectedBuildsLength = totalCheckedBuilds(buildCheckStatusMapping);

  const handleClickArchive = () => {
    dispatch(
      toggleModal({
        version: MODAL_TYPES.archive_builds_modal,
        data: {
          builds: Object.keys(buildCheckStatusMapping).filter(
            (key) =>
              buildCheckStatusMapping[key].status === CheckboxState.CHECKED
          ),
          hasSelectedAll: selectAllCheckedStatus === CheckboxState.CHECKED
        }
      })
    );
  };

  return (
    <O11yTableCell
      wrapperClassName={twClassNames(
        TABLE_CLASSES.HEADER_COMMON,
        TABLE_CLASSES.COL.BUILD,
        roundedTableHeaderHack.common,
        roundedTableHeaderHack.left
      )}
      isSticky
    >
      <div className="flex items-center">
        {/* <O11yCheckbox
          id="build-selection-checkbox"
          border={false}
          wrapperClassName="mr-4"
          checked={selectAllCheckedStatus === CheckboxState.CHECKED}
          indeterminate={selectAllCheckedStatus === CheckboxState.INDETERMINATE}
          onChange={({ target: { checked } }) => {
            handleSelectAll(checked);
          }}
        /> */}
        {selectedBuildsLength ? (
          <div className="flex items-center gap-4">
            <O11yButton
              variant="primary"
              colors="white"
              size="extra-small"
              icon={<MdArchive className="text-base-500 text-base" />}
              onClick={handleClickArchive}
            >
              Archive
            </O11yButton>
            <span className="text-sm font-normal">
              {selectAllCheckedStatus === CheckboxState.CHECKED
                ? 'All'
                : selectedBuildsLength}{' '}
              selected
            </span>
          </div>
        ) : (
          <span>BUILD</span>
        )}
      </div>
    </O11yTableCell>
  );
}

export default BuildSelectionHeader;
