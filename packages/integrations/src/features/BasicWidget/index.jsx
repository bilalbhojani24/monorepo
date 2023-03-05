import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchTokenThunk } from '../../api/index';
import { hasTokenSelector, setUATUrl } from '../slices/userAuthSlice';

import WidgetContainer from './components/DraggableResizable';
import WidgetHeader from './components/WidgetHeader';

const Widget = ({ hasToken, children, handleClose }) => {
  const childRef = useRef(null);
  return hasToken ? (
    <WidgetContainer childRef={childRef}>
      <div ref={childRef}>
        <WidgetHeader handleClose={handleClose} />
        <div className="bg-white p-6">{children}</div>
      </div>
    </WidgetContainer>
  ) : null;
};

Widget.propTypes = {
  children: PropTypes.node,
  hasToken: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
};
Widget.defaultProps = {
  children: null,
  hasToken: true
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
