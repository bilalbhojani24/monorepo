/** Get offsetX for element based on clientX */
export const getElementOffsetXRatio = (event, element) => {
  const boundingRect = element?.getBoundingClientRect?.();
  const { clientX } = event;
  let offsetX = 0;

  if (!boundingRect) {
    return offsetX;
  }

  if (clientX < boundingRect.x) {
    offsetX = 0;
  } else if (clientX > boundingRect.x + boundingRect.width) {
    offsetX = boundingRect.width;
  } else {
    offsetX = clientX - boundingRect.x;
  }

  return offsetX / boundingRect.width;
};
