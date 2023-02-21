import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const SkipToContent = ({ wrapperClassName, children, target }) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <button
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={() => target?.current?.focus()}
      type="button"
      className={twClassNames(
        '-ml-80 absolute text-brand-600 px-4 rounded-sm text-sm bg-transparent py-2.5 focus:outline-none focus:ring-brand-600 focus:ring-2 focus:ring-offset-1',
        {
          'ml-0': focused
        },
        wrapperClassName
      )}
    >
      {children}
    </button>
  );
};

SkipToContent.propTypes = {
  wrapperClassName: PropTypes.string,
  children: PropTypes.string.isRequired,
  target: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired
};
SkipToContent.defaultProps = {
  wrapperClassName: ''
};

export default SkipToContent;
