import { DEFAULT_WIDGET_DIMENSIONS, MARGIN } from '../constants';

export const getWidgetRenderPosition = (
  position,
  dockRefClientRect,
  widgetRefClientRect
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const bodyWidth = document.body.getBoundingClientRect().width;
  let x = MARGIN.FROM_SCREEN_EDGES;
  let y = 0;
  const widgetWidth =
    widgetRefClientRect.width || DEFAULT_WIDGET_DIMENSIONS.INITIAL_WIDTH;
  const widgetTop = widgetRefClientRect.top;
  const hasDockElement = Boolean(dockRefClientRect);

  if (hasDockElement) {
    switch (position) {
      case 'right': {
        const dockRight = dockRefClientRect.right;
        const dockTop = dockRefClientRect.top;
        x =
          dockRight + widgetWidth > bodyWidth
            ? bodyWidth - widgetWidth - MARGIN.FROM_SCREEN_EDGES
            : // gap between widget and dock
              dockRight + MARGIN.DOCK_AND_WIDGET;
        y = dockTop;
        break;
      }
      default:
      case 'left': {
        const dockLeft = dockRefClientRect.left;
        const dockTop = dockRefClientRect.top;
        if (widgetRefClientRect.left) {
          x =
            widgetRefClientRect.left + widgetWidth + MARGIN.FROM_SCREEN_EDGES >
            bodyWidth
              ? bodyWidth - widgetWidth - MARGIN.FROM_SCREEN_EDGES
              : widgetRefClientRect.left;
        } else {
          x =
            dockLeft - widgetWidth < 0
              ? MARGIN.FROM_SCREEN_EDGES
              : // gap between widget and dock
                dockLeft - widgetWidth - MARGIN.DOCK_AND_WIDGET;
        }
        y = dockTop;
        break;
      }
    }
  } else {
    if (widgetRefClientRect.left) {
      x =
        widgetRefClientRect.left + widgetWidth + MARGIN.FROM_SCREEN_EDGES >
        bodyWidth
          ? bodyWidth - widgetWidth - MARGIN.FROM_SCREEN_EDGES
          : widgetRefClientRect.left;
    } else {
      switch (position) {
        case 'right': {
          x = bodyWidth - widgetWidth - MARGIN.FROM_SCREEN_EDGES;
          break;
        }
        case 'center': {
          x = bodyWidth / 2 - widgetWidth / 2;
          break;
        }
        default:
          x = MARGIN.FROM_SCREEN_EDGES;
      }
    }
    y = widgetTop + MARGIN.FROM_SCREEN_EDGES;
  }
  return { x, y };
};
