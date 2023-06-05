import React, { useEffect } from 'react';
import { ChatWidget, toggleChatWidget } from '@browserstack/growth';

function FreshchatIntegration() {
  useEffect(() => {
    toggleChatWidget(false);
  }, []);

  return (
    <div className="relative z-10">
      <ChatWidget direction="right" />
    </div>
  );
}

export default React.memo(FreshchatIntegration);
