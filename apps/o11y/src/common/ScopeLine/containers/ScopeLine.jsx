import React from 'react';
import { MdChevronRight } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

export default function ScopeLine({ scopes }) {
  return (
    <div
      className="border-base-300 overflow-hidden text-ellipsis whitespace-nowrap"
      title={scopes.join('>')}
      style={{ direction: 'rtl' }}
    >
      {scopes.map((item, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={`${item}-${idx}`}>
          <span>{item}</span>
          {idx !== scopes.length - 1 && (
            <MdChevronRight className="text-base-500 inline-block h-4 w-4" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

ScopeLine.propTypes = {
  scopes: PropTypes.arrayOf(PropTypes.string).isRequired
};
