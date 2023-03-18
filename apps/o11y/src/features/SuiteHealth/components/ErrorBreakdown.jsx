import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { twClassNames } from '@browserstack/utils';
import O11yLoader from 'common/O11yLoader';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import { UNIQUE_ERROR_BREAKDOWN_HEADER } from '../constants';

import ErrorBreakDownItem from './ErrorBreakdownItem';

export default function SnpErrorBreakdown({ errorId, isLoading, data }) {
  if (isLoading) {
    return (
      <O11yLoader
        wrapperClassName="py-6"
        loaderClass="text-base-200 fill-base-400 w-8 h-8"
      />
    );
  }

  if (!isLoading && isEmpty(data)) {
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
    <div className={twClassNames('flex-1 bg-base-50 px-6 py-4')}>
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
        {data.length > 5 ? (
          <>
            <Virtuoso
              style={{ height: 300 }}
              data={data}
              itemContent={(index, item) => (
                <ErrorBreakDownItem
                  item={item}
                  key={item.id}
                  isLast={index === data.length - 1}
                  errorId={errorId}
                />
              )}
            />
          </>
        ) : (
          <>
            {data.map((item, index) => (
              <ErrorBreakDownItem
                item={item}
                key={item.id}
                isLast={index === data.length - 1}
                errorId={errorId}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

SnpErrorBreakdown.propTypes = {
  errorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};
