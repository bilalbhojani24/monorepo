import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const StackedListCommon = ({
  title,
  subTitle,
  actions,
  contentAside,
  icon
}) => (
  <div
    className={twClassNames('flex items-center', {
      'md:mt-8': contentAside && !title
    })}
  >
    {icon && <span className="float-left mr-3 shrink-0">{icon}</span>}
    <div className="flex-1 text-sm">
      <p className="text-base-900 line-clamp-1 pr-4 font-medium">{title}</p>
      <p className="text-base-500 line-clamp-1 text-sm">{subTitle}</p>
    </div>
    {contentAside && (
      <div className="text-base-500 absolute top-4 right-4">{contentAside}</div>
    )}
    {actions}
  </div>
);

StackedListCommon.propTypes = {
  title: PropTypes.node,
  subTitle: PropTypes.node,
  actions: PropTypes.node,
  contentAside: PropTypes.node,
  icon: PropTypes.node
};
StackedListCommon.defaultProps = {
  subTitle: null,
  actions: null,
  contentAside: null,
  icon: null,
  title: null
};

export default StackedListCommon;
