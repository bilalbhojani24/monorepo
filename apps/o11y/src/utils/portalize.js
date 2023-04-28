import { createPortal } from 'react-dom';

export const portalize = (isVisible, component, mountPoint) =>
  isVisible &&
  document.getElementById(mountPoint) &&
  createPortal(component, document.getElementById(mountPoint));
