import React, { useCallback, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import FreshchatIntegration from 'common/FreshchatIntegration';
import ModalToShow from 'common/ModalToShow';
import O11yTopContent from 'common/O11yTopContent';
import IntegrationsWidget from 'features/IntegrationsWidget';

import { AppContext } from '../context/AppContext';

function AppContainer() {
  const widgetPositionRef = useRef(null);

  const setWidgetPositionRef = useCallback((ref) => {
    widgetPositionRef.current = ref;
  }, []);
  return (
    <AppContext.Provider
      value={{
        widgetPositionRef,
        setWidgetPositionRef
      }}
    >
      <O11yTopContent />
      <Outlet />
      <IntegrationsWidget />
      <NotificationsContainer />
      <ModalToShow />
      <FreshchatIntegration />
    </AppContext.Provider>
  );
}

export default AppContainer;
