import { useEffect, useState } from 'react';

import { browserNotification as BrowserNotification } from '@browserstack/utils';

const useBrowserNotification = (notificationMessageListener) => {
  const [notifObj, setNotifObj] = useState();

  useEffect(() => {
    const createNotifObj = async () => {
      // Set notif object only when it's not already set
      if (!notifObj) {
        // Initialize browser notification service worker.
        // If already instantiated elsewhere, we will get that same instance here
        const notif = new BrowserNotification();
        await notif.init(notificationMessageListener).catch(() => {});
        // whatever be the case, success or failure above, set the notif object as initialized above to the state
        setNotifObj(notif);
      }
    };
    createNotifObj();
  }, [notifObj, notificationMessageListener, setNotifObj]);

  return notifObj;
};

export default useBrowserNotification;
