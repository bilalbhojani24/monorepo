import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdFilterAlt } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yButton } from 'common/bifrostProxy';
import { SNP_DATE_RANGE, SNP_PARAMS_MAPPING } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';

import { getBuildNamesData, setSnPTestFilters } from '../slices/dataSlice';
import { getSnPTestFilterByKey } from '../slices/selectors';

import AppliedFilters from './AppliedFilters';
import FiltersSlideover from './FiltersSlideover';

const SnPTestFilter = () => {
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeDateRange = useSelector((state) =>
    getSnPTestFilterByKey(state, 'dateRange')
  );
  const activeProject = useSelector(getActiveProject);

  const [buildNames, setBuildNames] = useState([]);

  useEffect(() => {
    if (activeProject?.normalisedName) {
      dispatch(
        getBuildNamesData({ normalisedName: activeProject?.normalisedName })
      )
        .unwrap()
        .then((res) => {
          setBuildNames(res);
        });
    }
  }, [dispatch, activeProject?.normalisedName]);

  const handleClickRange = (key) => {
    const searchParams = new URLSearchParams(window?.location?.search);
    searchParams.set(SNP_PARAMS_MAPPING.snpDateRange, key);
    navigate({ search: searchParams.toString() });
    dispatch(
      setSnPTestFilters({
        dateRange: {
          key,
          ...SNP_DATE_RANGE[key].getDuration
        }
      })
    );
  };

  const onClickFilter = useCallback((value) => {
    setShowFilter(value);
  }, []);

  const onCloseFilterSlideOver = useCallback(() => {
    setShowFilter(false);
  }, []);

  const handleApplyFilter = useCallback(
    (appliedFilters) => {
      const searchParams = new URLSearchParams(window?.location?.search);
      if (appliedFilters.buildNames && appliedFilters.buildNames.length > 0) {
        searchParams.set(
          SNP_PARAMS_MAPPING.snpActiveBuild,
          appliedFilters.buildNames.join(',')
        );
      }
      searchParams.set(SNP_PARAMS_MAPPING.snpIsMuted, appliedFilters.isMuted);
      searchParams.set(SNP_PARAMS_MAPPING.snpIsFlaky, appliedFilters.isFlaky);
      dispatch(
        setSnPTestFilters({
          isFlaky: appliedFilters.isFlaky,
          isMuted: appliedFilters.isMuted,
          buildName: appliedFilters.buildNames
        })
      );
      navigate({ search: searchParams.toString() });
      onCloseFilterSlideOver();
    },
    [dispatch, navigate, onCloseFilterSlideOver]
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="">
          <div className="border-base-200 flex items-center border">
            {Object.keys(SNP_DATE_RANGE).map((dateKey) => (
              <O11yButton
                key={dateKey}
                colors="white"
                wrapperClassName={twClassNames(
                  'text-sm font-medium text-base-700',
                  {
                    'border-brand-500': activeDateRange.key === dateKey
                  }
                )}
                onClick={() => handleClickRange(dateKey)}
              >
                {SNP_DATE_RANGE[dateKey].label}
              </O11yButton>
            ))}
          </div>
        </div>
        <O11yButton
          onClick={() => onClickFilter(true)}
          icon={<MdFilterAlt className="text-base-500 h-5 w-5" />}
          wrapperClassName="text-sm font-medium text-base-700"
          colors="white"
        >
          Filters
        </O11yButton>
      </div>
      <AppliedFilters />
      <FiltersSlideover
        isVisible={showFilter}
        onClose={onCloseFilterSlideOver}
        onApplyFilter={handleApplyFilter}
        allBuildNames={buildNames}
      />
    </>
  );
};

export default SnPTestFilter;
