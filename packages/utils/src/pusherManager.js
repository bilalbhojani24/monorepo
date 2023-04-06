import io from 'socket.io-client';

import Pusher from './pusher';

export default class PusherManager {
  constructor(server, loggingEnabled = false) {
    this.instances = [];
    this.server = server;
    this.pusherManagerLogging = loggingEnabled;
  }

  log = (msg) => {
    if (this.pusherManagerLogging) {
      // eslint-disable-next-line no-console
      console.log('::PUSHER MANAGER::', msg);
    }
  };

  connect = () => {
    this.reconnectionAttempts = 0;

    this.socket = io(this.server, {
      transports: ['websocket'],
      'force new connection': true
    });

    this.socket.on('reconnect_attempt', () => {
      this.reconnectionAttempts += 1;
      this.log(`Reconnecting for time: ${this.reconnectionAttempts}`);

      if (this.reconnectionAttempts > 25) {
        this.log('SocketIO retrying ...');
        this.socket.disconnect();
        this.socket.removeAllListeners();
        this.connect();
      }
    });

    this.socket.on('connect', () => {
      this.log('SocketIO Connected');
      this.instances.forEach((instance, i) => {
        if (Object.prototype.hasOwnProperty.call(this.instances, i)) {
          this.instances[i].status = 'connected';
          this.init(this.instances[i]);
        }
      });

      this.customPusherConnectHandler?.();
    });

    this.socket.on('disconnect', () => {
      this.log('SocketIO Disconnected');
      this.instances.forEach((instance, i) => {
        if (Object.prototype.hasOwnProperty.call(this.instances, i)) {
          this.instances[i].status = 'disconnected';
          this.instances[i].disconnected_at = new Date().getTime();
          this.instances[i].trigger('disconnect');
        }
      });
    });

    this.socket.on('subscribed', (data) => {
      this.log(`Channel subscribed: ${data}`);

      this.instances.forEach((instance, i) => {
        if (Object.prototype.hasOwnProperty.call(this.instances, i)) {
          this.instances[i].status = 'subscribed';
          this.instances[i].trigger('subscribed', data);
        }
      });
    });

    this.socket.on('error', (e) => {
      this.log(`SocketIO Error: ${e.toString()}`);
      this.customPusherErrorHandler?.(e.toString());
    });
  };

  add = (key, pusher) => {
    this.init(pusher);
    this.instances[key] = pusher;
  };

  init = (pusher) => {
    if (!(pusher instanceof Pusher)) {
      throw new Error('Not a valid instance of pusher passed!');
    }

    this.reset(pusher.prefix);

    if (!this.socket) {
      return;
    }
    this.socket.on(`${pusher.prefix}message`, pusher.emit);
    this.socket.on(`${pusher.prefix}switch`, pusher.flush);

    this.socket.on(`${pusher.prefix}update`, (data) => {
      pusher.trigger('message', data);
    });

    this.socket.on(`${pusher.prefix}invalid`, (data) => {
      pusher.trigger('invalid', data);
    });

    if (this.socket.connected) {
      pusher.trigger('connect');
    }
  };

  send = (event, message) => {
    if (!this.socket) {
      return;
    }
    try {
      const messageObj = JSON.stringify(message);
      this.log(`Sending event:${event} message:${messageObj}`);
      this.socket.emit(event, messageObj);
    } catch (error) {
      throw new Error(error);
    }
  };

  reset = (prefix) => {
    if (!this.socket) {
      return;
    }
    this.socket.removeAllListeners(`${prefix}message`);
    this.socket.removeAllListeners(`${prefix}update`);
    this.socket.removeAllListeners(`${prefix}switch`);
    this.socket.removeAllListeners(`${prefix}invalid`);
  };

  remove = (key) => {
    if (typeof this.instances[key] === 'undefined') {
      return;
    }
    this.reset(this.instances[key].prefix);
    delete this.instances[key];
  };
}
