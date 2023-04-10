import React from 'react';
import { MdBarChart, MdOutlineError } from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader/components/O11yLoader';
import PropTypes from 'prop-types';

export default function TrendStatesWrapper({
  children,
  isLoading,
  hasError,
  isEmpty,
  onClickCTA
}) {
  if (!isLoading && hasError) {
    return (
      <div className="flex h-80 items-center justify-center">
        <O11yEmptyState
          title="Something went wrong"
          description="Something went wrong while fetching data"
          mainIcon={
            <MdOutlineError className="text-danger-600 inline-block !h-12 !w-12" />
          }
          buttonProps={{
            children: 'Reload',
            onClick: onClickCTA,
            size: 'default'
          }}
        />
      </div>
    );
  }

  if (isEmpty && !isLoading) {
    return (
      <div className="flex h-80 flex-col">
        <div className="flex flex-1 items-center justify-center">
          <O11yEmptyState
            title="No data found"
            description={null}
            mainIcon={
              <MdBarChart className="text-base-400 inline-block !h-12 !w-12" />
            }
            buttonProps={null}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-full">
      {children}
      {isLoading && (
        <div className="top-0 z-10 flex h-full w-full items-center justify-center bg-white opacity-70">
          <O11yLoader
            text="Fetching data"
            wrapperClassName="py-6"
            loaderClass="text-base-200 fill-base-400 w-8 h-8"
          />
        </div>
      )}
    </div>
  );
}

TrendStatesWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isEmpty: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClickCTA: PropTypes.func.isRequired
};
