import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { O11yBadge } from 'common/bifrostProxy';
import { SNP_PARAMS_MAPPING } from 'constants/common';

import { setSnPTestFilters } from '../slices/dataSlice';
import { getAllSnPTestFilters } from '../slices/selectors';

const AppliedFilters = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector(getAllSnPTestFilters);

  const clearBuilds = () => {
    const searchParams = new URLSearchParams(window?.location?.search);
    searchParams.delete(SNP_PARAMS_MAPPING.snpActiveBuild);
    dispatch(
      setSnPTestFilters({
        buildName: []
      })
    );
    navigate({ search: searchParams.toString() });
  };

  const clearMutedStatus = () => {
    const searchParams = new URLSearchParams(window?.location?.search);
    searchParams.delete(SNP_PARAMS_MAPPING.snpIsMuted);
    dispatch(
      setSnPTestFilters({
        isMuted: false
      })
    );
    navigate({ search: searchParams.toString() });
  };

  const clearFlakyStatus = () => {
    const searchParams = new URLSearchParams(window?.location?.search);
    searchParams.delete(SNP_PARAMS_MAPPING.snpIsFlaky);
    dispatch(
      setSnPTestFilters({
        isFlaky: false
      })
    );
    navigate({ search: searchParams.toString() });
  };

  const clearAllFilters = () => {
    const searchParams = new URLSearchParams(window?.location?.search);
    searchParams.delete(SNP_PARAMS_MAPPING.snpActiveBuild);
    searchParams.delete(SNP_PARAMS_MAPPING.snpIsMuted);
    searchParams.delete(SNP_PARAMS_MAPPING.snpIsFlaky);
    dispatch(
      setSnPTestFilters({
        isFlaky: false,
        isMuted: false,
        buildName: []
      })
    );
    navigate({ search: searchParams.toString() });
  };
  return (
    <>
      {(filters.buildName.length > 0 || filters.isFlaky || filters.isMuted) && (
        <div className="mt-4 flex items-center gap-4">
          <span className="text-base-500 border-base-300 border-r pr-4 text-sm leading-5">
            Filters
          </span>

          <div className="flex gap-4">
            {filters.buildName.length > 0 && (
              <O11yBadge
                hasRemoveButton
                onClose={clearBuilds}
                wrapperClassName="bg-white shadow text-base-700 text-sm font-medium leading-4"
                text={
                  filters.buildName.length > 1
                    ? `${filters.buildName.length} builds`
                    : '1 build'
                }
              />
            )}
            {filters.isFlaky && (
              <O11yBadge
                hasRemoveButton
                onClose={clearFlakyStatus}
                wrapperClassName="bg-white shadow text-base-700 text-sm font-medium leading-4"
                text="show flaky"
              />
            )}
            {filters.isMuted && (
              <O11yBadge
                hasRemoveButton
                onClose={clearMutedStatus}
                wrapperClassName="bg-white shadow text-base-700 text-sm font-medium leading-4"
                text="show muted"
              />
            )}
          </div>
          <button
            className="text-base-700 text-sm font-medium leading-4"
            onClick={clearAllFilters}
            type="button"
          >
            Clear all
          </button>
        </div>
      )}
    </>
  );
};

AppliedFilters.propTypes = {};

export default AppliedFilters;
