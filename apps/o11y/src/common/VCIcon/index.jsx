import React from 'react';
import {
  BitBucketIcon,
  GithubIcon,
  GitIcon,
  GitLabIcon
} from 'assets/icons/components';
import PropTypes from 'prop-types';

function VCIcon({ url, iconProps }) {
  if (url.includes('github')) {
    return <GithubIcon {...iconProps} />;
  }
  if (url.includes('gitlab')) {
    return <GitLabIcon {...iconProps} />;
  }
  if (url.includes('bitbucket')) {
    return <BitBucketIcon {...iconProps} />;
  }
  return <GitIcon {...iconProps} />;
}

VCIcon.propTypes = {
  url: PropTypes.string,
  iconProps: PropTypes.objectOf(PropTypes.any)
};
VCIcon.defaultProps = {
  url: '',
  iconProps: {}
};

export default VCIcon;
