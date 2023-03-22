import React from 'react';
import PlaceHolder from 'common/PlaceHolder';
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
      <div className="flex h-full flex-col">
        <div className="">
          <PlaceHolder
            type="error"
            text="Something went wrong"
            ctaText="Reload"
            onClickCTA={onClickCTA}
          />
        </div>
      </div>
    );
  }

  if (isEmpty && !isLoading) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex flex-1 items-center justify-center">
          <PlaceHolder type="empty" text="No data found" />
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-full">
      {children}
      {isLoading && (
        <div className="top-0 z-10 flex h-full w-full items-center justify-center bg-white opacity-70">
          <PlaceHolder type="loading" />
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
