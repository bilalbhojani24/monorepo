import React, { useRef } from 'react';
import { DismissButton, Overlay, usePopover } from '@react-aria/overlays';
import Proptypes from 'prop-types';

export function Popover(props) {
  const ref = useRef(null);
  const { state, children } = props;

  const { popoverProps } = usePopover(
    {
      ...props,
      popoverRef: ref
    },
    state
  );

  return (
    <Overlay>
      <div
        {...popoverProps}
        ref={ref}
        // eslint-disable-next-line tailwindcss/no-arbitrary-value
        className="border-base-300 top-full z-10 mt-2 w-[26rem] rounded-md border bg-white p-3 shadow-lg"
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
