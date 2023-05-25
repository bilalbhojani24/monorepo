import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { fetchChatWidgetInitialData } from './slices/chatWidgetSlices';
import {
  ChatIconSVG,
  FRESHCHAT_WIDGET_CUSTOM_BUTTON_ID,
  handleScriptLoad,
  hideWidget,
  showWidget
} from './utils/index';

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
            <ChatIconSVG />
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
