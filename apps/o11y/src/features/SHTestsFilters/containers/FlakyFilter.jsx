import React from 'react';
// import { useSelector } from 'react-redux';
import { O11yCheckbox } from 'common/bifrostProxy';
// import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
// import { getSelectedFilterByBooleanType } from 'features/FilterSkeleton/slices/selectors';
// import PropTypes from 'prop-types';

const FlakyFilter = () => (
  //   const isFlakyObject = useSelector(
  //     getSelectedFilterByBooleanType(ADV_FILTER_TYPES.isFlaky)
  //   );

  <div className="">
    <p className="text-base-700 mb-2 text-sm font-medium leading-5">
      Flaky Tests
    </p>
    <O11yCheckbox
      border={false}
      checked
      data={{
        label: 'Flaky',
        value: true
      }}
      // eslint-disable-next-line lodash/prefer-noop
      onChange={() => {}}
      wrapperClassName="mb-1"
    />
    <O11yCheckbox
      border={false}
      checked={false}
      data={{
        label: 'Not Flaky',
        value: false
      }}
      // eslint-disable-next-line lodash/prefer-noop
      onChange={() => {}}
    />
  </div>
);
FlakyFilter.propTypes = {};

export default FlakyFilter;
