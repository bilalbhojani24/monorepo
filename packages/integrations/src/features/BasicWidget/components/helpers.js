import { MARGIN } from '../constants';

export const getWidgetRenderPosition = (
  position,
  dockRefClientRect,
  widgetRefClientRect
) => {
  let x = MARGIN.FROM_SCREEN_EDGES;
  let y = 0;
  const bodyWidth = document.body.getBoundingClientRect().width;
  const widgetWidth = widgetRefClientRect.width;
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
        y = dockTop - widgetTop;
        break;
      }
      default:
      case 'left': {
        const dockLeft = dockRefClientRect.left;
        const dockTop = dockRefClientRect.top;
        x =
          dockLeft - widgetWidth < 0
            ? MARGIN.FROM_SCREEN_EDGES
            : // gap between widget and dock
              dockLeft - widgetWidth - MARGIN.DOCK_AND_WIDGET;
        y = dockTop - widgetTop;
        break;
      }
    }
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
    y = -widgetTop + MARGIN.FROM_SCREEN_EDGES;
  }
  return { x, y };
};
