import React from 'react';
import { Hyperlink } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import useHyperlinkWithAnalytics from '../hooks/useHyperlinkWithAnalytics';

const HyperlinkWithAnalytics = ({
  onClick,
  linkToBeSentToAnalytics,
  children,
  ...props
}) => {
  const { performClickWithAnalytics } = useHyperlinkWithAnalytics(
    onClick,
    linkToBeSentToAnalytics
  );

  return (
    <Hyperlink {...props} onClick={performClickWithAnalytics}>
      {children}
    </Hyperlink>
  );
};

HyperlinkWithAnalytics.propTypes = {
  onClick: PropTypes.func.isRequired,
  linkToBeSentToAnalytics: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default HyperlinkWithAnalytics;
