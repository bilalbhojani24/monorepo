import React, { useRef } from 'react';
import { DismissButton, Overlay, usePopover } from '@react-aria/overlays';
import Proptypes from 'prop-types';

export function Popover(props) {
  const ref = useRef(null);
  const { state, children } = props;

  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      popoverRef: ref
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className="fixed inset-0" />
      <div
        {...popoverProps}
        ref={ref}
        className="border-base-300 absolute top-full z-10 mt-2 rounded-md border bg-white p-8 shadow-lg"
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}

Popover.propTypes = {
  children: Proptypes.node.isRequired,
  state: Proptypes.shape({
    close: Proptypes.func
  })
};

Popover.defaultProps = {
  state: {
    close: () => {}
  }
};
