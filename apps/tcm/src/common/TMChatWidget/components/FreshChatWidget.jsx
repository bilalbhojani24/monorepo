import React from 'react';
import { useSelector } from 'react-redux';
import { ChatWidget } from '@browserstack/growth';
import { twClassNames } from '@browserstack/utils';

const FreshChatWidget = () => {
  const isFreshChatButtonVisible = useSelector(
    (state) => state.global.showFreshChatButton
  );

  return (
    <div
      className={twClassNames('relative z-10', {
        hidden: !isFreshChatButtonVisible
      })}
    >
      <p className="bg-brand-500 absolute bottom-4 right-0 px-8 py-4">Chat</p>
      <ChatWidget />
    </div>
  );
};

export default React.memo(FreshChatWidget);
