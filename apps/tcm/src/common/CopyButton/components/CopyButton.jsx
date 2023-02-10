import React from 'react';
// import { TMHyperlink } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const CopyButton = ({ children, copyValue }) => {
  const copyHelper = () => {
    navigator.clipboard.writeText(copyValue);
  };

  return (
    <div // to be changed to TMHyperLink
      onClick={copyHelper}
      onKeyDown={copyHelper}
      tabIndex={0}
      role="button"
      variant="minimal"
      color="text-white"
      underlined
      fontWeight="font-semibold"
      className="font-semibold text-white underline"
    >
      {children}
    </div>
  );
};

CopyButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  copyValue: PropTypes.string
};

CopyButton.defaultProps = {
  children: '',
  copyValue: ''
};

export default CopyButton;
