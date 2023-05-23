import { logEvent } from '@browserstack/utils';

export const setWidgetEvents = (
  chatWidgetData,
  setShowWidget,
  showChatWindow
) => {
  const channelName = chatWidgetData?.triggers?.[0]?.channel;
  let source = 'user_click';

  window.fcWidget.on('widget:loaded', () => {
    setShowWidget(true);

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
    setShowWidget(true);
  });
};

export const handleScriptLoad = async (
  chatWidgetData,
  setShowWidget,
  showChatWindow,
  direction
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

      setWidgetEvents(chatWidgetData, setShowWidget, showChatWindow);

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
