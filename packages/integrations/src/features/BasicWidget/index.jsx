import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchTokenThunk } from '../../api/index';
import { hasTokenSelector, setUATUrl } from '../slices/userAuthSlice';

import WidgetContainer from './components/DraggableResizable';
import WidgetHeader from './components/WidgetHeader';

const Widget = ({ hasToken = true, children, handleClose }) =>
  hasToken ? (
    <WidgetContainer>
      <WidgetHeader handleClose={handleClose} />
      <div className="flex-1 bg-white p-6">{children}</div>
    </WidgetContainer>
  ) : null;

Widget.propTypes = {
  children: PropTypes.node,
  hasToken: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
};
Widget.defaultProps = {
  children: null,
  hasToken: false
};

const WidgetPortal = ({
  authUrl,
  positionRef,
  position,
  projectId,
  isOpen,
  handleClose,
  children
}) => {
  const hasToken = useSelector(hasTokenSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUATUrl(authUrl));
    dispatch(fetchTokenThunk());
  }, [authUrl, dispatch]);

  return isOpen
    ? createPortal(
        <Widget
          authUrl={authUrl}
          hasToken={hasToken}
          position={position}
          positionRef={positionRef}
          projectId={projectId}
          handleClose={handleClose}
        >
          {children}
        </Widget>,
        document.body
      )
    : null;
};

export default WidgetPortal;
