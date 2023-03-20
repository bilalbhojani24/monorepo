import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchTokenThunk, getIntegrationsThunk } from '../../api/index';
import { Loader } from '../../common/components';
import { LOADING_STATUS } from '../slices/constants';
import {
  integrationsLoadingSelector,
  integrationsSelector
} from '../slices/integrationsSlice';
import { hasTokenSelector, setUATUrl } from '../slices/userAuthSlice';

import DraggableContainer from './components/Draggable';
import DraggableResizableContainer from './components/DraggableResizable';
import WidgetHeader from './components/WidgetHeader';

const Widget = ({
  hasToken,
  children,
  handleClose,
  hasAtLeastOneIntegrationSetup
}) => {
  const childRef = useRef(null);
  if (!hasToken) return null;
  if (hasAtLeastOneIntegrationSetup) {
    return (
      <DraggableResizableContainer childRef={childRef}>
        <div ref={childRef}>
          <WidgetHeader handleClose={handleClose} />
          <div className="bg-white p-6">{children}</div>
        </div>
      </DraggableResizableContainer>
    );
  }
  return (
    <DraggableContainer>
      <WidgetHeader handleClose={handleClose} />
      <div className="bg-white p-6">{children}</div>
    </DraggableContainer>
  );
};

Widget.propTypes = {
  children: PropTypes.node,
  hasToken: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  hasAtLeastOneIntegrationSetup: PropTypes.bool
};
Widget.defaultProps = {
  children: null,
  hasToken: true,
  hasAtLeastOneIntegrationSetup: false
};

const WidgetPortal = ({
  authUrl,
  positionRef,
  position,
  projectId,
  isOpen,
  handleClose,
  children,
  componentKey
}) => {
  const hasToken = useSelector(hasTokenSelector);
  const [isUserAuthLoading, setIsUserAuthLoading] = useState(false);
  const integrationsLoadingStatus = useSelector(integrationsLoadingSelector);
  const areIntegrationsLoading =
    integrationsLoadingStatus === LOADING_STATUS.PENDING;
  const integrations = useSelector(integrationsSelector);
  const hasAtLeastOneIntegrationSetup = integrations?.some(
    ({ setup_completed: integrated }) => integrated
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setIsUserAuthLoading(true);
    dispatch(setUATUrl(authUrl));
    dispatch(fetchTokenThunk()).then(() => {
      setIsUserAuthLoading(false);
      dispatch(getIntegrationsThunk({ projectId, componentKey }));
    });
  }, [authUrl, dispatch, projectId, componentKey]);

  return isOpen
    ? createPortal(
        <Widget
          authUrl={authUrl}
          hasToken={hasToken}
          position={position}
          positionRef={positionRef}
          projectId={projectId}
          handleClose={handleClose}
          hasAtLeastOneIntegrationSetup={hasAtLeastOneIntegrationSetup}
        >
          {isUserAuthLoading || areIntegrationsLoading ? (
            <div className="flex h-full items-center justify-center">
              <Loader />
            </div>
          ) : (
            children
          )}
        </Widget>,
        document.body
      )
    : null;
};

export default WidgetPortal;
