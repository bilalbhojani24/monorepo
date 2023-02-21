/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { DataVisualization } from '@browserstack/bifrost';
// import { twClassNames } from '@browserstack/utils';
import Loader from 'common/Loader';
import PropTypes from 'prop-types';

const TMDataVisualization = (props) => {
  const { isLoading, analytics } = props;
  // if (isLoading)
  //   return (
  //     <div
  //       className={twClassNames(
  //         'rounded-lg w-full flex justify-center items-center h-96 bg-white shadow',
  //         className
  //       )}
  //     >
  //       <Loader />
  //     </div>
  //   );
  return (
    <DataVisualization
      {...props}
      analytics={isLoading ? <Loader wrapperClassName="h-96" /> : analytics}
    />
  );
};

TMDataVisualization.propTypes = {
  isLoading: PropTypes.bool,
  analytics: PropTypes.node
};

TMDataVisualization.defaultProps = {
  isLoading: false,
  analytics: null
};

export default TMDataVisualization;
