import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import { twClassNames } from '@browserstack/utils';
import O11yLoader from 'common/O11yLoader';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import { UNIQUE_ERROR_BREAKDOWN_HEADER } from '../constants';
import { getSnPUEBreakdownData } from '../slices/dataSlice';
import { getAllSnPTestFilters, getSnpErrorsSortBy } from '../slices/selectors';

import UEBreakdownItem from './UEBreakdownItem';

export default function UEBreakdown({ errorId }) {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);

  const [breakDownData, setBreakDownData] = useState([]);
  const [isLoadingBD, setIsLoadingBD] = useState(true);
  const filters = useSelector(getAllSnPTestFilters);
  const sortBy = useSelector(getSnpErrorsSortBy);

  useEffect(() => {
    setIsLoadingBD(true);
    dispatch(
      getSnPUEBreakdownData({
        normalisedName: activeProject?.normalisedName,
        errorId,
        filters,
        sortOptions: sortBy
      })
    )
      .unwrap()
      .then((res) => {
        setBreakDownData(res);
      })
      .finally(() => {
        setIsLoadingBD(false);
      });
  }, [activeProject?.normalisedName, dispatch, filters, sortBy, errorId]);

  if (isLoadingBD) {
    return (
      <O11yLoader
        wrapperClassName="py-6"
        loaderClass="text-base-200 fill-base-400 w-8 h-8"
      />
    );
  }

  if (!isLoadingBD && isEmpty(breakDownData)) {
    return (
      <div
        className={twClassNames(
          'flex items-center justify-center flex-1 py-6 text-sm bg-base-100'
        )}
      >
        No data found
      </div>
    );
  }

  return (
    <div className={twClassNames('flex-1 bg-base-50 pl-9 pb-4')}>
      <div className="border-base-300 flex w-full items-center border-b">
        <div className={UNIQUE_ERROR_BREAKDOWN_HEADER.tests.headerClass}>
          {UNIQUE_ERROR_BREAKDOWN_HEADER.tests.label}
        </div>
        <div className={UNIQUE_ERROR_BREAKDOWN_HEADER.platforms.headerClass}>
          {UNIQUE_ERROR_BREAKDOWN_HEADER.platforms.label}
        </div>
        <div className={UNIQUE_ERROR_BREAKDOWN_HEADER.errorCount.headerClass}>
          {UNIQUE_ERROR_BREAKDOWN_HEADER.errorCount.label}
        </div>
      </div>
      <div className="">
        {breakDownData.length > 5 ? (
          <>
            <Virtuoso
              style={{ height: 300 }}
              data={breakDownData}
              itemContent={(index, item) => (
                <UEBreakdownItem
                  item={item}
                  key={item.id}
                  isLast={index === breakDownData.length - 1}
                  errorId={errorId}
                />
              )}
            />
          </>
        ) : (
          <>
            {breakDownData.map((item, index) => (
              <UEBreakdownItem
                item={item}
                key={item.id}
                isLast={index === breakDownData.length - 1}
                errorId={errorId}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

UEBreakdown.propTypes = {
  errorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
