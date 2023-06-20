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
      <p className="bg-brand-500 absolute bottom-0 right-0 h-full w-20 p-6 text-white">
        CHAT
      </p>

      <ChatWidget />
    </div>
  );
};

export default React.memo(FreshChatWidget);
