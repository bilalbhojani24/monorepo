export const EVENT_TYPE = {
  ARROW_UP: 'keyup',
  ARROW_DOWN: 'keydown',
  ARROW_RIGHT: 'keyright',
  ARROW_LEFT: 'keyleft',
  TAB: 'tab',
  REVERSE_TAB: 'reverseTab',
  SPACE_OR_ENTER: 'spaceOrEnter',
  ESCAPE: 'escape'
};

export const getEventType = (event) => {
  switch (event.keyCode) {
    case 37:
      return EVENT_TYPE.ARROW_LEFT;

    case 38:
      return EVENT_TYPE.ARROW_UP;

    case 39:
      return EVENT_TYPE.ARROW_RIGHT;

    case 40:
      return EVENT_TYPE.ARROW_DOWN;

    case 9:
      return event.shiftKey ? EVENT_TYPE.REVERSE_TAB : EVENT_TYPE.TAB;

    case 32:
    case 13:
      return EVENT_TYPE.SPACE_OR_ENTER;

    case 27:
      return EVENT_TYPE.ESCAPE;

    default:
      return '';
  }
};

export const activeElemHasClass = (selector) => {
  return document.activeElement.className.indexOf(selector) > -1;
};
