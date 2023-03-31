export default class Pusher {
  constructor(
    manager,
    prefix,
    information,
    authEndpoint,
    loggingEnabled = false
  ) {
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
    this.info.reconnects = -1;
    this.status = 'not-connected';
    this.disconnected_at = null;
    this.pusherLogging = loggingEnabled;

    this.emit = this.emit.bind(this);
    this.flush = this.flush.bind(this);
    this.trigger = this.trigger.bind(this);

    if (window.navigator) {
      let { userAgent } = window.navigator;
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

  log(msg) {
    if (this.pusherLogging) {
      // eslint-disable-next-line no-console
      console.log(`::PUSHER ${this.prefix}::`, msg);
    }
  }

  flush() {
    this.log('SocketIO Flushing');
    if (this.buffer.length !== 0) {
      this.buffer.forEach((bufferItem) => {
        this.trigger('message', bufferItem);
      });
      this.buffer = this.buffer.splice(this.buffer.length);
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
    this.manager?.send('unsubscribe', JSON.stringify(this.info));
  }

  send(event, message) {
    this.log(`Sending event:${event} message:${message}`);
    this.manager?.send(
      `${this.prefix}push`,
      JSON.stringify({ event, message })
    );
  }

  trigger(event, data) {
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
        break;

      default:
        break;
    }
    this.eventHandlers[event]?.(data);
  }
}
