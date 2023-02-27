import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { getIntegrationsThunk } from '../../../api/index';

const Content = ({ projectId, componentKey }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIntegrationsThunk(projectId, componentKey));
  }, [componentKey, dispatch, projectId]);

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
