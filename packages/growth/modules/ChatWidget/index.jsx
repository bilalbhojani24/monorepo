import React, { useEffect, useState } from 'react';
import { Button } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { setWidgetEvents } from './utils';

const ChatWidget = () => {
  const [showWidget, setShowWidget] = useState(true);

  useEffect(() => {
    const id = 'freshchat-lib-fe-2';
    if (document.getElementById(id) || window.fcWidget) return undefined;

    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = 'https://wchat.freshchat.com/js/widget.js';
    script.id = id;

    const handleScriptLoad = () => {
      window.fcWidget.init({
        token: '624243d8-8006-4cae-a3f5-54cdaa3c156a',
        host: 'https://wchat.freshchat.com',
        origin: 'https://www.browserstack.com',
        tags: ['free_users_visiting_speedboat'],
        external_id: 'ga_based_id',
        fullscreen: false,
        config: {
          headerProperty: {
            hideChatButton: true,
            backgroundColor: '#0070f0',
            welcomeMessage: 'Welcome to our support chat!'
          },
          content: {
            placeholder: 'Welcome Bilal'
          }
        }
      });

      setWidgetEvents(setShowWidget);
    };

    script.addEventListener('load', handleScriptLoad);

    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', handleScriptLoad);
      document.head.removeChild(script);
    };
  }, []);

  const showChatWindow = () => {
    if (window.fcWidget) {
      setShowWidget(false);
      window.fcWidget.open();
    }
  };

  const closeChatWindow = () => {
    if (window.fcWidget) {
      window.fcWidget.close();
    }
  };

  return (
    <div>
      {showWidget && (
        <Button
          onClick={() => {
            showChatWindow();
          }}
          wrapperClassName="rounded-none shadow-lg absolute"
          style={{
            bottom: '20px',
            right: '20px'
          }}
        >
          Talk to an Expert
        </Button>
      )}
    </div>
  );
};

ChatWidget.propTypes = {};
ChatWidget.defaultProps = {};

export default ChatWidget;
