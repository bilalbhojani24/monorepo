/* eslint-disable no-console */
/* eslint-disable max-classes-per-file */
import { io } from 'socket.io';

export class Pusher {
  constructor(manager, prefix, information, authEndpoint) {
    let userAgent;
    const info = information;

    info.prefix = prefix;
    this.info = info;
    this.prefix = prefix;
    this.manager = manager;
    this.auth_endpoint = authEndpoint;
    this.eventHandlers = {};
    this.switched = false;
    this.flushing = false;
    this.buffer = [];
    this.messageHandler = undefined;
    this.info.reconnects = -1;
    this.status = 'not-connected';
    this.fallback_to_rails_ison = false;
    this.disconnected_at = null;
    this.pusherLogging = true;

    if (navigator) {
      userAgent = navigator.userAgent;
      if (userAgent) {
        userAgent = userAgent.split(' ');
      }
      if (userAgent && userAgent.length >= 2) {
        this.info.userAgent = `${userAgent[userAgent.length - 2]} ${
          userAgent[userAgent.length - 1]
        }`;
      }
    }
  }

  disablePusherLogging() {
    this.pusherLogging = false;
  }

  log(msg) {
    if (this.pusherLogging) {
      console.log(`::PUSHER ${this.prefix}::`, msg);
    }
  }

  flush() {
    let i;
    this.log('SocketIO Flushing');
    if (this.buffer.length !== 0) {
      i = 0;
      for (i = 0; i < this.buffer.length; i += 1) {
        this.trigger('message', this.buffer[i]);
      }
      this.buffer = this.buffer.splice(i);
    }
    this.switched = true;
  }

  emit(message) {
    if (this.switched) {
      this.trigger('message', message);
    } else {
      this.buffer.push(message);
    }
  }

  on(event, handler) {
    this.eventHandlers[event] = handler;
    return this;
  }

  off(event) {
    delete this.eventHandlers[event];
    return this;
  }

  subscribe() {
    this.log('Subscribing');
    this.switched = false;
    this.info.reconnects += 1;
    this.manager.send('subscribe', JSON.stringify(this.info));
  }

  unsubscribe() {
    this.log('Unsubscribing');
    this.switched = false;
    if (this.manager) {
      this.manager.send('unsubscribe', JSON.stringify(this.info));
    }
  }

  send(event, message) {
    this.log(`Sending event:${event} message:${message}`);
    if (this.manager) {
      this.manager.send(
        `${this.prefix}push`,
        JSON.stringify({ event, message })
      );
    }
  }

  trigger(event, data) {
    // this.log("Triggered " + event + " with data" + data);
    switch (event) {
      case 'connect':
        this.subscribe();
        if (this.info.time_ts) {
          this.trigger('reconnect');
        }
        break;

      case 'disconnect':
        this.info.time_ts = new Date().getTime();
        break;

      case 'invalid':
        this.log(data);
        fetch(this.auth_endpoint)
          .then((response) => response.json())
          .then((dataObj) => {
            this.log(`Got reconnect token ${JSON.stringify(dataObj)}`);
            this.info.token = dataObj.token;
            this.info.channel = dataObj.channel;
            this.subscribe();
          });
        // $.get(this.auth_endpoint).then((dataObj) => {
        //   this.log(`Got reconnect token ${JSON.stringify(dataObj)}`);
        //   this.info.token = dataObj.token;
        //   this.info.channel = dataObj.channel;
        //   this.subscribe();
        // });
        break;

      default:
        break;
    }
    if (typeof this.eventHandlers[event] !== 'undefined') {
      this.eventHandlers[event](data);
    }
  }

  //   return this;
}

export class PusherManager extends Pusher {
  constructor(server, manager, prefix, information, authEndpoint) {
    super(manager, prefix, information, authEndpoint);
    this.instances = [];
    this.server = server;
    this.pusherManagerLogging = true;
  }

  disablePusherManagerLogging() {
    this.pusherManagerLogging = false;
  }

  log(msg) {
    if (this.pusherManagerLogging) {
      console.log('::PUSHER MANAGER::', msg);
    }
  }

  connect() {
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

      if (typeof this.customPusherConnectHandler === 'function') {
        this.customPusherConnectHandler();
      }
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
      if (typeof this.customPusherErrorHandler === 'function') {
        this.customPusherErrorHandler(e.toString());
      }
    });
  }

  add(key, pusher) {
    this.init(pusher);
    this.instances[key] = pusher;
  }

  init(pusher) {
    if (!(pusher instanceof Pusher)) {
      return;
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
  }

  send(event, message) {
    if (!this.socket) {
      return;
    }
    this.log(`Sending event:${event} message:${message}`);
    this.socket.emit(event, message);
  }

  reset(prefix) {
    if (!this.socket) {
      return;
    }
    this.socket.removeAllListeners(`${prefix}message`);
    this.socket.removeAllListeners(`${prefix}update`);
    this.socket.removeAllListeners(`${prefix}switch`);
    this.socket.removeAllListeners(`${prefix}invalid`);
  }

  remove(key) {
    if (typeof this.instances[key] === 'undefined') {
      return;
    }
    this.reset(this.instances[key].prefix);
    delete this.instances[key];
  }
}
