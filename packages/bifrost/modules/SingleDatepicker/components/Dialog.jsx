import React from 'react';
import { useDialog } from 'react-aria';
import { twClassNames } from '@browserstack/utils';
import Proptypes from 'prop-types';

export function Dialog({ title, children, isLoading, ...props }) {
  const ref = React.useRef();
  const { dialogProps } = useDialog(props, ref);

  return (
    <div
      {...dialogProps}
      ref={ref}
      className={twClassNames({ 'outline-0': isLoading })}
    >
      {children}
    </div>
  );
}

Dialog.propTypes = {
  title: Proptypes.string,
  children: Proptypes.node.isRequired,
  isLoading: Proptypes.bool
};

Dialog.defaultProps = {
  title: '',
  isLoading: false
};
