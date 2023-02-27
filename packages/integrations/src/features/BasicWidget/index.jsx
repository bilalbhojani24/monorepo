import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { fetchToken } from '../../api/fetchToken';

import WidgetContainer from './components/DraggableResizable';
import WidgetHeader from './components/WidgetHeader';

const Widget = () => (
  <WidgetContainer>
    <WidgetHeader />
    <p className="p-4">
      Hello, this is the body of Basic Widget. Cannot drag from here
    </p>
  </WidgetContainer>
);

const WidgetPortal = ({
  authUrl,
  positionRef,
  position,
  projectId,
  isOpen,
  handleClose
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
        />,
        document.body
      )
    : null;
};

export default WidgetPortal;
