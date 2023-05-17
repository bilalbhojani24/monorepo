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
      {(checkBoxVisible || selected || alwaysVisible) && (
        <Checkbox
          checked={selected}
          border={false}
          onChange={(e) => handleChange(e)}
          onMouseEnter={() => {
            setCheckBoxVisible(true);
          }}
          wrapperClassName="absolute right-3 top-2 z-10"
        />
      )}
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
        type="button"
        aria-label="particular button"
      >
        {children}
      </button>
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
