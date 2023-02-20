/* eslint-disable tailwindcss/no-custom-classname */
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Bars2Icon, Button, Draggable, Resizable } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const WidgetHeader = () => (
  <div className="bg-base-50 flex items-center py-1 px-4">
    <Button
      size="large"
      icon={<Bars2Icon />}
      wrapperClassName="drag-handle w-4 h-4 border-0 text-base-400 p-0"
    />
  </div>
);

const Widget = ({ authUrl }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    fetch(authUrl);
  });

  return (
    <Draggable ref={widgetRef} handle=".drag-handle">
      <div ref={widgetRef} className="absolute">
        <Resizable
          className="border-base-200 relative rounded-md border border-solid"
          handle={(__resizeHandleAxis, ref) => (
            <span
              className="bg-base-200 absolute bottom-0 left-1/2 mb-1 h-1 w-20 -translate-x-1/2 -translate-y-1/2 rounded-3xl hover:cursor-s-resize"
              ref={ref}
            />
          )}
          width={300}
          height={250}
          resizeHandles={['s']}
          minConstraints={[300, 200]}
          maxConstraints={[300, 500]}
        >
          <WidgetHeader />
          <p className="p-4">
            Hello, this is the body of the draggable and resizable container.
            Cannot drag from here
          </p>
        </Resizable>
      </div>
    </Draggable>
  );
};

Widget.propTypes = {
  authUrl: PropTypes.string.isRequired
};

// DraggableWrapper.defaultProps = {
//   children: null,
//   isBodyBounded: false,
//   bounds: false,
//   handle: null,
//   initialPosition: { x: 0, y: 0 }
// };

const WidgetPortal = ({
  authUrl,
  positionRef,
  position,
  projectId,
  isOpen,
  handleClose
}) =>
  isOpen
    ? createPortal(
        <Widget
          authUrl={authUrl}
          position={position}
          positionRef={positionRef}
          projectId={projectId}
          handleClose={handleClose}
        />,
        document.body
      )
    : null;

export default WidgetPortal;
