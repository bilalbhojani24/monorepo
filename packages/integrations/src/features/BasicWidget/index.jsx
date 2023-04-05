import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchTokenThunk, getIntegrationsThunk } from '../../api/index';
import {
  GenericError as ErrorWithTryAgain,
  Loader
} from '../../common/components';
import { LOADING_STATUS } from '../slices/constants';
import {
  integrationsErrorSelector,
  integrationsLoadingSelector,
  integrationsSelector
} from '../slices/integrationsSlice';
import {
  hasTokenSelector,
  setUATConfig,
  userAuthErrorSelector,
  userAuthLoadingSelector
} from '../slices/userAuthSlice';

import DraggableContainer from './components/Draggable';
import DraggableResizableContainer from './components/DraggableResizable';
import WidgetHeader from './components/WidgetHeader';

const Widget = ({
  hasError,
  position,
  children,
  isLoading,
  handleClose,
  positionRef,
  hasAtLeastOneIntegrationSetup
}) => {
  const childRef = useRef(null);
  if (hasAtLeastOneIntegrationSetup) {
    return (
      <DraggableResizableContainer
        position={position}
        childRef={childRef}
        positionRef={positionRef}
      >
        <div ref={childRef} className="relative bg-white">
          <WidgetHeader handleClose={handleClose} />
          {children}
        </div>
      </DraggableResizableContainer>
    );
  }
  return (
    <DraggableContainer position={position} positionRef={positionRef}>
      <WidgetHeader handleClose={handleClose} />
      <div
        className={'flex-1 bg-white p-6'.concat(
          isLoading || hasError ? ' flex items-center justify-center' : ''
        )}
      >
        {children}
      </div>
    </DraggableContainer>
  );
};

Widget.propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
  hasAtLeastOneIntegrationSetup: PropTypes.bool,
  position: PropTypes.string.isRequired,
  positionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};
Widget.defaultProps = {
  children: null,
  hasAtLeastOneIntegrationSetup: false,
  positionRef: null
};

const renderChild = ({
  isWidgetLoading,
  widgetHasError,
  toRender,
  handleTryAgain
}) => {
  if (isWidgetLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    );
  if (widgetHasError)
    return (
      <ErrorWithTryAgain className="flex-1" handleTryAgain={handleTryAgain} />
    );
  return toRender;
};

const WidgetPortal = ({
  auth,
  positionRef,
  position,
  projectId,
  isOpen,
  handleClose,
  children,
  componentKey
}) => {
  const hasToken = useSelector(hasTokenSelector);
  const userAuthLoadingStatus = useSelector(userAuthLoadingSelector);
  const integrationsLoadingStatus = useSelector(integrationsLoadingSelector);
  const integrationsHasError = Boolean(useSelector(integrationsErrorSelector));
  const userAuthHasError = Boolean(useSelector(userAuthErrorSelector));
  const isUserAuthLoading = userAuthLoadingStatus === LOADING_STATUS.PENDING;
  const areIntegrationsLoading =
    integrationsLoadingStatus === LOADING_STATUS.PENDING;
  const isWidgetLoading = isUserAuthLoading || areIntegrationsLoading;
  const widgetHasError = userAuthHasError || integrationsHasError;
  const integrations = useSelector(integrationsSelector);
  const hasAtLeastOneIntegrationSetup = integrations?.some(
    ({ setup_completed: integrated }) => integrated
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUATConfig(auth));
    dispatch(fetchTokenThunk()).then(() => {
      if (hasToken) {
        dispatch(getIntegrationsThunk({ projectId, componentKey }));
      }
    });
  }, [hasToken]);

  const handleTryAgain = () => {
    if (userAuthHasError) {
      dispatch(fetchTokenThunk()).then(() => {
        if (hasToken) {
          dispatch(getIntegrationsThunk({ projectId, componentKey }));
        }
      });
    } else {
      dispatch(getIntegrationsThunk({ projectId, componentKey }));
    }
  };

  return isOpen
    ? createPortal(
        <Widget
          hasToken={hasToken}
          position={position}
          positionRef={positionRef}
          projectId={projectId}
          handleClose={handleClose}
          hasAtLeastOneIntegrationSetup={hasAtLeastOneIntegrationSetup}
          isLoading={isWidgetLoading}
          hasError={widgetHasError}
        >
          {renderChild({
            isWidgetLoading,
            widgetHasError,
            toRender: children,
            handleTryAgain
          })}
        </Widget>,
        document.body
      )
    : null;
};

export default WidgetPortal;
