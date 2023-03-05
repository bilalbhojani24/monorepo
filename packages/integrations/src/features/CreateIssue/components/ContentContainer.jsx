import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getIntegrationsThunk } from '../../../api/index';
import Loader from '../../../common/components/Loader';
import { LOADING_STATUS } from '../../slices/constants';
import { integrationsLoadingSelector } from '../../slices/integrationsSlice';

import ListOfIntegrations from './ListOfIntegrations';

const getContentToRender = (loadingStatus) => {
  switch (loadingStatus) {
    case LOADING_STATUS.PENDING:
      return (
        <div className="flex h-full items-center justify-center">
          <Loader />
        </div>
      );
    case LOADING_STATUS.SUCCEEDED:
      return <ListOfIntegrations />;
    default:
      return null;
  }
};

const Content = ({ projectId, componentKey }) => {
  const loadingStatus = useSelector(integrationsLoadingSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIntegrationsThunk({ projectId, componentKey }));
  }, [componentKey, dispatch, projectId]);

  return <div>{getContentToRender(loadingStatus)}</div>;
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
