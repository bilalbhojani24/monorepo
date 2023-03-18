import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import MiniChart from 'common/MiniChart';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import {
  setIsSnPErrorDetailsVisible,
  setShowSnPErrorDetailsFor,
  setSnPErrorCbtInfo
} from 'features/SHErrorDetails/slices/dataSlice';
import PropTypes from 'prop-types';

import { UNIQUE_ERROR_BREAKDOWN_HEADER } from '../constants';

import SnPPlatforms from './Platforms';
import TestInfo from './TestInfo';

const ErrorBreakDownItem = ({ item, errorId, isLast }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickItem = () => {
    dispatch(
      setSnPErrorCbtInfo({
        osName: '',
        osVersion: '',
        browserName: '',
        browserVersion: '',
        osKey: '',
        browserKey: '',
        deviceName: ''
      })
    );
    dispatch(
      setShowSnPErrorDetailsFor({
        testId: item.id,
        errorId
      })
    );
    dispatch(setIsSnPErrorDetailsVisible(true));
    const searchParams = new URLSearchParams(window?.location?.search);
    searchParams.set(SNP_PARAMS_MAPPING.snpErrorId, errorId);
    searchParams.set(SNP_PARAMS_MAPPING.snpErrorTestId, item.id);
    navigate({ search: searchParams.toString() });
  };
  return (
    <div
      className={twClassNames('flex w-full items-center', {
        'border-b border-base-300': !isLast
      })}
      role="button"
      tabIndex={0}
      onClick={handleClickItem}
      onKeyDown={() => {}}
    >
      <div className={UNIQUE_ERROR_BREAKDOWN_HEADER.tests.bodyClass}>
        <TestInfo testDetails={item} />
      </div>
      <div className={UNIQUE_ERROR_BREAKDOWN_HEADER.platforms.bodyClass}>
        <SnPPlatforms browsers={item.browsers} platforms={item.platforms} />
      </div>
      <div className={UNIQUE_ERROR_BREAKDOWN_HEADER.errorCount.bodyClass}>
        <div className="">
          <MiniChart data={item.chartData} />
          <p className="">{item.errorCount}</p>
        </div>
      </div>
    </div>
  );
};

ErrorBreakDownItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  isLast: PropTypes.bool.isRequired,
  errorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default ErrorBreakDownItem;
