import React from 'react';
// import { useDispatch } from 'react-redux';
import { Button } from '@browserstack/bifrost';
// import { setCurrentSelectedTestId } from 'app/testops/TestList/slices/dataSlice';
// import { setShowBulkDefectTypeModal } from 'app/testops/TestList/slices/uiSlice';
import PropTypes from 'prop-types';

export default function TopErrorsBulkUpdateTrigger({ clusterId }) {
  // const dispatch = useDispatch();

  const handleClickTrigger = () => {
    console.log('clusterId', clusterId);
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
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold">Failed tests</p>
      </div>
      <div>
        <Button
          variant="minimal"
          wrapperClassName="text-base-500 font-semibold"
          onClick={handleClickTrigger}
        >
          Bulk update failure category
        </Button>
      </div>
    </div>
  );
}
TopErrorsBulkUpdateTrigger.propTypes = {
  clusterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
};
