import { Pusher, PusherManager } from '@browserstack/utils';
import { PUSHER_EVENTS } from 'constants/common';
import { updateProjectList } from 'globalSlice/index';

class O11yPusherEvents {
  constructor(dispatch, getState, channelData, pusherManager) {
    this.dispatch = dispatch;
    this.getState = getState;
    window.pusher = pusherManager;

    // connecting to pusher
    pusherManager.connect();

    // If reconnection has happened 25 times, disconnect and fail the action
    pusherManager.socket.on('reconnect_attempt', () => {
      if (pusherManager.reconnectionAttempts === 25) {
        pusherManager.socket.disconnect();
        window.isPusherConnectionCreated = false;
        this.log('Pusher seems to be unavailable');
      }
    });

    // If connected, create a pusher instance from this manager
    pusherManager.socket.on('connect', () => {
      this.createInstance(channelData, pusherManager);
    });
  }

  log = (msg) => {
    // eslint-disable-next-line no-console
    console.log('::O11Y EVENT HANDLER::', msg);
  };

  attachEvents() {
    if (this.pusher) {
      this.pusher.on('message', this.onMessage);
      this.pusher.on('invalid', () => this.onInvalid);
    }
  }

  detach(pusherManager, connectionName) {
    if (this.pusher) {
      this.pusher.unsubscribe();
      pusherManager.remove(connectionName);
    }
  }

  onMessage = (message) => {
    try {
      if (!message) {
        this.log('data from pusher not received on message event');
      }
      this.log(message);

      if (message.type) {
        // eslint-disable-next-line sonarjs/no-small-switch
        switch (message.type) {
          case PUSHER_EVENTS.NEW_PROJECT:
            this.dispatch(updateProjectList(message?.data || {}));
            break;
          default:
            break;
        }
        window.pubSub.publish(message.type, message);
      } else {
        window.pubSub.publish('O11yPusherMessage', message);
      }
    } catch (error) {
      this.log(error.message);
    }
  };

  createInstance(channelData, pusherManager) {
    this.channelData = channelData;
    this.pusher = new Pusher(
      pusherManager,
      '',
      {
        channel: channelData.channel,
        token: channelData.token,
        type: channelData.type,
        group_id: channelData.groupId
      },
      ``
    );
    this.attachEvents();
    pusherManager.add(channelData.connectionName, this.pusher);
  }
}

export const subscribeO11yPusher =
  (channelData, pusherUrl) => (dispatch, getState) => {
    // disconnect previous pusher connection [HMR]
    if (window.pusher) {
      window.pusher.socket.disconnect();
    }
    const pusherManager = new PusherManager(pusherUrl, true);
    return new O11yPusherEvents(dispatch, getState, channelData, pusherManager);
  };
