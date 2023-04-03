/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@browserstack/bifrost';
// import { setCurrentSelectedTestId } from 'app/testops/TestList/slices/dataSlice';
// import { setShowBulkDefectTypeModal } from 'app/testops/TestList/slices/uiSlice';
import PropTypes from 'prop-types';

export default function TopErrorsBulkUpdateTrigger({ clusterId }) {
  const dispatch = useDispatch();

  const handleClickTrigger = () => {
    // dispatch(setCurrentSelectedTestId(''));
    // dispatch(
    //   setShowBulkDefectTypeModal({
    //     status: true,
    //     currentIssueType: {},
    //     clusterId,
    //     source: 'build_insights_errors'
    //   })
    // );
  };
  return (
    <div className="ti-top-errors-bulk-trigger">
      <p className="ti-top-errors-bulk-trigger__title">Failed tests</p>
      <Button
        wrapperClassName="ti-top-errors-bulk-trigger__btn"
        onClick={handleClickTrigger}
      >
        Bulk update failure category
      </Button>
    </div>
  );
}
TopErrorsBulkUpdateTrigger.propTypes = {
  clusterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
};
