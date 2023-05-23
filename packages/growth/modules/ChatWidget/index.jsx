import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { fetchChatWidgetInitialData } from './slices/chatWidgetSlices';
import { handleScriptLoad } from './utils';

const ChatWidget = ({ children, direction }) => {
  const chatWidget = useSelector((state) => state.chatWidget);
  const dispatch = useDispatch();
  const [showWidget, setShowWidget] = useState(false);

  const showChatWindow = () => {
    if (window.fcWidget && !window.fcWidget.isOpen()) {
      setShowWidget(false);
      window.fcWidget.open();
    }
  };

  const toggleChatWidget = () => {
    if (showWidget) {
      setShowWidget(false);
      window.fcWidget.hide();
    } else {
      setShowWidget(true);
      window.fcWidget.show();
    }
  };

  useEffect(() => {
    dispatch(fetchChatWidgetInitialData());
  }, [dispatch]);

  useEffect(() => {
    if (chatWidget.data)
      handleScriptLoad(
        chatWidget.data,
        setShowWidget,
        showChatWindow,
        direction
      );
  }, [chatWidget.data, direction]);

  return (
    <>
      {showWidget && chatWidget?.data?.custom_widget && (
        <Button
          onClick={() => {
            showChatWindow();
          }}
          wrapperClassName={twClassNames(
            'rounded-none shadow-md absolute p-3 bottom-6',
            {
              'left-6': direction === 'left',
              'right-6': direction === 'right'
            }
          )}
        >
          <div className="flex items-center justify-between text-sm">
            <svg
              id="chat-icon"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM4 7H16V9H4V7ZM12 12H4V10H12V12ZM16 6H4V4H16V6Z"
                fill="white"
              />
            </svg>
            Talk to an Expert
          </div>
        </Button>
      )}
      {children && children({ toggleChatWidget })}
    </>
  );
};

ChatWidget.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  direction: PropTypes.oneOf(['left', 'right'])
};
ChatWidget.defaultProps = {
  children: null,
  direction: 'right'
};

export default ChatWidget;
