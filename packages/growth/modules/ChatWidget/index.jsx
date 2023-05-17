import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ChatWidget = () => {
  useEffect(() => {
    // Make an API call to check chat widget should be enabled or not

    // Yes
    const id = 'freshchat-lib';
    if (document.getElementById(id) || window.fcWidget) return null;

    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = 'https://wchat.freshchat.com/js/widget.js';
    script.id = id;

    const handleScriptLoad = () => {
      console.log(window.fcWidget);

      window.fcWidget.init({
        token: '43f27d7f-70fe-4747-8d28-e12cd62d96f1',
        host: 'https://wchat.freshchat.com'
        // origin: 'https://www.browserstack.com',
        // tags: ['free_users_visiting_speedboat'],
        // external_id: 'ga_based_id',
        // domain: 'dkfjvdkfj',
        // fullscreen: false,
        // config: {
        //   headerProperty: {
        //     // hideChatButton: customWidget,
        //     backgroundColor: '#0070f0',
        //     direction: 'ltr'
        //   }
        // }
      });

      window.fcWidget.on('widget:loaded', () => {
        console.log('d,fjbvkjdfvkjdfsnvdfn');
        window.fcWidget.open();
      });
    };

    script.addEventListener('load', handleScriptLoad);

    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', handleScriptLoad);
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (window.fcWidget) {
            console.log('dkjfvjkdf');
            window.fcWidget.open({ name: 'Bilal' });
          }
        }}
      >
        Open chat window
      </button>
    </div>
  );
};

ChatWidget.propTypes = {};
ChatWidget.defaultProps = {};

export default ChatWidget;
