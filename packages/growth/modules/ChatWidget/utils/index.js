export const setWidgetEvents = (setShowWidget) => {
  // Widget load event
  window.fcWidget.on('widget:loaded', () => {
    // window.WebEventTracker.logEvent([], window.EDS.webEvents, 'FreshChat', {
    //   freshchatId: 'id',
    //   userId: 'externalId',
    //   action: 'WidgetLoaded',
    //   channel: 'channel_name',
    //   team: 'online_sales'
    // });
  });

  window.fcWidget.on('message:sent', () => {
    console.log('widget:sent');
  });

  window.fcWidget.on('widget:opened', (resp) => {
    console.log('widget:opened');
  });

  window.fcWidget.on('widget:closed', (resp) => {
    console.log('widget:closed');
    setShowWidget(true);
  });
};

export const handleScriptLoad = async (chatWidgetData, setShowWidget) => {
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
            hideChatButton:
              chatWidgetData.config.header_property.hide_chat_button,
            backgroundColor:
              chatWidgetData.config.header_property.backgroundColor
          }
        }
      });
      setWidgetEvents(setShowWidget);
    });

    document.head.appendChild(script);
  }
};
