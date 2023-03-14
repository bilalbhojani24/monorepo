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
      'border border-base-300 px-1 flex items-center rounded',
      wrapperClassName
    )}
    onClick={tagClickCb}
    type="button"
  >
    {icon}
    {iconOnly === false && text && (
      <span className="text-xs font-semibold">{text}</span>
    )}
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
