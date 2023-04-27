import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import className from 'classnames';
import PropTypes from 'prop-types';

const DetailsSnippet = ({
  title,
  value,
  isPrimary,
  parseContent,
  dontCapitalize
}) => (
  <div className="mb-4 flex flex-col">
    <div
      className={className(
        'text-base-900',
        isPrimary ? 'text-base font-medium' : 'text-sm font-semibold'
      )}
    >
      {title}
    </div>
    <div
      className={className('text-base-700 text-sm break-all', {
        'capitalize ': !parseContent && !dontCapitalize
      })}
    >
      {parseContent ? ReactHtmlParser(value) : value}
    </div>
  </div>
);

DetailsSnippet.propTypes = {
  title: PropTypes.string,
  isPrimary: PropTypes.bool,
  dontCapitalize: PropTypes.bool,
  parseContent: PropTypes.bool,
  value: PropTypes.oneOfType(PropTypes.string, PropTypes.node)
};

DetailsSnippet.defaultProps = {
  isPrimary: false,
  dontCapitalize: false,
  parseContent: false,
  title: '',
  value: ''
};

export default DetailsSnippet;
