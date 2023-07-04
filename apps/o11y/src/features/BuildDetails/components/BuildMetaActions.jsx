import React from 'react';
import { useDispatch } from 'react-redux';
import {
  EllipsisVerticalIcon,
  MdOutlineRefresh,
  TooltipBody
} from '@browserstack/bifrost';
import {
  O11yButton,
  O11yDropdown,
  O11yDropdownOptionGroup,
  O11yDropdownOptionItem,
  O11yDropdownTrigger,
  O11yTooltip
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { TEST_STATUS } from 'constants/common';
import { MODAL_TYPES } from 'constants/modalTypes';
import { ARCHIVE_TOOLTIP_MESSAGES } from 'constants/staticTexts';
import PropTypes from 'prop-types';

const DROPDOWN_OPTIONS_MAPPING = {
  ARCHIVE: 'Archive'
};

const DROPDOWN_OPTIONS = {
  [DROPDOWN_OPTIONS_MAPPING.ARCHIVE]: {
    body: DROPDOWN_OPTIONS_MAPPING.ARCHIVE,
    id: DROPDOWN_OPTIONS_MAPPING.ARCHIVE
  }
};

function BuildMetaActions({
  updateCount,
  onUpdateBtnClick,
  isNewItemLoading,
  buildData
}) {
  const dispatch = useDispatch();
  const buildStatus = buildData.status;

  const renderTooltipContent = () => {
    if (!buildStatus || buildStatus === TEST_STATUS.PENDING) {
      return (
        <TooltipBody>
          <span className="text-sm">{ARCHIVE_TOOLTIP_MESSAGES.RUNNING}</span>
        </TooltipBody>
      );
    }
    if (buildData?.isArchived) {
      return (
        <TooltipBody>
          <span className="text-sm">{ARCHIVE_TOOLTIP_MESSAGES.ARCHIVED}</span>
        </TooltipBody>
      );
    }
    return null;
  };

  const handleClickActionsDropdown = (value) => {
    if (value.id === DROPDOWN_OPTIONS_MAPPING.ARCHIVE) {
      dispatch(
        toggleModal({
          version: MODAL_TYPES.archive_builds_modal,
          data: {
            builds: [buildData?.uuid],
            hasSelectedAll: false
          }
        })
      );
    }
  };

  return (
    <div className="mt-1 flex shrink-0 items-center justify-end gap-2">
      {updateCount > 0 && (
        <O11yButton
          variant="rounded"
          icon={<MdOutlineRefresh className="text-sm" />}
          iconPlacement="end"
          isIconOnlyButton={isNewItemLoading}
          loading={isNewItemLoading}
          onClick={onUpdateBtnClick}
        >
          <span className="whitespace-nowrap">
            {updateCount} new test{updateCount > 1 ? 's' : ''}
          </span>
        </O11yButton>
      )}

      <O11yDropdown onClick={handleClickActionsDropdown}>
        <div className="flex">
          <O11yDropdownTrigger wrapperClassName="p-1.5">
            <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
          </O11yDropdownTrigger>
        </div>

        <O11yDropdownOptionGroup wrapperClassName="w-32">
          <O11yTooltip
            placementSide="bottom"
            theme="dark"
            content={renderTooltipContent()}
            triggerWrapperClassName="block"
          >
            <O11yDropdownOptionItem
              option={DROPDOWN_OPTIONS[DROPDOWN_OPTIONS_MAPPING.ARCHIVE]}
              key={DROPDOWN_OPTIONS[DROPDOWN_OPTIONS_MAPPING.ARCHIVE].id}
              disabled={
                !buildStatus ||
                buildData?.isArchived ||
                buildStatus === TEST_STATUS.PENDING
              }
              wrapperClassName="w-full"
            />
          </O11yTooltip>
        </O11yDropdownOptionGroup>
      </O11yDropdown>
    </div>
  );
}

BuildMetaActions.propTypes = {
  updateCount: PropTypes.number.isRequired,
  onUpdateBtnClick: PropTypes.func.isRequired,
  isNewItemLoading: PropTypes.bool.isRequired,
  buildData: PropTypes.objectOf(PropTypes.any).isRequired
};

export default BuildMetaActions;
