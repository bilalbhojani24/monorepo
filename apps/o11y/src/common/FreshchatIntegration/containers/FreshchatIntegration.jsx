import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChatWidget, toggleChatWidget } from '@browserstack/growth';
import { getModalVersion } from 'common/ModalToShow/slices/selectors';
import { getActiveFloatingComponents } from 'globalSlice/selectors';

function FreshchatIntegration() {
  const activeFloatingComponent = useSelector(getActiveFloatingComponents);
  const modalToShow = useSelector(getModalVersion);

  useEffect(() => {
    if (activeFloatingComponent.length || modalToShow) {
      toggleChatWidget(false);
    } else {
      toggleChatWidget(true);
    }
  }, [activeFloatingComponent, modalToShow]);

  return <ChatWidget />;
}

export default React.memo(FreshchatIntegration);
