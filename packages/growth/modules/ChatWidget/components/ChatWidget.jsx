import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@browserstack/bifrost';

import { fetchChatWidgetInitialData } from '../../../redux/slices/chatWidgetSlices';
import { handleScriptLoad } from '../utils';

const ChatWidget = () => {
  const chatWidget = useSelector((state) => state.chatWidget);
  const dispatch = useDispatch();

  const [showWidget, setShowWidget] = useState(true);

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
      {showWidget && chatWidget.data.custom_widget && (
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
    </>
  );
};

ChatWidget.propTypes = {};
ChatWidget.defaultProps = {};

export default ChatWidget;
