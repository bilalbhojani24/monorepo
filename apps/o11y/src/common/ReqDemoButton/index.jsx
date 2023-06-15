import React from 'react';
import { O11yButton } from 'common/bifrostProxy';
import { EXTERNAL_LINKS } from 'constants/common';
import PropTypes from 'prop-types';
import { getExternalUrl, logOllyEvent } from 'utils/common';

function ReqDemoButton({ buttonProps, source, clickCb }) {
  const handleClickGetDemo = () => {
    logOllyEvent({
      event: 'O11yDemoCTAClicked',
      data: {
        source,
        url: window.location.href
      }
    });
    if (clickCb && typeof clickCb === 'function') {
      clickCb();
    }
    window.open(
      getExternalUrl({ path: EXTERNAL_LINKS.getADemo }),
      '_blank',
      'noopener,noreferrer'
    );
  };
  return (
    <O11yButton
      colors="white"
      size="default"
      {...buttonProps}
      onClick={handleClickGetDemo}
    >
      Get a demo
    </O11yButton>
  );
}

ReqDemoButton.propTypes = {
  buttonProps: PropTypes.objectOf(PropTypes.any).isRequired,
  source: PropTypes.string.isRequired,
  clickCb: PropTypes.func
};
ReqDemoButton.defaultProps = {
  clickCb: () => {}
};
export default ReqDemoButton;
