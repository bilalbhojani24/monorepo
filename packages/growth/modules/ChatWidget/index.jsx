import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { fetchChatWidgetInitialData } from './slices/chatWidgetSlices';
import {
  FRESHCHAT_WIDGET_CUSTOM_BUTTON_ID,
  handleScriptLoad,
  hideWidget,
  showWidget
} from './utils';

export const toggleChatWidget = (status) => {
  if (status === true) {
    showWidget();
  } else {
    hideWidget();
  }
};

const ChatWidget = ({ direction }) => {
  const chatWidget = useSelector((state) => state.chatWidget?.data);
  const dispatch = useDispatch();

  const showChatWindow = () => {
    if (window.fcWidget && !window.fcWidget.isOpen()) {
      showWidget();
    }
  };

  useEffect(() => {
    dispatch(fetchChatWidgetInitialData());
  }, [dispatch]);

  useEffect(() => {
    if (chatWidget) handleScriptLoad(chatWidget, showChatWindow, direction);
  }, [chatWidget, direction]);

  return (
    <>
      {chatWidget?.custom_widget && (
        <Button
          id={FRESHCHAT_WIDGET_CUSTOM_BUTTON_ID}
          onClick={() => {
            hideWidget();
            window.fcWidget.open();
          }}
          wrapperClassName={twClassNames(
            'rounded-none shadow-md absolute p-3 bottom-6 none',
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
    </>
  );
};

ChatWidget.propTypes = {
  direction: PropTypes.oneOf(['left', 'right'])
};
ChatWidget.defaultProps = {
  direction: 'right'
};

export default ChatWidget;
