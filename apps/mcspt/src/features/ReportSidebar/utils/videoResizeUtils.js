export const resizeVideoOnMcpReport = () => {
  const videoParentActualHeight = document
    .querySelector('.video-parent')
    ?.getBoundingClientRect();

  const vieoElement = document.querySelector('.video-parent video');

  if (
    vieoElement?.style?.height !== undefined &&
    videoParentActualHeight?.height
  ) {
    vieoElement.style.height = `${videoParentActualHeight?.height}px`;
  }

  if (
    vieoElement?.style?.width !== undefined &&
    videoParentActualHeight?.width
  ) {
    vieoElement.style.width = `${videoParentActualHeight?.width}px`;
  }
};
