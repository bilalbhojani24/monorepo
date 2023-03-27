import React from 'react';
import { useDialog } from 'react-aria';
import Proptypes from 'prop-types';

export function Dialog({ title, children, ...props }) {
  const ref = React.useRef();
  const { dialogProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref}>
      {children}
    </div>
  );
}

Dialog.propTypes = {
  title: Proptypes.string,
  children: Proptypes.node.isRequired
};

Dialog.defaultProps = {
  title: ''
};
