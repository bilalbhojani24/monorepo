export const setWidgetEvents = (setShowWidget) => {
  // Widget load event
  window.fcWidget.on('widget:loaded', () => {
    console.log('widget:loaded');
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
