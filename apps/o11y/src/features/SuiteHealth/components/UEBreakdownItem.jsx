import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import MiniChart from 'common/MiniChart';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import { TABS as ERROR_DETAILS_TABS } from 'features/SHErrorDetails/constants';
import {
  setIsUEDetailsVisible,
  setShowUEDetailsFor,
  setUECbtInfo,
  setUEDetailsActiveTab
} from 'features/SHErrorDetails/slices/dataSlice';
import PropTypes from 'prop-types';

import { UNIQUE_ERROR_BREAKDOWN_HEADER } from '../constants';

import Platforms from './Platforms';
import TestInfo from './TestInfo';

const UEBreakdownItem = ({ item, errorId, isLast }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickItem = () => {
    dispatch(
      setUECbtInfo({
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
      setShowUEDetailsFor({
        testId: item.id,
        errorId
      })
    );
    dispatch(setIsUEDetailsVisible(true));
    const searchParams = new URLSearchParams(window?.location?.search);
    searchParams.set(SNP_PARAMS_MAPPING.snpErrorId, errorId);
    searchParams.set(SNP_PARAMS_MAPPING.snpErrorTestId, item.id);
    navigate({ search: searchParams.toString() });
  };

  const handleViewMorePlatforms = () => {
    dispatch(
      setUEDetailsActiveTab({
        idx: 0,
        value: ERROR_DETAILS_TABS.platforms
      })
    );
  };

  return (
    <div
      className={twClassNames('flex w-full items-center hover:bg-brand-50', {
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
        <Platforms
          browsers={item.browsers}
          platforms={item.platforms}
          onViewMoreClick={handleViewMorePlatforms}
        />
      </div>
      <div
        className={twClassNames(
          UNIQUE_ERROR_BREAKDOWN_HEADER.errorCount.bodyClass,
          'flex items-center gap-4'
        )}
      >
        <div className="h-5 w-12">
          <MiniChart
            data={item.chartData}
            chartType="area"
            color="var(--colors-danger-100)"
            lineColor="var(--colors-danger-400)"
          />
        </div>
        <p className="">{item.errorCount}</p>
      </div>
    </div>
  );
};

UEBreakdownItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  isLast: PropTypes.bool.isRequired,
  errorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default UEBreakdownItem;
