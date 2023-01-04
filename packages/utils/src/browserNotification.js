import browser from './userAgent';

export default class BrowserNotification {
  constructor() {
    this.swRegistration = null;
    this.permissionStatus = 'default';
    // Making sure the class remains a singleton throughout
    if (this.constructor.instance) {
      return this.constructor.instance;
    }
    this.constructor.instance = this;
  }

  init = async (workerMessageCb) => {
    let notificationChannel;
    if (
      typeof Notification !== 'undefined' &&
      BrowserNotification.isServiceWorkerSupported() &&
      BrowserNotification.isPushManagerSupported() &&
      (browser.name === 'chrome' || browser.name === 'firefox') &&
      !this.swRegistration
    ) {
      // register worker
      const workerRegistration = await navigator.serviceWorker.register('non-compiled-js/service-worker.js');
      this.swRegistration = workerRegistration;
      if (Notification.permission === 'granted') {
        this.permissionStatus = 'granted';
      }
      // establish a broadcast channel for communication between the app and the worker
      if (typeof BroadcastChannel !== 'undefined') {
        notificationChannel = new BroadcastChannel('notification-channel');
        if (workerMessageCb) {
          notificationChannel.onmessage = workerMessageCb;
        }
      }
    }
  };

  getNotificationPermission = (successCb) => {
    if (typeof Notification !== 'undefined') {
      Notification.requestPermission().then((permission) => {
        this.permissionStatus = permission;
        if (successCb) {
          successCb(permission, this.swRegistration);
        }
      });
    }
  };

  show = (title, options, callback) => {
    if (
      typeof Notification !== 'undefined' &&
      (browser.name === 'chrome' || browser.name === 'firefox') &&
      Notification.permission === 'granted'
    ) {
      if (this.swRegistration && this.swRegistration.active && this.swRegistration.active.state === 'activated') {
        this.swRegistration.showNotification(title, options);
        if (callback) {
          callback();
        }
      }
    }
  };

  // static
  /**
   * Check if service worker is supported
   */
  static isServiceWorkerSupported = () => typeof navigator !== 'undefined' && 'serviceWorker' in navigator;

  /**
   * Check if push manager is supported
   */
  static isPushManagerSupported = () => 'PushManager' in window;
}
