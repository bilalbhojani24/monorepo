import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TooltipBody } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yButton, O11yTooltip } from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { TEST_STATUS } from 'constants/common';
import { MODAL_TYPES } from 'constants/modalTypes';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
import PropTypes from 'prop-types';

export default function TopErrorsBulkUpdateTrigger({ clusterId, buildId }) {
  const dispatch = useDispatch();
  const buildMeta = useSelector(getBuildMeta);

  const handleClickTrigger = () => {
    dispatch(
      toggleModal({
        version: MODAL_TYPES.bulk_assign_issuetype,
        data: {
          clusterIds: [clusterId],
          buildId
        }
      })
    );
  };
  const isReadOnly = buildMeta?.data?.status === TEST_STATUS.ARCHIVED;
  return (
    <div className="bg-base-50 border-base-300 flex justify-between border-b px-4 py-2 text-sm">
      <div>Failed tests</div>
      <O11yTooltip
        theme="dark"
        placementSide="top"
        wrapperClassName="py-2"
        content={
          <TooltipBody>
            <p className="text-base-300 text-sm">
              Bulk tagging is not available for archived build.
            </p>
          </TooltipBody>
        }
      >
        <O11yButton
          variant="minimal"
          wrapperClassName={twClassNames('text-xs', {
            'text-base-400': isReadOnly
          })}
          onClick={handleClickTrigger}
          disabled={isReadOnly}
        >
          Bulk update failure category
        </O11yButton>
      </O11yTooltip>
    </div>
  );
}
TopErrorsBulkUpdateTrigger.propTypes = {
  clusterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  buildId: PropTypes.string.isRequired
};
