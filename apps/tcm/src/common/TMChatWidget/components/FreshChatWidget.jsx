import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChatWidget, toggleChatWidget } from '@browserstack/growth';
import { twClassNames } from '@browserstack/utils';

const FreshChatWidget = () => {
  const isFreshChatButtonVisible = useSelector(
    (state) => state.global.showFreshChatButton
  );

  useEffect(() => {
    toggleChatWidget(false);
  }, []);

  return (
    <div
      className={twClassNames('relative z-10', {
        hidden: !isFreshChatButtonVisible
      })}
    >
      <ChatWidget />
    </div>
  );
};

export default React.memo(FreshChatWidget);
