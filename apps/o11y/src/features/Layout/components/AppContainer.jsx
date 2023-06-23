import React, { useCallback, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationsContainer, ProductSidenav } from '@browserstack/bifrost';
import FreshchatIntegration from 'common/FreshchatIntegration';
import ModalToShow from 'common/ModalToShow';
import O11yTopContent from 'common/O11yTopContent';
import { PRODUCT_NAV_IDENTIFIER } from 'constants/common';
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
      <div className="fixed top-16 z-10">
        <ProductSidenav activeProduct={PRODUCT_NAV_IDENTIFIER} />
      </div>
      <div className="ml-14">
        <Outlet />
      </div>
      <IntegrationsWidget />
      <NotificationsContainer />
      <ModalToShow />
      <FreshchatIntegration />
    </AppContext.Provider>
  );
}

export default AppContainer;
