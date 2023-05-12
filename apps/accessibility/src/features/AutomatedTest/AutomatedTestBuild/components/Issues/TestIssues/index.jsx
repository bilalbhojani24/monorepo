import React from 'react';
import {
  ExclamationTriangleIcon,
  Slideover,
  SlideoverBody,
  SlideoverHeader
} from '@browserstack/bifrost';

export default function TestIssues() {
  return (
    <Slideover
      show={false}
      slideoverWidth="max-w-screen-md w-screen overflow-y"
      // onOverlayClick={handleCloseWithLogEvent}
      backgroundOverlay
      // onClose={handleCloseWithLogEvent}
      size="6xl"
    >
      <SlideoverBody />
    </Slideover>
  );
}
