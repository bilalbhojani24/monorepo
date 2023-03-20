import React from 'react';
import { MdAllInclusive } from '@browserstack/bifrost';
import { BuildKiteIcon, JenkinsIcon } from 'assets/icons/components';
import PropTypes from 'prop-types';

function CiIcon({ name, iconProps }) {
  if (name?.toLowerCase() === 'jenkins') {
    return <JenkinsIcon {...iconProps} />;
  }
  if (name?.toLowerCase() === 'buildkite') {
    return <BuildKiteIcon {...iconProps} />;
  }
  return <MdAllInclusive {...iconProps} />;
}

CiIcon.propTypes = {
  name: PropTypes.string,
  iconProps: PropTypes.objectOf(PropTypes.any)
};
CiIcon.defaultProps = {
  name: '',
  iconProps: {}
};

export default CiIcon;
