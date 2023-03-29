import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import { twClassNames } from '@browserstack/utils';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import {
  setIsUEDetailsVisible,
  setShowUEDetailsFor
} from 'features/SHErrorDetails/slices/dataSlice';
import {
  setIsTestDetailsVisible,
  setShowTestDetailsFor
} from 'features/TestDetails/slices/uiSlice';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { logOllyEvent } from 'utils/common';

import ErrorsHeader from '../components/ErrorsHeader';
import UETableHeader from '../components/UETableHeader';
import {
  getSnPErrorsData,
  setErrorsLoading,
  setErrorsSortBy
} from '../slices/dataSlice';
import {
  getAllSnPTestFilters,
  getSHDataErrors,
  getSnpErrorsLoading,
  getSnpErrorsPaging,
  getSnpErrorsSortBy
} from '../slices/selectors';

import UERow from './UERow';

const List = forwardRef((props, ref) => (
  <div
    {...props}
    ref={ref}
    className="border-base-300 rounded-b-md border border-t-0"
  />
));

const LoadingFooter = () => (
  <div className="flex w-full justify-center py-2">
    <O11yLoader loaderClass="text-base-600 h-6 w-6 self-center p-1" />
  </div>
);

const SnPUniqueErrors = () => {
  const mounted = useRef(null);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector(getAllSnPTestFilters);
  const errors = useSelector(getSHDataErrors);
  const isLoadingErrors = useSelector(getSnpErrorsLoading);
  const pagingParams = useSelector(getSnpErrorsPaging);
  const sortBy = useSelector(getSnpErrorsSortBy);
  const activeProject = useSelector(getActiveProject);

  useEffect(() => {
    logOllyEvent({
      event: 'O11ySuiteHealthErrorsVisited',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id
      }
    });
  }, [activeProject.name, activeProject.id]);

  const loadMoreRows = () => {
    if (!isLoadingErrors && errors.length && pagingParams?.hasNext) {
      setIsLoadingMore(true);
      dispatch(
        getSnPErrorsData({
          normalisedName: activeProject?.normalisedName,
          pagingParams,
          sortOptions: sortBy,
          filters,
          shouldUpdate: true
        })
      ).finally(() => {
        if (mounted.current) {
          setIsLoadingMore(false);
        }
      });
    }
  };

  useEffect(() => {
    mounted.current = true;
    if (activeProject?.normalisedName) {
      dispatch(setErrorsLoading(true));
      dispatch(
        getSnPErrorsData({
          normalisedName: activeProject?.normalisedName,
          sortOptions: sortBy,
          filters
        })
      )
        .unwrap()
        .finally(() => {
          dispatch(setErrorsLoading(false));
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, filters, activeProject?.normalisedName, sortBy]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const testDetails = searchParams.get('details');
    if (testDetails) {
      dispatch(setIsTestDetailsVisible(true));
      dispatch(setShowTestDetailsFor(testDetails));
    }
    return () => {
      dispatch(setIsTestDetailsVisible(false));
    };
  }, [dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const snpErrorId = searchParams.get(SNP_PARAMS_MAPPING.snpErrorId);
    const snpErrorTestId = searchParams.get(SNP_PARAMS_MAPPING.snpErrorTestId);

    if (snpErrorId && snpErrorTestId) {
      dispatch(setIsUEDetailsVisible(true));
      dispatch(
        setShowUEDetailsFor({
          errorId: snpErrorId,
          testId: snpErrorTestId
        })
      );
    }
    return () => {
      dispatch(setIsUEDetailsVisible(false));
    };
  }, [dispatch]);

  const handleClickSortBy = (val) => {
    const updatedData = { type: val };
    if (val === sortBy.type) {
      updatedData.status = sortBy.status === 'asc' ? 'desc' : 'asc';
    } else {
      updatedData.status = 'desc';
    }
    dispatch(setErrorsSortBy(updatedData));
  };

  return (
    <div className={twClassNames('flex flex-col h-full ')}>
      <ErrorsHeader handleClickSortBy={handleClickSortBy} sortBy={sortBy} />
      {isLoadingErrors ? (
        <O11yLoader
          wrapperClassName="flex-1"
          loaderClass="text-base-200 fill-base-400 w-8 h-8"
        />
      ) : (
        <>
          {isEmpty(errors) ? (
            <div
              className={twClassNames(
                'flex items-center justify-center flex-1'
              )}
            >
              <EmptyPage text="No data found" />
            </div>
          ) : (
            <>
              <div className="px-6">
                <UETableHeader
                  handleClickSortBy={handleClickSortBy}
                  isLoadingMore={isLoadingMore}
                />
              </div>
              <div className="flex-1 overflow-auto px-6">
                <Virtuoso
                  data={errors}
                  overscan={200}
                  endReached={loadMoreRows}
                  itemContent={(index, data) => <UERow data={data} />}
                  components={{
                    Footer: isLoadingMore ? LoadingFooter : null,
                    List
                  }}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SnPUniqueErrors;
