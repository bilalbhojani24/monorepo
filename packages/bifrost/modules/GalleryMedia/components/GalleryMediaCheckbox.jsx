import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Checkbox from '../../Checkbox';

const GalleryMediaCheckbox = ({
  children,
  selected,
  onChange,
  onClick,
  alwaysVisible,
  data
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
          'border-base-300 outline-brand-500 relative w-full rounded border outline-2 outline-offset-4 hover:opacity-80',
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
        aria-label={`Gallery-item-file-${data.title}`}
      >
        {children}
      </button>
      {(checkBoxVisible || selected || alwaysVisible) && (
        <Checkbox
          aria-label={`check-${data.label}`}
          name={data.label}
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
  onClick: PropTypes.func,
  data: PropTypes.shape({
    label: PropTypes.oneOf([
      PropTypes.string.isRequired,
      PropTypes.node.isRequired
    ]),
    value: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

GalleryMediaCheckbox.defaultProps = {
  selected: false,
  onChange: () => {},
  onClick: () => {},
  data: null,
  alwaysVisible: false
};

export default GalleryMediaCheckbox;
