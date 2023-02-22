import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getIntegrations } from '../../../api/index';

const Content = ({ projectId, componentKey }) => {
  useEffect(() => {
    getIntegrations(projectId, componentKey);
  }, [componentKey, projectId]);

  return (
    <p className="p-4">
      Hello, this is the body of Basic Widget. Cannot drag from here
    </p>
  );
};

Content.propTypes = {
  projectId: PropTypes.string,
  componentKey: PropTypes.string
};
Content.defaultProps = {
  projectId: null,
  componentKey: 'create_issue'
};

export default Content;
