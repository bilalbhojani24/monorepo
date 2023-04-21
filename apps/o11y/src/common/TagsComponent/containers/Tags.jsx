import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TagsComponent = ({
  text,
  tagClickCb,
  wrapperClassName,
  iconOnly,
  icon
}) => (
  <button
    className={twClassNames(
      'border border-base-300 py-0.5 px-2.5 flex items-center rounded-md',
      wrapperClassName
    )}
    onClick={tagClickCb}
    type="button"
  >
    {icon}
    {!iconOnly && <span className="text-xs font-medium">{text}</span>}
  </button>
);

TagsComponent.propTypes = {
  text: PropTypes.string,
  tagClickCb: PropTypes.func,
  wrapperClassName: PropTypes.string,
  iconOnly: PropTypes.bool,
  icon: PropTypes.node
};

TagsComponent.defaultProps = {
  icon: null,
  text: '',
  tagClickCb: () => {},
  wrapperClassName: '',
  iconOnly: false
};

export default TagsComponent;
