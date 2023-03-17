import React from 'react';
import PropTypes from 'prop-types';

const StackedListCommon = ({
  title,
  subTitle,
  actions,
  contentAside,
  icon
}) => (
  <div className="grow">
    {icon && <span className="float-left mr-3">{icon}</span>}
    <span className="text-sm">
      <p className="text-base-900 truncate font-medium">{title}</p>
      <p className="truncate">{subTitle}</p>
    </span>
    {contentAside && <span>{contentAside}</span>}
    {actions}
  </div>
);

StackedListCommon.propTypes = {
  title: PropTypes.node.isRequired,
  subTitle: PropTypes.node,
  actions: PropTypes.node,
  contentAside: PropTypes.node,
  icon: PropTypes.node
};
StackedListCommon.defaultProps = {
  subTitle: null,
  actions: null,
  contentAside: null,
  icon: null
};

export default StackedListCommon;
