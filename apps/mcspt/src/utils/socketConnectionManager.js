import { Pusher, PusherManager } from '@browserstack/utils';
import {
  setIsSocketConnectionFailed,
  setIsSocketConnectionLoading
} from 'features/RealtimeMetricGraphs';
import {
  getIsSocketConnectionInstance,
  resetRealtimeMetrics,
  setSocketConnectionInstance
} from 'features/RealtimeMetricGraphs/slices/realtimeMetricSlice';

import { handleSocketMessage } from './socketEventManager';

export const getWebSocketUrl = () =>
  `ws://localhost:${window.BS_PERF_API_PORT || 3000}/`;

class McpPusherEvents {
  constructor(dispatch, getState, channelData, pusherManager) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.channelData = channelData;
    this.pusherManager = pusherManager;

    // connecting to pusher
    pusherManager.connect();

    // If reconnection has happened 25 times, disconnect and fail the action
    pusherManager.socket.on('reconnect_attempt', () => {
      if (pusherManager.reconnectionAttempts === 25) {
        pusherManager.socket.disconnect();
        this.dispatch(setIsSocketConnectionLoading(false));
        this.dispatch(setIsSocketConnectionFailed(true));
        this.log('Pusher seems to be unavailable');
      }
    });

    // If connected, create a pusher instance from this manager
    pusherManager.socket.on('connect', () => {
      this.createInstance(channelData, pusherManager);
    });

    pusherManager.socket.on('handshake', () => {
      this.dispatch(setIsSocketConnectionLoading(false));
    });

    pusherManager.socket.on('error', () => {
      this.dispatch(setIsSocketConnectionLoading(false));
      this.dispatch(setIsSocketConnectionFailed(true));
    });
  }

  log = (msg) => {
    if (IS_DEV) {
      // eslint-disable-next-line no-console
      console.log('\n\n-------MCP Pusher Log-------\n\n', msg);
    }
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

      pusherManager.socket.removeAllListeners(`connect`);
      pusherManager.socket.removeAllListeners(`handshake`);
      pusherManager.socket.removeAllListeners(`error`);
      pusherManager.socket.removeAllListeners(`reconnect_attempt`);
    }
  }

  onMessage = (message) => {
    try {
      if (!message) {
        this.log('data from pusher not received on message event');
      }

      handleSocketMessage(this.dispatch, this.getState, message);
    } catch (error) {
      this.log('Socket Error Occurred');
      this.log(error.message);
    }
  };

  createInstance(channelData, pusherManager) {
    this.channelData = channelData;
    this.pusher = new Pusher(
      pusherManager,
      '',
      {
        channel: channelData?.channel,
        token: channelData?.token,
        type: channelData?.type,
        group_id: channelData?.groupId
      },
      `${getWebSocketUrl()}${channelData.sessionId}`,
      !IS_PROD
    );
    this.attachEvents();
    pusherManager.add(channelData.connectionName, this.pusher);
  }
}

export const subscribeMcpPusher = (channelData) => (dispatch, getState) => {
  // disconnect previous pusher connection [HMR]
  if (window.pusher) {
    window.pusher.socket.disconnect();
  }

  const pusherManager = new PusherManager(
    `${getWebSocketUrl()}${channelData.sessionId}`,
    !IS_PROD
  );

  dispatch(
    setSocketConnectionInstance(
      new McpPusherEvents(dispatch, getState, channelData, pusherManager)
    )
  );
};

export const disconnectMcpPusher = () => (dispatch, getState) => {
  const existingConnection = getIsSocketConnectionInstance(getState());

  try {
    if (
      existingConnection?.detach &&
      existingConnection?.pusherManager &&
      existingConnection?.channelData?.connectionName
    ) {
      existingConnection.detach(
        existingConnection.pusherManager,
        existingConnection.channelData.connectionName
      );
    }

    dispatch(resetRealtimeMetrics());
  } catch (e) {
    console.log(e);
  }
};
