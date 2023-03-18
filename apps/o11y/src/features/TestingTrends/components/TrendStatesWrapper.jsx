import React from 'react';
import PlaceHolder from 'common/PlaceHolder';
import PropTypes from 'prop-types';

import CardHeader from './CardHeader';

export default function TrendStatesWrapper({
  children,
  isLoading,
  hasError,
  title,
  showTitle,
  isEmpty,
  onClickCTA
}) {
  if (!isLoading && hasError) {
    return (
      <div className="flex h-full flex-col">
        {showTitle && <CardHeader title={title} />}
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
        {showTitle && <CardHeader title={title} />}
        <div className="">
          <PlaceHolder type="empty" text="No data found" />
        </div>
      </div>
    );
  }
  return (
    <div className="">
      {children}
      {isLoading && (
        <div className="">
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
  title: PropTypes.string,
  showTitle: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClickCTA: PropTypes.func.isRequired
};

TrendStatesWrapper.defaultProps = {
  showTitle: true,
  title: ''
};
