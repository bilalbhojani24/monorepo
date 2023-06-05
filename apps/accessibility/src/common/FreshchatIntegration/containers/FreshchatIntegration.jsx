import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChatWidget, toggleChatWidget } from '@browserstack/growth';
import { twClassNames } from '@browserstack/utils';
import { getShowFreshChatButton } from 'features/Dashboard/slices/selectors';

function FreshchatIntegration() {
  const isFreshChatButtonVisible = useSelector(getShowFreshChatButton);
  useEffect(() => {
    toggleChatWidget(false);
  }, []);

  return (
    <div
      className={twClassNames('relative z-10', {
        hidden: !isFreshChatButtonVisible
      })}
    >
      <ChatWidget direction="right" />
    </div>
  );
}

export default React.memo(FreshchatIntegration);
