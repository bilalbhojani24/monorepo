import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@browserstack/bifrost';

import { fetchChatWidgetInitialData } from './slices/chatWidgetSlices';
import { handleScriptLoad } from './utils';

const ChatWidget = () => {
  const chatWidget = useSelector((state) => state.chatWidget);
  const dispatch = useDispatch();

  const [showWidget, setShowWidget] = useState(false);

  const showChatWindow = () => {
    if (window.fcWidget) {
      setShowWidget(false);
      window.fcWidget.open();
    }
  };

  useEffect(() => {
    dispatch(fetchChatWidgetInitialData());
  }, [dispatch]);

  useEffect(() => {
    if (chatWidget.data)
      handleScriptLoad(chatWidget.data, setShowWidget, showChatWindow);
  }, [chatWidget.data]);

  if (
    !chatWidget.data ||
    !chatWidget.data.show_fresh_chat_widget ||
    !chatWidget.data.custom_widget
  )
    return null;

  return (
    <>
      {showWidget && (
        <Button
          onClick={() => {
            showChatWindow();
          }}
          wrapperClassName="rounded-none shadow-md absolute p-3 bottom-6 right-6"
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

ChatWidget.propTypes = {};
ChatWidget.defaultProps = {};

export default ChatWidget;
