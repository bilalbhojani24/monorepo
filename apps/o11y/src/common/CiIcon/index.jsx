import React from 'react';
import { MdAllInclusive } from '@browserstack/bifrost';
import {
  BuildKiteIcon,
  GitLabIcon,
  JenkinsIcon
} from 'assets/icons/components';
import PropTypes from 'prop-types';

function CiIcon({ name, iconProps }) {
  switch (name?.toLowerCase()) {
    case 'jenkins':
      return <JenkinsIcon {...iconProps} />;
    case 'buildkite':
      return <BuildKiteIcon {...iconProps} />;
    case 'gitlab':
      return <GitLabIcon {...iconProps} />;
    default:
      return <MdAllInclusive {...iconProps} />;
  }
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
