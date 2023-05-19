import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Checkbox from '../../Checkbox';

const GalleryMediaCheckbox = ({
  children,
  selected,
  onChange,
  onClick,
  alwaysVisible
}) => {
  const [checkBoxVisible, setCheckBoxVisible] = useState(false);

  const handleChange = (e) => {
    e.stopPropagation();
    onChange(e);
  };

  const handleClick = () => {
    onClick();
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={twClassNames(
          'border-base-300 outline-brand-500 relative w-full rounded-md border outline-2 outline-offset-4 hover:opacity-80',
          {
            'border-brand-600 border-2 rounded -mt-[1px]': selected
          }
        )}
        onMouseEnter={() => {
          setCheckBoxVisible(true);
        }}
        onMouseLeave={() => {
          setCheckBoxVisible(false);
        }}
        onFocus={() => {
          setCheckBoxVisible(true);
        }}
        onKeyDown={(e) => {
          if (e.shiftKey && e.key === 'Tab') setCheckBoxVisible(false);
        }}
        type="button"
        aria-label="particular button"
      >
        {children}
      </button>
      {(checkBoxVisible || selected || alwaysVisible) && (
        <Checkbox
          checked={selected}
          border={false}
          onChange={(e) => handleChange(e)}
          onMouseEnter={() => {
            setCheckBoxVisible(true);
          }}
          onFocus={() => {
            setCheckBoxVisible(true);
          }}
          onBlur={() => {
            setCheckBoxVisible(false);
          }}
          wrapperClassName="absolute right-3 top-2 z-5"
        />
      )}
    </div>
  );
};

GalleryMediaCheckbox.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
  onChange: PropTypes.func,
  alwaysVisible: PropTypes.bool,
  onClick: PropTypes.func
};

GalleryMediaCheckbox.defaultProps = {
  selected: false,
  onChange: () => {},
  onClick: () => {},
  alwaysVisible: false
};

export default GalleryMediaCheckbox;
