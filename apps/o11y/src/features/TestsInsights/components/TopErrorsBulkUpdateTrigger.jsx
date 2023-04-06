import React from 'react';
// import { useDispatch } from 'react-redux';
import { Button } from '@browserstack/bifrost';
import {
  O11yTableCell,
  O11yTableHead,
  O11yTableRow
} from 'common/bifrostProxy';
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
    <>
      <O11yTableHead>
        <O11yTableRow>
          <O11yTableCell>Failed tests</O11yTableCell>
          <O11yTableCell>
            <Button
              variant="minimal"
              wrapperClassName="text-brand-500 font-semibold"
              onClick={handleClickTrigger}
            >
              Bulk update failure category
            </Button>
          </O11yTableCell>
        </O11yTableRow>
      </O11yTableHead>
    </>
  );
}
TopErrorsBulkUpdateTrigger.propTypes = {
  clusterId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
};
