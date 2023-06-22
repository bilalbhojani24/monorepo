import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ChatWidget } from '@browserstack/growth';
import { twClassNames } from '@browserstack/utils';

const FreshChatWidget = () => {
  const location = useLocation();
  const isFreshChatButtonVisible = useSelector(
    (state) => state.global.showFreshChatButton
  );

  return (
    <div
      className={twClassNames('relative z-10', {
        hidden:
          location.pathname.split('/').includes('test-cases') || // this case is added explicitly to handle delete test case in which pagination is unmounted
          !isFreshChatButtonVisible
      })}
    >
      <p className="bg-brand-500 absolute bottom-4 right-4 p-4 text-white">
        Chat
      </p>
      <ChatWidget />
    </div>
  );
};

export default React.memo(FreshChatWidget);
