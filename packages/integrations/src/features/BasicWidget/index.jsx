import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { fetchToken } from '../../api/index';

import WidgetContainer from './components/DraggableResizable';
import WidgetHeader from './components/WidgetHeader';

const Widget = ({ children }) => (
  <WidgetContainer>
    <WidgetHeader />
    {children}
  </WidgetContainer>
);

Widget.propTypes = {
  children: PropTypes.node
};
Widget.defaultProps = {
  children: null
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
  const [hasToken, setHasToken] = useState(false);
  useEffect(() => {
    fetchToken(authUrl).then(() => {
      setHasToken(true);
    });
  }, [authUrl]);

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
