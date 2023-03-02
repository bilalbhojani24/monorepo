// publisher and subscriber problem
export default function PubSub() {
  const subscribers = {};

  function checkIfEventNameHasArrayOfCallbacks(eventName) {
    const currentEventName = subscribers[eventName];
    const doesCurrentEventHaveAnArrayOfCallbacks =
      currentEventName && Array.isArray(currentEventName);

    if (doesCurrentEventHaveAnArrayOfCallbacks) {
      return currentEventName;
    }

    return false;
  }

  function subscribe(eventName, eventCallback) {
    const isEventAlreadyPresent =
      checkIfEventNameHasArrayOfCallbacks(eventName);
    if (!isEventAlreadyPresent) {
      subscribers[eventName] = [];
    }
    const currentEventLength = subscribers[eventName].push(eventCallback);
    const currentEventIndex = currentEventLength - 1;

    return function unSubscribe() {
      subscribers[eventName].splice(currentEventIndex, 1);
    };
  }

  function publish(eventName, params) {
    const currentEventName = subscribers[eventName];
    const isEventAlreadyPresent =
      checkIfEventNameHasArrayOfCallbacks(eventName);

    if (!isEventAlreadyPresent) {
      return;
    }
    const currentEventNameLength = currentEventName.length;
    for (let i = 0; i < currentEventNameLength; i += 1) {
      currentEventName[i](params);
    }
  }

  return {
    subscribe,
    publish
  };
}

window.pubSub = PubSub();
