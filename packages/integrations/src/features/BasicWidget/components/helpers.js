export const getWidgetRenderPosition = (
  position,
  dockRefClientRect,
  widgetRefClientRect
) => {
  let x = 8;
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
            ? bodyWidth - widgetWidth - 8
            : dockRight + 8;
        y = dockTop - widgetTop;
        break;
      }
      default:
      case 'left': {
        const dockLeft = dockRefClientRect.left;
        const dockTop = dockRefClientRect.top;
        x = dockLeft - widgetWidth < 0 ? 8 : dockLeft - widgetWidth - 8;
        y = dockTop - widgetTop;
        break;
      }
    }
  } else {
    switch (position) {
      case 'right': {
        x = bodyWidth - widgetWidth - 8;
        break;
      }
      case 'center': {
        x = bodyWidth / 2 - widgetWidth / 2;
        break;
      }
      default:
        x = 8;
    }
    y = -widgetTop + 8;
  }
  return { x, y };
};
