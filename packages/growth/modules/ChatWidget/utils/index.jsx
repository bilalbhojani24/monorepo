import React from 'react';
import { logEvent } from '@browserstack/utils';

export const FRESHCHAT_WIDGET_CUSTOM_BUTTON_ID = 'freshchat_custom_button';

export const ChatIconSVG = () => (
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
);

export const showWidget = () => {
  const customButton = document.getElementById(
    FRESHCHAT_WIDGET_CUSTOM_BUTTON_ID
  );

  if (customButton) {
    window.fcWidget?.show();
    customButton.style.display = 'block';
  } else window.fcWidget?.show();
};

export const hideWidget = () => {
  const customButton = document.getElementById(
    FRESHCHAT_WIDGET_CUSTOM_BUTTON_ID
  );
  if (customButton) {
    if (window.fcWidget?.isOpen()) {
      window.fcWidget?.hide();
    }
    customButton.style.display = 'none';
  } else window.fcWidget?.hide();
};

export const setWidgetEvents = (
  chatWidgetData,
  showChatWindow,
  setFreshChatLoad
) => {
  const channelName = chatWidgetData?.triggers?.[0]?.channel;
  let source = 'user_click';

  window.fcWidget.on('widget:loaded', () => {
    setFreshChatLoad(true);
    showWidget();

    logEvent([], 'online_sales', 'FreshChat', {
      freshchatId: '',
      userId: chatWidgetData?.external_id,
      action: 'WidgetLoaded',
      channel: channelName,
      team: 'online_sales'
    });

    if (chatWidgetData.reopen_time) {
      setTimeout(() => {
        source = 'timer';
        showChatWindow();
        source = 'user_click';
      }, chatWidgetData.reopen_time);
    }
  });

  window.fcWidget.on('message:sent', () => {
    logEvent([], 'online_sales', 'FreshChat', {
      widgetOpen: true,
      conversationCreated: true,
      action: 'ConversationCreated',
      freshchatId: '',
      userId: chatWidgetData?.external_id,
      newUser: false,
      channel: channelName,
      team: 'online_sales'
    });
  });

  window.fcWidget.on('widget:opened', () => {
    logEvent([], 'online_sales', 'FreshChat', {
      widgetOpen: true,
      action: 'WidgetOpened',
      source,
      freshchatId: '',
      userId: chatWidgetData?.external_id,
      channel: channelName,
      team: 'online_sales'
    });
  });

  window.fcWidget.on('widget:closed', () => {
    logEvent([], 'online_sales', 'FreshChat', {
      widgetClosed: true,
      action: 'WidgetClosed',
      freshchatId: '',
      userId: chatWidgetData?.external_id,
      channel: channelName,
      team: 'online_sales'
    });
    showWidget();
  });
};

export const handleScriptLoad = async (
  chatWidgetData,
  showChatWindow,
  direction,
  setFreshChatLoad
) => {
  if (chatWidgetData.show_fresh_chat_widget) {
    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = 'https://wchat.freshchat.com/js/widget.js';

    script.addEventListener('load', () => {
      window.fcWidget.init({
        token: chatWidgetData.token,
        host: chatWidgetData.host,
        tags: chatWidgetData.fresh_chat_tags,
        external_id: chatWidgetData.external_id,
        fullscreen: false,
        config: {
          headerProperty: {
            direction: direction === 'left' ? 'ltr' : 'rtl',
            hideChatButton:
              chatWidgetData.config.header_property.hide_chat_button,
            backgroundColor:
              chatWidgetData.config.header_property.backgroundColor
          }
        }
      });

      setWidgetEvents(chatWidgetData, showChatWindow, setFreshChatLoad);

      if (chatWidgetData.user_info.email) {
        window.fcWidget.user.update({
          firstName: chatWidgetData.user_info.first_name,
          lastName: chatWidgetData.user_info.last_name,
          email: chatWidgetData.user_info.email
        });
      }
    });

    document.head.appendChild(script);
  }
};
