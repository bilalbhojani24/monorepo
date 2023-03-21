import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const StackedListCommon = ({
  title,
  subTitle,
  actions,
  contentAside,
  icon,
  align
}) => (
  <div
    className={twClassNames('md:min-w-[50%] flex items-center', {
      'md:flex md:justify-end md:text-right': align === 'right',
      'md:pt-7': contentAside && !title
    })}
  >
    {icon && <span className="float-left mr-3 shrink-0">{icon}</span>}
    <span className="truncate text-sm">
      <p className="text-base-900 truncate font-medium">{title}</p>
      <p className="truncate">{subTitle}</p>
    </span>
    {contentAside && (
      <span className="absolute top-3 right-4">{contentAside}</span>
    )}
    {actions}
  </div>
);

StackedListCommon.propTypes = {
  title: PropTypes.node,
  subTitle: PropTypes.node,
  actions: PropTypes.node,
  contentAside: PropTypes.node,
  icon: PropTypes.node,
  align: PropTypes.oneOf(['left', 'right'])
};
StackedListCommon.defaultProps = {
  subTitle: null,
  actions: null,
  contentAside: null,
  icon: null,
  title: null,
  align: 'left'
};

export default StackedListCommon;
