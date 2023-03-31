import { Pusher, PusherManager } from '@browserstack/utils';
import { PUSHER_EVENTS } from 'constants/common';
import { updateProjectList } from 'globalSlice/index';

class O11yPusherEvents {
  constructor(dispatch, getState, channelData, pusherManager) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.onMessage = this.onMessage.bind(this);

    // Detach from the previous instance's pusher subscription, if present
    if (O11yPusherEvents.curInstance) {
      O11yPusherEvents.curInstance.detach(
        pusherManager,
        O11yPusherEvents.curInstance.channelData?.connectionName
      );
    }

    /**
     * If pusher connection already created, directly create new
     * instance of class without creating a new pusher connection
     */
    if (O11yPusherEvents.isConnectionCreated) {
      return this.createInstance(channelData, pusherManager);
    }

    // Else, create a pusher connection, and attach events handlers to it.
    O11yPusherEvents.isConnectionCreated = true;

    // connecting to pusher
    pusherManager.connect();

    // If reconnection has happened 25 times, disconnect and fail the action
    pusherManager.socket.on('reconnect_attempt', () => {
      if (pusherManager.reconnectionAttempts === 25) {
        pusherManager.socket.disconnect();
        O11yPusherEvents.isConnectionCreated = false;
        this.log('Pusher seems to be unavailable');
      }
    });

    // If connected, create a pusher instance from this manager
    pusherManager.socket.on('connect', () => {
      this.createInstance(channelData, pusherManager);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  log(msg) {
    // eslint-disable-next-line no-console
    console.log('::O11Y EVENT HANDLER::', msg);
  }

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

  onMessage(message) {
    try {
      if (!message) {
        this.log('data from pusher not received on message event');
      }
      this.log(message);

      if (message.type) {
        // eslint-disable-next-line sonarjs/no-small-switch
        switch (message.type) {
          // case PUSHER_EVENTS.BUILD_FINISHED:
          //   this.dispatch(findAndUpdateBuilds(message?.data || []));
          //   break;
          // case PUSHER_EVENTS.ANALYZER_COMPLETED:
          //   this.dispatch(
          //     updateBuildMeta({
          //       buildUID: message?.buildId || '',
          //       isAutoAnalyzerRunning: false
          //     })
          //   );
          //   break;
          case PUSHER_EVENTS.NEW_PROJECT:
            this.dispatch(updateProjectList(message?.data || {}));
            break;
          // case PUSHER_EVENTS.INSIGHTS_UPDATED: {
          //   const activeBuildId = getActiveBuildId(this.getState());
          //   if (activeBuildId === message.buildId) {
          //     this.dispatch(
          //       getBuildSummaryData({
          //         buildId: activeBuildId,
          //         fetchUpdate: true
          //       })
          //     );
          //     this.dispatch(
          //       getBuildHistoryData({
          //         buildId: activeBuildId,
          //         fetchUpdate: true
          //       })
          //     );
          //   }
          //   break;
          // }
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
  }

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
    O11yPusherEvents.curInstance = this;
  }

  // To keep track of the pusher connection creation
  // static isConnectionCreated = false;

  // To keep track of the current instance.
  // Can be used to detach events from prev instance on new instance creations
  // static curInstance = null;
}

export const subscribeO11yPusher =
  (channelData, pusherUrl) => (dispatch, getState) => {
    const pusherManager = new PusherManager(pusherUrl, true);
    return new O11yPusherEvents(dispatch, getState, channelData, pusherManager);
  };
