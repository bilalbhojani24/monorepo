import React from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  O11ySlideover,
  // O11yTruncateText,
  O11ySlideoverBody,
  O11ySlideoverHeader
} from 'common/bifrostProxy';
import { SNP_PARAMS_MAPPING } from 'constants/common';

import { setIsSnPDetailsVisible } from '../slices/dataSlice';
import {
  getIsSnPDetailsVisible
  // getShowSnPDetailsFor,
  // getSnPCbtInfo
} from '../slices/selectors';

const TestDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isVisible = useSelector(getIsSnPDetailsVisible);
  // const testId = useSelector(getShowSnPDetailsFor);
  // const cbtInfo = useSelector(getSnPCbtInfo);
  // const [chartBounds, setChartBounds] = useState({
  //   lower: null,
  //   upper: null
  // });
  // const [activeTab, setActiveTab] = useState({
  //   idx: 1,
  //   value: TABS.runs
  // });

  const handleCloseDetails = () => {
    dispatch(setIsSnPDetailsVisible(false));
    const searchParams = new URLSearchParams(window?.location.search);
    searchParams.delete(SNP_PARAMS_MAPPING.snpTestDetails);
    navigate({ search: searchParams.toString() });
  };

  return (
    <O11ySlideover show={isVisible} backgroundOverlay={false} size="4xl">
      <O11ySlideoverHeader
        handleDismissClick={handleCloseDetails}
        heading="Test details header"
      />
      <O11ySlideoverBody>Test details content</O11ySlideoverBody>
    </O11ySlideover>
  );
};

TestDetails.propTypes = {};

export default TestDetails;
