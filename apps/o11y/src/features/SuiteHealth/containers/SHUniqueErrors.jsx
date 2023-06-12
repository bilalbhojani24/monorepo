import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';
import { MdSearchOff } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yEmptyState } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import { FILTER_CATEGORIES } from 'features/FilterSkeleton/constants';
import {
  clearAllAppliedFilters,
  resetFilters
} from 'features/FilterSkeleton/slices/filterSlice';
import {
  getAllAppliedFilters,
  getCurrentFilterCategory,
  getIsFiltersLoading
} from 'features/FilterSkeleton/slices/selectors';
import { getSearchStringFromFilters } from 'features/FilterSkeleton/utils';
import {
  setIsUEDetailsVisible,
  setShowUEDetailsFor
} from 'features/SHErrorDetails/slices/dataSlice';
import { SHUEFilters } from 'features/SHFilters';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { logOllyEvent } from 'utils/common';

import UETableHeader from '../components/UETableHeader';
import {
  getSnPErrorsData,
  setErrorsLoading,
  setErrorsSortBy
} from '../slices/dataSlice';
import {
  getSHDataErrors,
  getSnpErrorsLoading,
  getSnpErrorsPaging,
  getSnpErrorsSortBy
} from '../slices/selectors';

import UEMetrics from './UEMetrics';
import UERow from './UERow';

const List = forwardRef((props, ref) => (
  <div {...props} ref={ref} className="mb-24 overflow-hidden" />
));

const Item = (props) => (
  <div
    {...props}
    className="border-base-200 last-of-type:border-base-300 border-x-base-300 overflow-hidden border-x border-b last-of-type:mb-24 last-of-type:rounded-b-md"
  />
);

const LoadingFooter = () => (
  <div className="flex w-full justify-center py-2">
    <O11yLoader />
  </div>
);

const SnPUniqueErrors = () => {
  const mounted = useRef(null);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const dispatch = useDispatch();
  const errors = useSelector(getSHDataErrors);
  const isLoadingErrors = useSelector(getSnpErrorsLoading);
  const pagingParams = useSelector(getSnpErrorsPaging);
  const sortBy = useSelector(getSnpErrorsSortBy);
  const activeProject = useSelector(getActiveProject);
  const navigate = useNavigate();
  const appliedFilters = useSelector(getAllAppliedFilters);
  const isFiltersLoading = useSelector(getIsFiltersLoading);
  const currentFilterCategory = useSelector(getCurrentFilterCategory);

  const o11ySHUEInteraction = useCallback(
    (interaction) => {
      logOllyEvent({
        event: 'O11ySuiteHealthErrorsInteracted',
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          interaction
        }
      });
    },
    [activeProject.id, activeProject.name]
  );

  useEffect(
    () => () => {
      dispatch(resetFilters());
    },
    [dispatch]
  );

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
    navigate({
      search: getSearchStringFromFilters(appliedFilters).toString()
    });
  }, [appliedFilters, navigate]);

  useEffect(() => {
    mounted.current = true;
    dispatch(setErrorsLoading(true));
    if (
      activeProject?.normalisedName &&
      !isFiltersLoading &&
      currentFilterCategory === FILTER_CATEGORIES.SUITE_HEALTH_UNIQUE_ERRORS
    ) {
      dispatch(
        getSnPErrorsData({
          normalisedName: activeProject?.normalisedName,
          sortOptions: sortBy
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
  }, [
    dispatch,
    activeProject?.normalisedName,
    sortBy,
    isFiltersLoading,
    appliedFilters,
    currentFilterCategory
  ]);

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

  const handleViewAll = () => {
    dispatch(clearAllAppliedFilters());
  };

  return (
    <div className={twClassNames('flex flex-col h-full ')}>
      <div className={twClassNames('mb-4 px-6 pt-5')}>
        <SHUEFilters o11ySHUEInteraction={o11ySHUEInteraction} />
      </div>
      <div className="flex-1 overflow-auto">
        {!isEmpty(errors) && <UEMetrics />}
        {isLoadingErrors ? (
          <O11yLoader
            wrapperClassName="h-60"
            loaderClass="text-base-200 fill-base-400 w-8 h-8"
          />
        ) : (
          <>
            {isEmpty(errors) ? (
              <div
                className={twClassNames(
                  'flex items-center justify-center h-full'
                )}
              >
                <O11yEmptyState
                  title="No matching results found"
                  description="We couldn't find the results you were looking for."
                  mainIcon={
                    <MdSearchOff className="text-base-500 inline-block h-12 w-12" />
                  }
                  buttonProps={{
                    children: 'View all unique errors',
                    onClick: handleViewAll,
                    size: 'default'
                  }}
                />
              </div>
            ) : (
              <div className="flex h-full w-full flex-col px-6">
                <div className="">
                  <UETableHeader
                    handleClickSortBy={handleClickSortBy}
                    isLoadingMore={isLoadingMore}
                  />
                </div>
                <div className="flex-1 overflow-auto">
                  <Virtuoso
                    data={errors}
                    overscan={200}
                    endReached={loadMoreRows}
                    itemContent={(index, data) => <UERow data={data} />}
                    components={{
                      Footer: isLoadingMore ? LoadingFooter : null,
                      List,
                      Item
                    }}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SnPUniqueErrors;
