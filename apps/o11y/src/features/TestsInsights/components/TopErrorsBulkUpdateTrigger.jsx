import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@browserstack/bifrost';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { MODAL_TYPES } from 'constants/modalTypes';
import PropTypes from 'prop-types';

export default function TopErrorsBulkUpdateTrigger({ clusterId, buildId }) {
  const dispatch = useDispatch();

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
  return (
    <div className="bg-base-50 border-base-300 flex justify-between border-b py-2 px-4 text-sm">
      <div>Failed tests</div>
      <Button
        variant="minimal"
        wrapperClassName="text-brand-500 font-semibold text-xs"
        onClick={handleClickTrigger}
      >
        Bulk update failure category
      </Button>
    </div>
  );
}
TopErrorsBulkUpdateTrigger.propTypes = {
  clusterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  buildId: PropTypes.string.isRequired
};
